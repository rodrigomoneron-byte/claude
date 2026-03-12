"""
KindleRanker BR — Coletor de BSR
Coleta BSR atual de todos os ASINs via Rainforest API e salva no banco.

Uso:
    python bsr_collector.py                    # coleta todos os ASINs
    python bsr_collector.py --asin B08MV39BSH  # coleta um ASIN específico
    python bsr_collector.py --dry-run          # simula sem salvar

Env:
    DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
    RAINFOREST_API_KEY

Cron (2x/dia — 8h e 20h):
    0 8,20 * * * cd /home/user/kindleranker && python bsr_collector.py >> logs/bsr.log 2>&1
"""

import os
import time
import argparse
import logging
import requests
import psycopg2
from psycopg2.extras import execute_values
from datetime import datetime, timezone

# ── Logging ───────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)

# ── Config ────────────────────────────────────────────────────────────────────

RAINFOREST_KEY  = os.getenv("RAINFOREST_API_KEY", "")
RAINFOREST_URL  = "https://api.rainforestapi.com/request"
AMAZON_DOMAIN   = "amazon.com.br"
DELAY_ENTRE_REQ = 1.2   # segundos entre requests (evita rate limit)
MAX_RETRIES     = 3
TIMEOUT         = 15

# ── Banco ─────────────────────────────────────────────────────────────────────

def get_conn():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", 5432),
        dbname=os.getenv("DB_NAME", "kindleranker"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", ""),
    )

def get_asins(cur, asin_filter=None):
    if asin_filter:
        cur.execute("SELECT asin, titulo FROM titles WHERE asin = %s AND ativo = TRUE", (asin_filter,))
    else:
        cur.execute("SELECT asin, titulo FROM titles WHERE ativo = TRUE ORDER BY asin")
    return cur.fetchall()

def get_store_id(cur, codigo="Amazon.com.br"):
    cur.execute("SELECT id FROM stores WHERE codigo = %s", (codigo,))
    row = cur.fetchone()
    return row[0] if row else None

# ── Rainforest API ────────────────────────────────────────────────────────────

def fetch_bsr(asin: str) -> dict | None:
    """
    Busca dados do produto via Rainforest API.
    Retorna dict com bsr_geral, bsr_categoria, categoria_nome, browse_node_id.
    Retorna None se falhar após retries.
    """
    params = {
        "api_key":       RAINFOREST_KEY,
        "type":          "product",
        "amazon_domain": AMAZON_DOMAIN,
        "asin":          asin,
        "include_summarization_attributes": False,
        "include_a_plus_body": False,
    }

    for tentativa in range(1, MAX_RETRIES + 1):
        try:
            resp = requests.get(RAINFOREST_URL, params=params, timeout=TIMEOUT)

            if resp.status_code == 429:
                wait = 30 * tentativa
                log.warning(f"Rate limit atingido. Aguardando {wait}s...")
                time.sleep(wait)
                continue

            if resp.status_code != 200:
                log.error(f"ASIN {asin} — HTTP {resp.status_code}")
                return None

            data = resp.json()
            product = data.get("product", {})

            # BSR geral
            bsr_geral = None
            bestsellers_rank = product.get("bestsellers_rank")
            if isinstance(bestsellers_rank, list) and bestsellers_rank:
                bsr_geral = bestsellers_rank[0].get("rank")
            elif isinstance(bestsellers_rank, int):
                bsr_geral = bestsellers_rank

            # BSR por categoria (primeira categoria específica)
            bsr_categoria   = None
            categoria_nome  = None
            browse_node_id  = None

            categorias = product.get("categories", [])
            if categorias:
                # Pega a categoria mais específica (última da lista)
                cat = categorias[-1]
                categoria_nome = cat.get("name")
                browse_node_id = str(cat.get("id", ""))

            # BSR dentro da categoria (bestsellers_rank pode ter múltiplos)
            if isinstance(bestsellers_rank, list) and len(bestsellers_rank) > 1:
                bsr_categoria = bestsellers_rank[1].get("rank")
                if not categoria_nome:
                    categoria_nome = bestsellers_rank[1].get("category")

            return {
                "bsr_geral":       bsr_geral,
                "bsr_categoria":   bsr_categoria,
                "categoria_nome":  categoria_nome,
                "browse_node_id":  browse_node_id,
                "titulo_amazon":   product.get("title"),
                "preco":           product.get("buybox_winner", {}).get("price", {}).get("value"),
            }

        except requests.exceptions.Timeout:
            log.warning(f"ASIN {asin} — Timeout (tentativa {tentativa}/{MAX_RETRIES})")
            time.sleep(5 * tentativa)
        except Exception as e:
            log.error(f"ASIN {asin} — Erro inesperado: {e}")
            return None

    return None

# ── Calibração ────────────────────────────────────────────────────────────────

def atualizar_calibracao(cur, asin: str, bsr_geral: int, store_id: int):
    """
    Cruza o BSR atual com as vendas do último mês para refinar a calibração.
    Incrementa o contador de amostras na faixa correspondente.
    """
    if not bsr_geral:
        return

    # Vendas médias diárias do último mês para esse ASIN
    cur.execute("""
        SELECT
            ROUND(SUM(unidades_liquidas)::NUMERIC / 30, 2) AS vendas_diarias
        FROM monthly_sales
        WHERE asin = %s
          AND store_id = %s
          AND periodo >= DATE_TRUNC('month', NOW() - INTERVAL '1 month')::DATE
          AND moeda = 'BRL'
    """, (asin, store_id))

    row = cur.fetchone()
    if not row or row[0] is None:
        return

    vendas_diarias = float(row[0])

    # Atualiza a faixa de calibração correspondente
    cur.execute("""
        UPDATE bsr_calibration
        SET
            vendas_diarias_media = ROUND(
                (vendas_diarias_media * amostras + %s) / (amostras + 1), 2
            ),
            amostras = amostras + 1,
            ultima_atualizacao = CURRENT_DATE
        WHERE mercado = 'Amazon.com.br'
          AND categoria IS NULL
          AND bsr_min <= %s AND bsr_max >= %s
    """, (vendas_diarias, bsr_geral, bsr_geral))


# ── Core ──────────────────────────────────────────────────────────────────────

def coletar(asins: list, store_id: int, cur, dry_run: bool = False):
    coletados  = 0
    sem_bsr    = 0
    erros      = 0
    inicio     = datetime.now()

    log.info(f"Iniciando coleta de {len(asins)} ASINs em {AMAZON_DOMAIN}")

    registros = []

    for i, (asin, titulo) in enumerate(asins, 1):
        log.info(f"[{i}/{len(asins)}] {asin} — {titulo[:50]}")

        resultado = fetch_bsr(asin)

        if resultado is None:
            erros += 1
            log.warning(f"  → Falhou")
            time.sleep(DELAY_ENTRE_REQ)
            continue

        bsr_geral = resultado.get("bsr_geral")

        if not bsr_geral:
            sem_bsr += 1
            log.info(f"  → Sem BSR disponível")
            time.sleep(DELAY_ENTRE_REQ)
            continue

        log.info(f"  → BSR geral: {bsr_geral:,} | Categoria: {resultado.get('categoria_nome','?')} #{resultado.get('bsr_categoria','?')}")

        registros.append((
            asin,
            store_id,
            datetime.now(timezone.utc),
            bsr_geral,
            resultado.get("bsr_categoria"),
            resultado.get("categoria_nome"),
            resultado.get("browse_node_id"),
        ))

        if not dry_run:
            atualizar_calibracao(cur, asin, bsr_geral, store_id)

        coletados += 1
        time.sleep(DELAY_ENTRE_REQ)

    if registros and not dry_run:
        execute_values(cur, """
            INSERT INTO bsr_history (asin, store_id, coletado_em, bsr_geral, bsr_categoria, categoria_nome, browse_node_id)
            VALUES %s
            ON CONFLICT (asin, store_id, coletado_em) DO NOTHING
        """, registros)
        log.info(f"  → {len(registros)} registros salvos no banco.")

    elif dry_run:
        log.info(f"  → DRY RUN: {len(registros)} registros seriam salvos.")

    duracao = (datetime.now() - inicio).seconds
    log.info(f"\n{'='*50}")
    log.info(f"Coleta finalizada em {duracao}s")
    log.info(f"  Coletados:  {coletados}")
    log.info(f"  Sem BSR:    {sem_bsr}")
    log.info(f"  Erros:      {erros}")
    log.info(f"{'='*50}\n")

    return coletados, erros


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Coleta BSR via Rainforest API")
    parser.add_argument("--asin",    help="Coletar apenas este ASIN")
    parser.add_argument("--dry-run", action="store_true", help="Simula sem salvar")
    args = parser.parse_args()

    if not RAINFOREST_KEY and not args.dry_run:
        log.error("RAINFOREST_API_KEY não definida. Exporte a variável e tente novamente.")
        log.error("  export RAINFOREST_API_KEY=sua_chave_aqui")
        return

    conn = get_conn()
    conn.autocommit = False
    cur  = conn.cursor()

    try:
        store_id = get_store_id(cur)
        if not store_id:
            log.error("Loja Amazon.com.br não encontrada no banco.")
            return

        asins = get_asins(cur, asin_filter=args.asin)
        if not asins:
            log.warning("Nenhum ASIN encontrado.")
            return

        coletar(asins, store_id, cur, dry_run=args.dry_run)

        if not args.dry_run:
            conn.commit()

    except Exception as e:
        conn.rollback()
        log.error(f"Erro fatal: {e}")
        raise
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    main()
