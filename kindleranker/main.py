"""
KindleRanker BR — FastAPI
Rodar:
    uvicorn main:app --host 0.0.0.0 --port 8000
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload   # dev
Env:
    DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
    ANTHROPIC_API_KEY
    RESEND_API_KEY  (opcional — e-mails transacionais)
    ALLOWED_ORIGINS (opcional — default: *)
"""
import os
import logging
from contextlib import asynccontextmanager
from datetime import date, datetime
from typing import Optional

import psycopg2
import psycopg2.extras
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai import router as ai_router
from stripe_routes import router as stripe_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)

# ── DB ────────────────────────────────────────────────────────────────────────
def get_conn():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 5432)),
        dbname=os.getenv("DB_NAME", "kindleranker"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", ""),
        cursor_factory=psycopg2.extras.RealDictCursor,
    )

def with_db(fn):
    """Decorator: injeta conn + cur, comita e fecha automaticamente."""
    from functools import wraps
    @wraps(fn)
    def wrapper(*args, **kwargs):
        conn = get_conn()
        cur  = conn.cursor()
        try:
            result = fn(cur, *args, **kwargs)
            conn.commit()
            return result
        except Exception:
            conn.rollback()
            raise
        finally:
            cur.close()
            conn.close()
    return wrapper

# ── App ───────────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("KindleRanker API iniciada.")
    yield
    log.info("KindleRanker API encerrada.")

app = FastAPI(
    title="KindleRanker BR",
    version="1.0.0",
    description="API de BSR, vendas e análise de títulos Kindle na Amazon.com.br",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router,     prefix="/ai",     tags=["IA"])
app.include_router(stripe_router, prefix="/stripe", tags=["Stripe"])

# ── Helpers ───────────────────────────────────────────────────────────────────
STORE_CODIGO = "Amazon.com.br"

def get_store_id(cur) -> int:
    cur.execute("SELECT id FROM stores WHERE codigo = %s", (STORE_CODIGO,))
    row = cur.fetchone()
    if not row:
        raise HTTPException(500, f"Loja '{STORE_CODIGO}' não encontrada no banco.")
    return row["id"]

# ── /api/titles ───────────────────────────────────────────────────────────────
@app.get("/api/titles", tags=["Títulos"])
def listar_titulos():
    """Catálogo completo com BSR atual, sparkline 7d e métricas do último mês."""
    conn = get_conn(); cur = conn.cursor()
    try:
        store_id = get_store_id(cur)

        cur.execute("""
            SELECT
                t.asin,
                t.titulo,
                -- BSR atual (última coleta)
                b_atual.bsr_geral,
                b_atual.bsr_categoria,
                b_atual.categoria_nome,
                -- Sparkline: últimas 14 coletas ≈ 7 dias (2x/dia)
                b_spark.bsr_7d,
                -- Métricas do último mês fechado
                ms.vendas_mes,
                ms.kenp_mes,
                ms.royalties_mes
            FROM titles t
            -- BSR mais recente
            LEFT JOIN LATERAL (
                SELECT bsr_geral, bsr_categoria, categoria_nome
                FROM bsr_history
                WHERE asin = t.asin AND store_id = %(store_id)s
                ORDER BY coletado_em DESC LIMIT 1
            ) b_atual ON TRUE
            -- Sparkline: array dos últimos 14 BSRs
            LEFT JOIN LATERAL (
                SELECT array_agg(bsr_geral ORDER BY coletado_em ASC) AS bsr_7d
                FROM (
                    SELECT bsr_geral, coletado_em
                    FROM bsr_history
                    WHERE asin = t.asin AND store_id = %(store_id)s
                      AND bsr_geral IS NOT NULL
                    ORDER BY coletado_em DESC LIMIT 14
                ) sub
            ) b_spark ON TRUE
            -- Vendas do último mês
            LEFT JOIN LATERAL (
                SELECT
                    SUM(unidades_liquidas) AS vendas_mes,
                    SUM(kenp)             AS kenp_mes,
                    SUM(royalties_brl)    AS royalties_mes
                FROM monthly_sales
                WHERE asin = t.asin AND store_id = %(store_id)s
                  AND periodo >= DATE_TRUNC('month', NOW() - INTERVAL '1 month')::DATE
            ) ms ON TRUE
            WHERE t.ativo = TRUE
            ORDER BY b_atual.bsr_geral ASC NULLS LAST, t.titulo
        """, {"store_id": store_id})

        rows = cur.fetchall()
        return [dict(r) for r in rows]
    finally:
        cur.close(); conn.close()

# ── /api/titles/{asin} ────────────────────────────────────────────────────────
@app.get("/api/titles/{asin}", tags=["Títulos"])
def detalhe_titulo(asin: str):
    """Dados completos de um título."""
    conn = get_conn(); cur = conn.cursor()
    try:
        store_id = get_store_id(cur)

        cur.execute("""
            SELECT
                t.asin, t.titulo,
                b.bsr_geral, b.bsr_categoria, b.categoria_nome,
                ms.vendas_mes, ms.kenp_mes, ms.royalties_mes
            FROM titles t
            LEFT JOIN LATERAL (
                SELECT bsr_geral, bsr_categoria, categoria_nome
                FROM bsr_history
                WHERE asin = t.asin AND store_id = %(store_id)s
                ORDER BY coletado_em DESC LIMIT 1
            ) b ON TRUE
            LEFT JOIN LATERAL (
                SELECT
                    SUM(unidades_liquidas) AS vendas_mes,
                    SUM(kenp)             AS kenp_mes,
                    SUM(royalties_brl)    AS royalties_mes
                FROM monthly_sales
                WHERE asin = t.asin AND store_id = %(store_id)s
                  AND periodo >= DATE_TRUNC('month', NOW() - INTERVAL '1 month')::DATE
            ) ms ON TRUE
            WHERE t.asin = %(asin)s AND t.ativo = TRUE
        """, {"store_id": store_id, "asin": asin})

        row = cur.fetchone()
        if not row:
            raise HTTPException(404, f"ASIN {asin} não encontrado.")
        return dict(row)
    finally:
        cur.close(); conn.close()

# ── /api/titles/{asin}/bsr ────────────────────────────────────────────────────
@app.get("/api/titles/{asin}/bsr", tags=["Histórico"])
def historico_bsr(asin: str, dias: int = Query(30, ge=1, le=365)):
    """Histórico de BSR dos últimos N dias."""
    conn = get_conn(); cur = conn.cursor()
    try:
        store_id = get_store_id(cur)
        cur.execute("""
            SELECT coletado_em, bsr_geral, bsr_categoria
            FROM bsr_history
            WHERE asin = %s AND store_id = %s
              AND coletado_em >= NOW() - (%s || ' days')::INTERVAL
            ORDER BY coletado_em ASC
        """, (asin, store_id, dias))
        return [dict(r) for r in cur.fetchall()]
    finally:
        cur.close(); conn.close()

# ── /api/titles/{asin}/vendas ─────────────────────────────────────────────────
@app.get("/api/titles/{asin}/vendas", tags=["Histórico"])
def historico_vendas(asin: str):
    """Histórico mensal de vendas, KENP e royalties."""
    conn = get_conn(); cur = conn.cursor()
    try:
        store_id = get_store_id(cur)
        cur.execute("""
            SELECT periodo, unidades_liquidas, kenp, royalties_brl
            FROM monthly_sales
            WHERE asin = %s AND store_id = %s AND moeda = 'BRL'
            ORDER BY periodo ASC
        """, (asin, store_id))
        return [dict(r) for r in cur.fetchall()]
    finally:
        cur.close(); conn.close()

# ── /api/estimador ────────────────────────────────────────────────────────────
@app.get("/api/estimador", tags=["Estimador"])
def estimador(bsr: int = Query(..., ge=1)):
    """Estima vendas diárias e mensais para um BSR dado."""
    conn = get_conn(); cur = conn.cursor()
    try:
        cur.execute("""
            SELECT bsr_min, bsr_max, vendas_diarias_media, amostras
            FROM bsr_calibration
            WHERE mercado = %s
              AND categoria IS NULL
              AND bsr_min <= %s AND bsr_max >= %s
            LIMIT 1
        """, (STORE_CODIGO, bsr, bsr))
        row = cur.fetchone()
        if not row:
            raise HTTPException(404, f"Sem calibração para BSR #{bsr:,}.")
        d = dict(row)
        d["vendas_diarias"]  = float(d["vendas_diarias_media"])
        d["vendas_mensais"]  = round(d["vendas_diarias"] * 30)
        return d
    finally:
        cur.close(); conn.close()

# ── /api/calibracao ───────────────────────────────────────────────────────────
@app.get("/api/calibracao", tags=["Estimador"])
def calibracao():
    """Tabela completa de calibração BSR → vendas."""
    conn = get_conn(); cur = conn.cursor()
    try:
        cur.execute("""
            SELECT bsr_min, bsr_max, vendas_diarias_media, amostras, ultima_atualizacao
            FROM bsr_calibration
            WHERE mercado = %s AND categoria IS NULL
            ORDER BY bsr_min ASC
        """, (STORE_CODIGO,))
        return [dict(r) for r in cur.fetchall()]
    finally:
        cur.close(); conn.close()

# ── /api/sazonalidade ─────────────────────────────────────────────────────────
@app.get("/api/sazonalidade", tags=["Sazonalidade"])
def sazonalidade(asin: Optional[str] = None):
    """
    Dados de sazonalidade agrupados por ano/mês.
    Se asin for fornecido, filtra por título.
    """
    conn = get_conn(); cur = conn.cursor()
    try:
        store_id = get_store_id(cur)

        if asin:
            cur.execute("""
                SELECT
                    EXTRACT(YEAR  FROM periodo)::INT AS ano,
                    EXTRACT(MONTH FROM periodo)::INT AS mes,
                    SUM(unidades_liquidas)            AS total_vendas,
                    SUM(kenp)                         AS total_kenp,
                    AVG(b.bsr_mensal)                 AS media_bsr
                FROM monthly_sales ms
                LEFT JOIN LATERAL (
                    SELECT AVG(bsr_geral)::INT AS bsr_mensal
                    FROM bsr_history
                    WHERE asin = ms.asin AND store_id = ms.store_id
                      AND DATE_TRUNC('month', coletado_em) = DATE_TRUNC('month', ms.periodo::TIMESTAMP)
                ) b ON TRUE
                WHERE ms.asin = %s AND ms.store_id = %s AND ms.moeda = 'BRL'
                GROUP BY ano, mes
                ORDER BY ano ASC, mes ASC
            """, (asin, store_id))
        else:
            cur.execute("""
                SELECT
                    EXTRACT(YEAR  FROM periodo)::INT AS ano,
                    EXTRACT(MONTH FROM periodo)::INT AS mes,
                    SUM(unidades_liquidas)            AS total_vendas,
                    SUM(kenp)                         AS total_kenp,
                    NULL                              AS media_bsr
                FROM monthly_sales
                WHERE store_id = %s AND moeda = 'BRL'
                GROUP BY ano, mes
                ORDER BY ano ASC, mes ASC
            """, (store_id,))

        rows = cur.fetchall()
        # Adiciona índice sazonal (1.0 = média anual)
        resultado = [dict(r) for r in rows]
        media_geral = (
            sum(r["total_vendas"] or 0 for r in resultado) / len(resultado)
            if resultado else 1
        ) or 1
        for r in resultado:
            r["indice_sazonal"] = round((r["total_vendas"] or 0) / media_geral, 2)
        return resultado
    finally:
        cur.close(); conn.close()

# ── /api/email/teste ──────────────────────────────────────────────────────────
@app.post("/api/email/teste", tags=["Email"], include_in_schema=bool(os.getenv("RESEND_API_KEY")))
def email_teste(para: str):
    """Envia e-mail de teste via Resend (debug)."""
    from email_utils import enviar_email
    enviar_email(
        para=para,
        assunto="✅ KindleRanker — E-mail configurado com sucesso",
        html="<h2 style='color:#c9a84c'>Funcionou!</h2><p>Seu KindleRanker está configurado para enviar e-mails.</p>",
    )
    return {"ok": True, "enviado_para": para}

# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/health", tags=["Sistema"])
def health():
    try:
        conn = get_conn()
        conn.close()
        db_ok = True
    except Exception:
        db_ok = False
    return {
        "status": "ok" if db_ok else "degraded",
        "db": "ok" if db_ok else "error",
        "version": app.version,
    }
