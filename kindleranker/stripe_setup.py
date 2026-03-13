#!/usr/bin/env python3
"""
KindleRanker BR — Setup automático Stripe
Cria produtos, preços e webhook endpoint via API.
Salva os IDs gerados em stripe_ids.env (pronto para copiar no systemd).

Uso:
    python stripe_setup.py                          # modo produção
    python stripe_setup.py --test                   # modo teste (sk_test_...)
    python stripe_setup.py --webhook-only           # só (re)cria o webhook
    python stripe_setup.py --show                   # mostra IDs já cadastrados

Requer:
    STRIPE_SECRET_KEY no ambiente (ou via --key)
    pip install stripe
"""
import argparse
import os
import sys
import stripe

# ─── CLI ──────────────────────────────────────────────────────────────────────
parser = argparse.ArgumentParser(description="KindleRanker Stripe Setup")
parser.add_argument("--key",          help="Stripe secret key (sobrescreve env)")
parser.add_argument("--webhook-url",  default="https://api.kindleranker.com.br/stripe/webhook")
parser.add_argument("--dashboard-url",default="https://app.kindleranker.com.br")
parser.add_argument("--test",         action="store_true", help="Usa sk_test_ em vez de sk_live_")
parser.add_argument("--webhook-only", action="store_true", help="Só cria/atualiza o webhook")
parser.add_argument("--show",         action="store_true", help="Lista produtos e preços cadastrados")
args = parser.parse_args()

stripe.api_key = args.key or os.getenv("STRIPE_SECRET_KEY", "")
if not stripe.api_key:
    sys.exit("❌  STRIPE_SECRET_KEY não encontrada. Exporte a variável ou use --key sk_...")

PREFIX = "test" if stripe.api_key.startswith("sk_test_") else "live"
print(f"\n🔑  Modo: {PREFIX.upper()} ({stripe.api_key[:14]}...)\n")

WEBHOOK_EVENTS = [
    "checkout.session.completed",
    "invoice.paid",
    "invoice.payment_failed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
]

# ─── --show ───────────────────────────────────────────────────────────────────
if args.show:
    print("── Produtos ──────────────────────────────────────────")
    for p in stripe.Product.list(active=True, limit=20).data:
        print(f"  {p.id}  {p.name}")
    print("\n── Preços ────────────────────────────────────────────")
    for pr in stripe.Price.list(active=True, limit=20).data:
        amt = f"R${pr.unit_amount/100:.2f}" if pr.unit_amount else "—"
        interval = pr.recurring.interval if pr.recurring else "one_time"
        print(f"  {pr.id}  {amt}/{interval}  ({pr.product})")
    print("\n── Webhooks ──────────────────────────────────────────")
    for wh in stripe.WebhookEndpoint.list(limit=10).data:
        print(f"  {wh.id}  {wh.status}  {wh.url}")
    sys.exit(0)

# ─── Produto KindleRanker BR ──────────────────────────────────────────────────
def get_or_create_product():
    # Verifica se já existe
    existing = [
        p for p in stripe.Product.list(active=True, limit=100).data
        if p.name == "KindleRanker BR"
    ]
    if existing:
        print(f"✅  Produto já existe: {existing[0].id}")
        return existing[0].id

    product = stripe.Product.create(
        name="KindleRanker BR",
        description="Monitoramento de BSR e análise de catálogo Kindle na Amazon.com.br",
        metadata={"app": "kindleranker"},
        images=[],
        url=args.dashboard_url,
    )
    print(f"✅  Produto criado: {product.id}")
    return product.id

# ─── Preços ───────────────────────────────────────────────────────────────────
def get_or_create_price(product_id: str, amount_centavos: int, interval: str, nickname: str) -> str:
    # Verifica se já existe preço ativo com o mesmo nick
    existing = [
        p for p in stripe.Price.list(product=product_id, active=True, limit=100).data
        if p.nickname == nickname
    ]
    if existing:
        print(f"✅  Preço '{nickname}' já existe: {existing[0].id}")
        return existing[0].id

    price = stripe.Price.create(
        product=product_id,
        unit_amount=amount_centavos,
        currency="brl",
        recurring={"interval": interval},
        nickname=nickname,
        metadata={"app": "kindleranker", "plano": interval},
    )
    print(f"✅  Preço '{nickname}' criado: {price.id}  (R${amount_centavos/100:.2f}/{interval})")
    return price.id

# ─── Webhook ──────────────────────────────────────────────────────────────────
def get_or_create_webhook(url: str) -> tuple[str, str]:
    existing = [
        wh for wh in stripe.WebhookEndpoint.list(limit=50).data
        if wh.url == url
    ]
    if existing:
        wh = existing[0]
        print(f"✅  Webhook já existe: {wh.id}  status={wh.status}")
        # Garante que os eventos estão configurados
        stripe.WebhookEndpoint.modify(wh.id, enabled_events=WEBHOOK_EVENTS)
        print(f"   Eventos atualizados.")
        # secret não é retornado após criação; lembrar de salvar manualmente
        print(f"   ⚠️  Para ver o webhook secret acesse: painel.stripe.com → Developers → Webhooks → {wh.id}")
        return wh.id, ""

    wh = stripe.WebhookEndpoint.create(
        url=url,
        enabled_events=WEBHOOK_EVENTS,
        description="KindleRanker BR — API endpoint",
        metadata={"app": "kindleranker"},
    )
    secret = wh.secret  # disponível apenas no momento da criação
    print(f"✅  Webhook criado: {wh.id}")
    print(f"   URL: {wh.url}")
    print(f"   Secret: {secret}")
    return wh.id, secret

# ─── Main ─────────────────────────────────────────────────────────────────────
def main():
    results = {}

    if not args.webhook_only:
        print("── Configurando Produto ──────────────────────────────")
        product_id = get_or_create_product()
        results["STRIPE_PRODUCT_ID"] = product_id

        print("\n── Configurando Preços ───────────────────────────────")
        price_mensal = get_or_create_price(product_id, 4700, "month", "KindleRanker Mensal")
        price_anual  = get_or_create_price(product_id, 39700, "year",  "KindleRanker Anual")
        results["STRIPE_PRICE_MENSAL"] = price_mensal
        results["STRIPE_PRICE_ANUAL"]  = price_anual

    print("\n── Configurando Webhook ──────────────────────────────")
    wh_id, wh_secret = get_or_create_webhook(args.webhook_url)
    results["STRIPE_WEBHOOK_ID"] = wh_id
    if wh_secret:
        results["STRIPE_WEBHOOK_SECRET"] = wh_secret

    # Salva em arquivo .env para copiar no systemd
    env_path = os.path.join(os.path.dirname(__file__), "stripe_ids.env")
    with open(env_path, "w") as f:
        f.write(f"# Gerado por stripe_setup.py — {PREFIX.upper()}\n")
        f.write(f"# Copie estas linhas para /etc/systemd/system/kindleranker-api.service\n\n")
        for k, v in results.items():
            if v:
                f.write(f"Environment={k}={v}\n")

    print(f"\n── Arquivo gerado ────────────────────────────────────")
    print(f"   {env_path}")
    print()
    with open(env_path) as f:
        print(f.read())

    print("── Próximos passos ───────────────────────────────────")
    if wh_secret:
        print(f"1. SALVE o webhook secret agora (não será exibido novamente):")
        print(f"   STRIPE_WEBHOOK_SECRET={wh_secret}")
    else:
        print("1. Webhook secret: recupere em painel.stripe.com → Developers → Webhooks")
    print("2. Adicione as variáveis ao .service do systemd")
    print("3. sudo systemctl daemon-reload && sudo systemctl restart kindleranker-api")
    print("4. python test_beta.py  ← testa o fluxo completo")
    print()

if __name__ == "__main__":
    main()
