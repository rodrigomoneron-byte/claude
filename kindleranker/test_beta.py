#!/usr/bin/env python3
"""
KindleRanker BR — Teste de integração pré-lançamento beta
Valida todos os componentes críticos sem precisar de pagamento real.

Uso:
    python test_beta.py                        # testa tudo
    python test_beta.py --api-only             # só a API FastAPI
    python test_beta.py --stripe-only          # só Stripe
    python test_beta.py --host http://localhost:8000

Saída:
    ✅ PASSOU — componente ok
    ❌ FALHOU — detalhe do erro
    ⚠️  AVISO — não crítico para o beta
"""
import argparse
import json
import os
import sys
import time
import traceback
import urllib.request
import urllib.error

# ─── CLI ──────────────────────────────────────────────────────────────────────
parser = argparse.ArgumentParser(description="KindleRanker Beta Test Suite")
parser.add_argument("--host",         default=os.getenv("API_URL", "http://localhost:8000"))
parser.add_argument("--api-only",     action="store_true")
parser.add_argument("--stripe-only",  action="store_true")
parser.add_argument("--email",        default="teste@kindleranker.com.br", help="E-mail de teste")
args = parser.parse_args()

API = args.host.rstrip("/")

# ─── Helpers ──────────────────────────────────────────────────────────────────
PASSOU = 0
FALHOU = 0
AVISOS = 0

def ok(msg):
    global PASSOU; PASSOU += 1
    print(f"  ✅  {msg}")

def fail(msg, detail=""):
    global FALHOU; FALHOU += 1
    print(f"  ❌  {msg}")
    if detail:
        for line in str(detail).splitlines()[:4]:
            print(f"       {line}")

def warn(msg):
    global AVISOS; AVISOS += 1
    print(f"  ⚠️   {msg}")

def get(path, expect_keys=None):
    url = f"{API}{path}"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            data = json.loads(r.read())
            if expect_keys:
                for k in expect_keys:
                    assert k in data, f"Chave '{k}' ausente na resposta"
            return data
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:200]
        raise RuntimeError(f"HTTP {e.code}: {body}")

def post(path, payload, expect_keys=None):
    url = f"{API}{path}"
    data = json.dumps(payload).encode()
    req  = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            resp = json.loads(r.read())
            if expect_keys:
                for k in expect_keys:
                    assert k in resp, f"Chave '{k}' ausente: {list(resp.keys())}"
            return resp
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300]
        raise RuntimeError(f"HTTP {e.code}: {body}")

# ─── Testes API ───────────────────────────────────────────────────────────────
def testar_api():
    print("\n══ API FastAPI ══════════════════════════════════════════")

    # Health
    try:
        d = get("/health", expect_keys=["status", "db"])
        assert d["status"] == "ok",  f"status={d['status']}"
        assert d["db"]     == "ok",  f"db={d['db']}"
        ok(f"GET /health  →  status=ok  db=ok")
    except Exception as e:
        fail("GET /health", e)

    # Títulos
    try:
        d = get("/api/titles", expect_keys=["titles", "total"])
        total = d["total"]
        assert total > 0, "Nenhum título encontrado"
        ok(f"GET /api/titles  →  {total} título(s)")
    except Exception as e:
        fail("GET /api/titles", e)

    # BSR recente
    try:
        d = get("/api/bsr/recent?limit=5")
        n = len(d) if isinstance(d, list) else d.get("total", 0)
        if n > 0:
            ok(f"GET /api/bsr/recent  →  {n} registro(s)")
        else:
            warn("GET /api/bsr/recent — sem dados (cron ainda não rodou?)")
    except Exception as e:
        fail("GET /api/bsr/recent", e)

    # Sazonalidade
    try:
        d = get("/api/sazonalidade?mes=12")
        ok(f"GET /api/sazonalidade?mes=12  →  ok")
    except Exception as e:
        warn(f"GET /api/sazonalidade — {e}")

    # Estimador
    try:
        d = get("/api/estimador?bsr=5000")
        ok(f"GET /api/estimador?bsr=5000  →  ok")
    except Exception as e:
        warn(f"GET /api/estimador — {e}")

# ─── Testes Stripe ────────────────────────────────────────────────────────────
def testar_stripe():
    print("\n══ Stripe ═══════════════════════════════════════════════")

    # Import
    try:
        import stripe as _stripe
        ok(f"stripe lib importada  (v{_stripe.VERSION})")
    except ImportError:
        fail("stripe não instalado — rode: pip install stripe")
        return

    key = os.getenv("STRIPE_SECRET_KEY", "")
    if not key:
        warn("STRIPE_SECRET_KEY não definida — pulando testes Stripe via API")
        return

    _stripe.api_key = key
    mode = "TEST" if key.startswith("sk_test_") else "LIVE"
    print(f"  🔑  Modo: {mode}")

    # Credenciais
    try:
        account = _stripe.Account.retrieve()
        ok(f"Autenticação Stripe  →  conta={account.id}  país={account.country}")
    except Exception as e:
        fail("Autenticação Stripe falhou", e)
        return

    # Price IDs configurados
    price_mensal = os.getenv("STRIPE_PRICE_MENSAL", "")
    price_anual  = os.getenv("STRIPE_PRICE_ANUAL",  "")
    if price_mensal:
        try:
            p = _stripe.Price.retrieve(price_mensal)
            amt = f"R${p.unit_amount/100:.2f}"
            ok(f"STRIPE_PRICE_MENSAL  →  {price_mensal}  ({amt}/mês)")
        except Exception as e:
            fail(f"STRIPE_PRICE_MENSAL={price_mensal} inválido", e)
    else:
        warn("STRIPE_PRICE_MENSAL não definido — rode: python stripe_setup.py")

    if price_anual:
        try:
            p = _stripe.Price.retrieve(price_anual)
            amt = f"R${p.unit_amount/100:.2f}"
            ok(f"STRIPE_PRICE_ANUAL   →  {price_anual}  ({amt}/ano)")
        except Exception as e:
            fail(f"STRIPE_PRICE_ANUAL={price_anual} inválido", e)
    else:
        warn("STRIPE_PRICE_ANUAL não definido (opcional para beta)")

    # Webhook configurado
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    if webhook_secret.startswith("whsec_"):
        ok(f"STRIPE_WEBHOOK_SECRET  →  configurado")
    else:
        warn("STRIPE_WEBHOOK_SECRET não definido ou inválido")

    # Endpoint /stripe/criar-sessao (com chave de teste)
    if mode == "TEST" and price_mensal:
        try:
            d = post("/stripe/criar-sessao", {
                "email": args.email,
                "nome":  "Teste Beta",
                "plano": "mensal",
            }, expect_keys=["url", "session_id"])
            ok(f"POST /stripe/criar-sessao  →  sessão criada")
            print(f"       URL de checkout: {d['url'][:70]}...")
        except Exception as e:
            fail("POST /stripe/criar-sessao", e)
    elif not price_mensal:
        warn("Skipping criar-sessao — STRIPE_PRICE_MENSAL não configurado")
    else:
        warn("Skipping criar-sessao — modo LIVE (use sk_test_ para testar endpoint)")

# ─── Testes Banco ─────────────────────────────────────────────────────────────
def testar_banco():
    print("\n══ Banco de Dados ═══════════════════════════════════════")
    try:
        import psycopg2
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", 5432)),
            dbname=os.getenv("DB_NAME", "kindleranker"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASS", ""),
        )
        cur = conn.cursor()

        tabelas_obrigatorias = ["titles", "bsr_snapshots", "stores", "users", "subscriptions", "stripe_events"]
        cur.execute("SELECT tablename FROM pg_tables WHERE schemaname = 'public'")
        existentes = {r[0] for r in cur.fetchall()}

        for t in tabelas_obrigatorias:
            if t in existentes:
                cur.execute(f"SELECT COUNT(*) FROM {t}")
                n = cur.fetchone()[0]
                ok(f"Tabela {t}  →  {n} registros")
            else:
                fail(f"Tabela '{t}' não encontrada")

        # View assinantes_ativos
        if "assinantes_ativos" in existentes or _view_exists(cur, "assinantes_ativos"):
            ok("View assinantes_ativos  →  existe")
        else:
            warn("View assinantes_ativos não encontrada — rode schema_users.sql")

        cur.close(); conn.close()
    except ImportError:
        fail("psycopg2 não instalado")
    except Exception as e:
        fail("Conexão com banco falhou", e)

def _view_exists(cur, name):
    cur.execute("SELECT viewname FROM pg_views WHERE schemaname = 'public' AND viewname = %s", (name,))
    return bool(cur.fetchone())

# ─── Testes E-mail ────────────────────────────────────────────────────────────
def testar_email():
    print("\n══ E-mail (Resend) ══════════════════════════════════════")
    key = os.getenv("RESEND_API_KEY", "")
    if not key:
        warn("RESEND_API_KEY não definida — e-mails não serão enviados")
        return
    try:
        from email_utils import enviar_email
        ok("email_utils importado com sucesso")
    except Exception as e:
        fail("Importar email_utils", e)
        return

    # Só faz o send se passar --email explicitamente
    if "--email" in sys.argv:
        try:
            from email_utils import email_boas_vindas
            assunto, html = email_boas_vindas("Teste", args.email, API)
            r = enviar_email(args.email, f"[TESTE] {assunto}", html)
            if r:
                ok(f"E-mail de teste enviado para {args.email}")
            else:
                warn("Envio retornou falso — verifique logs do Resend")
        except Exception as e:
            fail("Envio de e-mail de teste", e)
    else:
        warn(f"Envio de e-mail pulado — passe --email seu@email.com para testar")

# ─── Main ─────────────────────────────────────────────────────────────────────
def main():
    print(f"KindleRanker BR — Test Suite Beta")
    print(f"API: {API}\n")

    start = time.time()

    if not args.stripe_only:
        testar_banco()
        testar_api()
        testar_email()

    if not args.api_only:
        testar_stripe()

    elapsed = time.time() - start

    print(f"\n{'═'*56}")
    print(f"  Resultado: {PASSOU} passou  |  {FALHOU} falhou  |  {AVISOS} aviso(s)  [{elapsed:.1f}s]")
    print(f"{'═'*56}")

    if FALHOU == 0 and AVISOS == 0:
        print("\n  🚀  Tudo verde — pode abrir o beta!\n")
    elif FALHOU == 0:
        print(f"\n  ✅  Sem falhas críticas — {AVISOS} aviso(s) não bloqueiam o lançamento.\n")
    else:
        print(f"\n  🛑  {FALHOU} falha(s) crítica(s) — resolva antes de abrir para usuários.\n")

    sys.exit(0 if FALHOU == 0 else 1)

if __name__ == "__main__":
    main()
