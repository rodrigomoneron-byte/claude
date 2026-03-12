"""
KindleRanker BR — Integração Claude AI
Endpoints FastAPI para análise contextualizada em português.

Adicione ao main.py:
    from ai import router as ai_router
    app.include_router(ai_router, prefix="/ai", tags=["IA"])

Env necessária:
    ANTHROPIC_API_KEY=sk-ant-...
"""

import os
import json
from datetime import date
from typing import Optional

import anthropic
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

def get_client():
    key = os.getenv("ANTHROPIC_API_KEY")
    if not key:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY não configurada.")
    return anthropic.Anthropic(api_key=key)

# ── Modelos de request ────────────────────────────────────────────────────────

class ContextoTitulo(BaseModel):
    asin: str
    titulo: str
    autor: Optional[str] = None
    preco_sugerido: Optional[float] = None
    bsr_geral: Optional[int] = None
    bsr_categoria: Optional[int] = None
    categoria_nome: Optional[str] = None
    vendas_diarias_estimadas: Optional[float] = None
    total_royalties_brl: Optional[float] = None
    total_kenp_br: Optional[int] = None
    total_unidades: Optional[int] = None
    meses_com_venda: Optional[int] = None
    historico_bsr: Optional[list] = None        # últimos 30 pontos
    kenp_mensal: Optional[list] = None          # últimos 12 meses
    vendas_mensais: Optional[list] = None       # últimos 12 meses

class ContextoCatalogo(BaseModel):
    total_titulos: int
    total_royalties_brl: float
    total_kenp_br: int
    total_unidades_br: int
    top_kenp: list                              # top 5 por KENP
    evolucao_mensal: Optional[list] = None      # últimos 24 meses
    sazonalidade: Optional[list] = None         # média por mês do ano

class ContextoEstimador(BaseModel):
    bsr: int
    vendas_diarias_estimadas: float
    receita_diaria_estimada_brl: float
    receita_mensal_estimada_brl: float
    amostras_calibracao: int
    faixa_min: int
    faixa_max: int

# ── Prompts ───────────────────────────────────────────────────────────────────

SYSTEM_BASE = """Você é um analista especialista no mercado de livros digitais da Amazon.com.br.

Seu papel: interpretar dados de BSR, KENP e vendas para dar orientações práticas a autores independentes brasileiros publicando no KDP.

Regras absolutas:
- Escreva em português brasileiro. Direto, sem rodeios.
- Seja específico. Números concretos valem mais que generalidades.
- Não invente dados. Se os dados são insuficientes, diga isso.
- Evite jargões de marketing. Fale como um especialista que respeita o tempo do leitor.
- Máximo de 4 seções por análise. Cada seção: título em negrito + 2-4 linhas.
- Quando há algo crítico a fazer, termine com uma ação clara e imediata."""

def prompt_titulo(ctx: ContextoTitulo) -> str:
    bsr_trend = ""
    if ctx.historico_bsr and len(ctx.historico_bsr) >= 2:
        primeiro = ctx.historico_bsr[0].get("bsr_geral")
        ultimo = ctx.historico_bsr[-1].get("bsr_geral")
        if primeiro and ultimo:
            delta = ultimo - primeiro
            bsr_trend = f"Tendência BSR (30d): {'↑ subindo' if delta > 0 else '↓ caindo'} {abs(delta):,} posições ({'+' if delta > 0 else ''}{delta:,})."

    kenp_str = ""
    if ctx.kenp_mensal:
        ultimos = ctx.kenp_mensal[-3:]
        kenp_str = "KENP últimos 3 meses: " + ", ".join(
            f"{m.get('mes', '?')}: {int(m.get('kenp_total', 0)):,}" for m in ultimos
        )

    return f"""Analise este título publicado na Amazon.com.br:

**{ctx.titulo}**
ASIN: {ctx.asin}
Autor: {ctx.autor or 'não informado'}
Preço: R$ {ctx.preco_sugerido or 'não informado'}
Categoria: {ctx.categoria_nome or 'não identificada'}

**Dados atuais:**
- BSR Geral (Loja Kindle): #{ctx.bsr_geral:,} {f'| BSR Categoria: #{ctx.bsr_categoria:,}' if ctx.bsr_categoria else ''}
- Vendas/dia estimadas: {ctx.vendas_diarias_estimadas:.1f} unidades
- {bsr_trend}

**Histórico acumulado (Amazon.com.br):**
- Royalties totais: R$ {ctx.total_royalties_brl:,.2f}
- KENP total: {ctx.total_kenp_br:,} páginas lidas
- Unidades vendidas: {ctx.total_unidades:,}
- Meses ativos: {ctx.meses_com_venda}
{kenp_str}

Gere uma análise com no máximo 4 seções:
1. Diagnóstico atual (o que os dados indicam sobre o momento do título)
2. Oportunidade ou risco principal (o que mais chama atenção)
3. Recomendação de preço/categoria (se os dados justificam ajuste)
4. Ação prioritária (o que fazer primeiro, em menos de 30 dias)"""

def prompt_catalogo(ctx: ContextoCatalogo) -> str:
    top_str = "\n".join(
        f"  {i+1}. {t.get('titulo', '?')} — {int(t.get('kenp_total', 0)):,} KENP"
        for i, t in enumerate(ctx.top_kenp[:5])
    )

    # Meses recentes
    evolucao_str = ""
    if ctx.evolucao_mensal:
        ultimos = ctx.evolucao_mensal[-6:]
        evolucao_str = "Evolução (últimos 6 meses):\n" + "\n".join(
            f"  {m.get('periodo', '?')}: R$ {float(m.get('royalties_brl', 0)):,.0f} | {int(m.get('kenp_total', 0)):,} KENP"
            for m in ultimos
        )

    # Sazonalidade
    saz_str = ""
    if ctx.sazonalidade:
        top_mes = sorted(ctx.sazonalidade, key=lambda x: x.get('kenp_medio_diario', 0), reverse=True)[:3]
        saz_str = "Meses de pico histórico: " + ", ".join(
            f"{m.get('nome_mes', '?')} (índice {float(m.get('kenp_medio_diario', 0)):.0f})" for m in top_mes
        )

    return f"""Analise o desempenho deste catálogo publicado na Amazon.com.br:

**Resumo do catálogo:**
- Títulos ativos: {ctx.total_titulos}
- Royalties totais acumulados: R$ {ctx.total_royalties_brl:,.2f}
- KENP total: {ctx.total_kenp_br:,} páginas lidas
- Unidades vendidas: {ctx.total_unidades_br:,}

**Top 5 por KENP:**
{top_str}

{evolucao_str}

{saz_str}

Gere uma análise com no máximo 4 seções:
1. Diagnóstico do catálogo (concentração, saúde, tendência)
2. Título com maior potencial não explorado
3. Timing de próximo lançamento (baseado na sazonalidade e tendência atual)
4. Ação prioritária para os próximos 30 dias"""

def prompt_estimador(ctx: ContextoEstimador) -> str:
    return f"""Um autor brasileiro consultou o estimador de BSR da Amazon.com.br com os seguintes dados:

**BSR consultado:** #{ctx.bsr:,} (Loja Kindle Brasil)
**Faixa de calibração:** #{ctx.faixa_min:,} — #{ctx.faixa_max:,}
**Amostras reais nessa faixa:** {ctx.amostras_calibracao}

**Estimativas calculadas:**
- Vendas/dia: {ctx.vendas_diarias_estimadas:.1f} unidades
- Receita/dia: R$ {ctx.receita_diaria_estimada_brl:.2f}
- Receita/mês: R$ {ctx.receita_mensal_estimada_brl:.2f}

Forneça uma interpretação contextualizada com no máximo 3 seções:
1. O que esse BSR significa no mercado brasileiro (comparação de contexto)
2. Receita real esperada (considerando KENP, que não está incluído nas estimativas)
3. O que um autor precisaria fazer para alcançar ou manter esse ranking"""

# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.post("/titulo")
def analisar_titulo(ctx: ContextoTitulo):
    """Análise completa de um título individual."""
    client = get_client()
    try:
        msg = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=800,
            system=SYSTEM_BASE,
            messages=[{"role": "user", "content": prompt_titulo(ctx)}]
        )
        return {
            "asin": ctx.asin,
            "analise": msg.content[0].text,
            "tokens_usados": msg.usage.input_tokens + msg.usage.output_tokens,
        }
    except anthropic.APIError as e:
        raise HTTPException(status_code=502, detail=f"Erro na API Anthropic: {str(e)}")

@router.post("/catalogo")
def analisar_catalogo(ctx: ContextoCatalogo):
    """Análise estratégica do catálogo completo."""
    client = get_client()
    try:
        msg = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=800,
            system=SYSTEM_BASE,
            messages=[{"role": "user", "content": prompt_catalogo(ctx)}]
        )
        return {
            "analise": msg.content[0].text,
            "tokens_usados": msg.usage.input_tokens + msg.usage.output_tokens,
        }
    except anthropic.APIError as e:
        raise HTTPException(status_code=502, detail=f"Erro na API Anthropic: {str(e)}")

@router.post("/estimador")
def analisar_estimador(ctx: ContextoEstimador):
    """Interpretação contextualizada de um BSR consultado no estimador."""
    client = get_client()
    try:
        msg = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=500,
            system=SYSTEM_BASE,
            messages=[{"role": "user", "content": prompt_estimador(ctx)}]
        )
        return {
            "bsr": ctx.bsr,
            "analise": msg.content[0].text,
            "tokens_usados": msg.usage.input_tokens + msg.usage.output_tokens,
        }
    except anthropic.APIError as e:
        raise HTTPException(status_code=502, detail=f"Erro na API Anthropic: {str(e)}")
