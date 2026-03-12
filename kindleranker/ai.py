"""
KindleRanker BR — Integração Claude AI
Análise contextualizada de desempenho de títulos Kindle em português.

Endpoints:
    POST /ai/analisar/{asin}  → análise completa de um título
    POST /ai/portfolio         → visão geral do portfólio
"""
import os
import json
import logging
from datetime import datetime, timezone
from typing import Optional

import psycopg2
import psycopg2.extras
from anthropic import Anthropic
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

log    = logging.getLogger(__name__)
router = APIRouter()
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY", ""))

MODEL = "claude-sonnet-4-6"

# ── DB helper ─────────────────────────────────────────────────────────────────
def get_conn():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", 5432),
        dbname=os.getenv("DB_NAME", "kindleranker"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", ""),
        cursor_factory=psycopg2.extras.RealDictCursor,
    )

# ── Response model ─────────────────────────────────────────────────────────────
class AnaliseResponse(BaseModel):
    asin:        str
    titulo:      str
    diagnostico: str
    oportunidades: list[str]
    acoes:       list[str]
    alerta:      Optional[str]
    confianca:   str          # "alta" | "media" | "baixa"
    modelo:      str
    gerado_em:   str

class PortfolioResponse(BaseModel):
    total_titulos:  int
    diagnostico:    str
    destaques:      list[str]
    alertas:        list[str]
    acoes:          list[str]
    modelo:         str
    gerado_em:      str

# ── Context builders ──────────────────────────────────────────────────────────
def _bsr_tier(bsr: Optional[int]) -> str:
    if not bsr:        return "sem ranking"
    if bsr < 1_000:    return "excelente (Top 1.000)"
    if bsr < 5_000:    return "ótimo (Top 5.000)"
    if bsr < 20_000:   return "bom (Top 20.000)"
    if bsr < 100_000:  return "razoável (Top 100.000)"
    return "fraco (acima de 100.000)"

def _tendencia(bsr_hist: list) -> str:
    if len(bsr_hist) < 2:
        return "sem dados suficientes"
    primeiro = bsr_hist[0]["bsr_geral"]
    ultimo   = bsr_hist[-1]["bsr_geral"]
    if not primeiro or not ultimo:
        return "sem dados suficientes"
    delta = ultimo - primeiro
    pct   = abs(delta) / primeiro * 100
    if delta < 0:
        return f"melhorando — BSR caiu {pct:.0f}% nos últimos {len(bsr_hist)} registros (subiu no ranking)"
    if delta > 0:
        return f"piorando — BSR subiu {pct:.0f}% nos últimos {len(bsr_hist)} registros (caiu no ranking)"
    return "estável"

def build_titulo_context(cur, asin: str) -> dict:
    """Coleta todos os dados relevantes de um título para o prompt."""
    # Dados básicos
    cur.execute("""
        SELECT t.asin, t.titulo, t.ativo,
               s.codigo AS store
        FROM titles t
        JOIN stores s ON s.id = (SELECT id FROM stores WHERE codigo = 'Amazon.com.br' LIMIT 1)
        WHERE t.asin = %s
    """, (asin,))
    titulo_row = cur.fetchone()
    if not titulo_row:
        return {}

    # BSR atual e histórico 30d
    cur.execute("""
        SELECT bsr_geral, bsr_categoria, categoria_nome, coletado_em
        FROM bsr_history
        WHERE asin = %s
          AND store_id = (SELECT id FROM stores WHERE codigo = 'Amazon.com.br' LIMIT 1)
          AND coletado_em >= NOW() - INTERVAL '30 days'
        ORDER BY coletado_em ASC
    """, (asin,))
    bsr_hist = cur.fetchall()

    bsr_atual = bsr_hist[-1]["bsr_geral"] if bsr_hist else None
    bsr_cat   = bsr_hist[-1]["bsr_categoria"] if bsr_hist else None
    cat_nome  = bsr_hist[-1]["categoria_nome"] if bsr_hist else None

    # Média BSR 7d vs 30d
    bsr_7d  = [r["bsr_geral"] for r in bsr_hist[-14:] if r["bsr_geral"]]  # últimas 14 coletas ≈ 7d
    bsr_30d = [r["bsr_geral"] for r in bsr_hist if r["bsr_geral"]]
    media_7d  = round(sum(bsr_7d) / len(bsr_7d))   if bsr_7d  else None
    media_30d = round(sum(bsr_30d) / len(bsr_30d)) if bsr_30d else None

    # Vendas últimos 3 meses
    cur.execute("""
        SELECT periodo, unidades_liquidas, kenp, royalties_brl
        FROM monthly_sales
        WHERE asin = %s
          AND store_id = (SELECT id FROM stores WHERE codigo = 'Amazon.com.br' LIMIT 1)
          AND periodo >= DATE_TRUNC('month', NOW() - INTERVAL '3 months')::DATE
        ORDER BY periodo DESC
    """, (asin,))
    vendas = cur.fetchall()

    # Calibração para o BSR atual
    estimativa = None
    if bsr_atual:
        cur.execute("""
            SELECT vendas_diarias_media, amostras, bsr_min, bsr_max
            FROM bsr_calibration
            WHERE mercado = 'Amazon.com.br'
              AND categoria IS NULL
              AND bsr_min <= %s AND bsr_max >= %s
            LIMIT 1
        """, (bsr_atual, bsr_atual))
        estimativa = cur.fetchone()

    return {
        "titulo":      titulo_row["titulo"],
        "asin":        asin,
        "bsr_atual":   bsr_atual,
        "bsr_cat":     bsr_cat,
        "cat_nome":    cat_nome,
        "tier":        _bsr_tier(bsr_atual),
        "tendencia":   _tendencia(list(bsr_hist)),
        "media_bsr_7d":  media_7d,
        "media_bsr_30d": media_30d,
        "n_coletas":   len(bsr_hist),
        "vendas":      [dict(v) for v in vendas],
        "estimativa":  dict(estimativa) if estimativa else None,
    }

def build_portfolio_context(cur) -> dict:
    """Visão agregada do portfólio."""
    cur.execute("""
        SELECT t.asin, t.titulo,
               b.bsr_geral,
               b.categoria_nome,
               ms.total_vendas,
               ms.total_kenp,
               ms.total_royalties
        FROM titles t
        LEFT JOIN LATERAL (
            SELECT bsr_geral, categoria_nome
            FROM bsr_history
            WHERE asin = t.asin
            ORDER BY coletado_em DESC LIMIT 1
        ) b ON TRUE
        LEFT JOIN LATERAL (
            SELECT SUM(unidades_liquidas) AS total_vendas,
                   SUM(kenp)             AS total_kenp,
                   SUM(royalties_brl)    AS total_royalties
            FROM monthly_sales
            WHERE asin = t.asin
              AND periodo >= DATE_TRUNC('month', NOW() - INTERVAL '1 month')::DATE
        ) ms ON TRUE
        WHERE t.ativo = TRUE
        ORDER BY b.bsr_geral ASC NULLS LAST
    """)
    titulos = cur.fetchall()

    total_royalties = sum(float(t["total_royalties"] or 0) for t in titulos)
    total_vendas    = sum(int(t["total_vendas"] or 0) for t in titulos)

    top3    = [t for t in titulos if t["bsr_geral"] and t["bsr_geral"] < 5_000][:3]
    em_risco = [t for t in titulos if t["bsr_geral"] and t["bsr_geral"] > 100_000]

    return {
        "total":          len(titulos),
        "total_royalties": total_royalties,
        "total_vendas":   total_vendas,
        "top3":           [dict(t) for t in top3],
        "em_risco":       [dict(t) for t in em_risco],
        "titulos":        [dict(t) for t in titulos],
    }

# ── Prompt builders ───────────────────────────────────────────────────────────
SYSTEM_PROMPT = """Você é um analista especializado em publicação Kindle na Amazon Brasil.
Analisa dados de BSR (Best Sellers Rank), vendas e KENP para autores e editoras independentes.
Responde SEMPRE em português brasileiro, de forma direta e prática.
Suas análises são baseadas em dados reais — sem achismos.
Tom: profissional mas acessível. Evite jargão excessivo."""

def prompt_titulo(ctx: dict) -> str:
    vendas_str = ""
    for v in ctx.get("vendas", []):
        vendas_str += f"  • {v['periodo']}: {v.get('unidades_liquidas','?')} un., KENP {v.get('kenp','?')}, Royalties R${v.get('royalties_brl','?')}\n"

    est = ctx.get("estimativa")
    est_str = (
        f"Estimativa da calibração: ~{est['vendas_diarias_media']:.1f} vendas/dia "
        f"(faixa BSR {est['bsr_min']:,}–{est['bsr_max']:,}, {est['amostras']} amostras)"
        if est else "Sem calibração disponível para esse BSR"
    )

    return f"""Analise o desempenho do seguinte título Kindle na Amazon Brasil:

**Título:** {ctx['titulo']}
**ASIN:** {ctx['asin']}

**BSR atual:** #{ctx['bsr_atual']:,} — tier: {ctx['tier']}
**BSR na categoria:** {'#' + str(ctx['bsr_cat']) if ctx['bsr_cat'] else 'N/D'} ({ctx.get('cat_nome','N/D')})
**Tendência (30 dias):** {ctx['tendencia']}
**Média BSR 7d:** {'#' + f"{ctx['media_bsr_7d']:,}" if ctx['media_bsr_7d'] else 'N/D'}
**Média BSR 30d:** {'#' + f"{ctx['media_bsr_30d']:,}" if ctx['media_bsr_30d'] else 'N/D'}
**Coletas disponíveis:** {ctx['n_coletas']} (últimos 30 dias)

**Vendas recentes:**
{vendas_str if vendas_str else '  • Sem dados de vendas disponíveis'}

**{est_str}**

Retorne um JSON com exatamente este formato (sem markdown, apenas JSON puro):
{{
  "diagnostico": "parágrafo único (3-4 frases) sobre o estado atual do título",
  "oportunidades": ["oportunidade 1", "oportunidade 2", "oportunidade 3"],
  "acoes": ["ação concreta 1", "ação concreta 2", "ação concreta 3"],
  "alerta": "mensagem de alerta urgente se houver, ou null",
  "confianca": "alta|media|baixa"
}}

A confiança reflete a quantidade e qualidade dos dados disponíveis."""

def prompt_portfolio(ctx: dict) -> str:
    top3_str = "\n".join(
        f"  • {t['titulo'][:40]} — BSR #{t['bsr_geral']:,}" for t in ctx["top3"]
    ) or "  • Nenhum título no top 5.000"

    risco_str = "\n".join(
        f"  • {t['titulo'][:40]} — BSR #{t['bsr_geral']:,}" for t in ctx["em_risco"]
    ) or "  • Nenhum título em zona de risco"

    return f"""Analise o portfólio KindleRanker BR:

**Total de títulos ativos:** {ctx['total']}
**Royalties totais (último mês):** R$ {ctx['total_royalties']:,.2f}
**Vendas totais (último mês):** {ctx['total_vendas']:,} unidades

**Top performers (BSR < 5.000):**
{top3_str}

**Em risco (BSR > 100.000):**
{risco_str}

Retorne um JSON com exatamente este formato (sem markdown, apenas JSON puro):
{{
  "diagnostico": "parágrafo de 3-4 frases sobre o estado geral do portfólio",
  "destaques": ["destaque 1", "destaque 2", "destaque 3"],
  "alertas": ["alerta 1", "alerta 2"],
  "acoes": ["ação prioritária 1", "ação prioritária 2", "ação prioritária 3"]
}}"""

# ── Claude call ───────────────────────────────────────────────────────────────
def call_claude(prompt: str) -> dict:
    msg = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    # Remove possível markdown fence
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())

# ── Endpoints ─────────────────────────────────────────────────────────────────
@router.post("/analisar/{asin}", response_model=AnaliseResponse)
def analisar_titulo(asin: str):
    """Análise completa de um título via Claude."""
    if not client.api_key:
        raise HTTPException(503, "ANTHROPIC_API_KEY não configurada.")

    conn = get_conn()
    cur  = conn.cursor()
    try:
        ctx = build_titulo_context(cur, asin)
        if not ctx:
            raise HTTPException(404, f"ASIN {asin} não encontrado.")
    finally:
        cur.close()
        conn.close()

    try:
        resultado = call_claude(prompt_titulo(ctx))
    except json.JSONDecodeError as e:
        log.error(f"Claude retornou JSON inválido para {asin}: {e}")
        raise HTTPException(502, "Resposta inválida do modelo. Tente novamente.")
    except Exception as e:
        log.error(f"Erro ao chamar Claude para {asin}: {e}")
        raise HTTPException(502, str(e))

    return AnaliseResponse(
        asin=asin,
        titulo=ctx["titulo"],
        diagnostico=resultado.get("diagnostico", ""),
        oportunidades=resultado.get("oportunidades", []),
        acoes=resultado.get("acoes", []),
        alerta=resultado.get("alerta"),
        confianca=resultado.get("confianca", "baixa"),
        modelo=MODEL,
        gerado_em=datetime.now(timezone.utc).isoformat(),
    )

@router.post("/portfolio", response_model=PortfolioResponse)
def analisar_portfolio():
    """Análise do portfólio completo via Claude."""
    if not client.api_key:
        raise HTTPException(503, "ANTHROPIC_API_KEY não configurada.")

    conn = get_conn()
    cur  = conn.cursor()
    try:
        ctx = build_portfolio_context(cur)
    finally:
        cur.close()
        conn.close()

    try:
        resultado = call_claude(prompt_portfolio(ctx))
    except json.JSONDecodeError as e:
        log.error(f"Claude retornou JSON inválido (portfolio): {e}")
        raise HTTPException(502, "Resposta inválida do modelo. Tente novamente.")
    except Exception as e:
        log.error(f"Erro ao chamar Claude (portfolio): {e}")
        raise HTTPException(502, str(e))

    return PortfolioResponse(
        total_titulos=ctx["total"],
        diagnostico=resultado.get("diagnostico", ""),
        destaques=resultado.get("destaques", []),
        alertas=resultado.get("alertas", []),
        acoes=resultado.get("acoes", []),
        modelo=MODEL,
        gerado_em=datetime.now(timezone.utc).isoformat(),
    )
