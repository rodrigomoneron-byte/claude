const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

async function req(path, params = {}, method = 'GET') {
  const url = new URL(path, BASE)
  if (method === 'GET') {
    Object.entries(params).forEach(([k, v]) => {
      if (v != null) url.searchParams.set(k, String(v))
    })
  }
  const res = await fetch(url.toString(), {
    method,
    headers: method !== 'GET' ? { 'Content-Type': 'application/json' } : {},
    body:    method !== 'GET' ? JSON.stringify(params) : undefined,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} — ${path}${text ? ': ' + text : ''}`)
  }
  return res.json()
}

export const api = {
  // ── Catálogo ────────────────────────────────────────────────────────────────
  // GET /api/titles
  // → [{asin, titulo, bsr_geral, bsr_categoria, categoria_nome, vendas_mes, kenp_mes, royalties_mes, bsr_7d: number[]}]
  titulos: () => req('/api/titles'),

  // GET /api/titles/:asin
  // → {asin, titulo, bsr_geral, bsr_categoria, categoria_nome, vendas_mes, kenp_mes, royalties_mes}
  titulo: (asin) => req(`/api/titles/${asin}`),

  // ── Histórico ───────────────────────────────────────────────────────────────
  // GET /api/titles/:asin/bsr?dias=30
  // → [{coletado_em, bsr_geral, bsr_categoria}]
  bsrHistory: (asin, dias = 30) => req(`/api/titles/${asin}/bsr`, { dias }),

  // GET /api/titles/:asin/vendas
  // → [{periodo, unidades_liquidas, kenp, royalties_brl}]
  vendasHistory: (asin) => req(`/api/titles/${asin}/vendas`),

  // ── Estimador ───────────────────────────────────────────────────────────────
  // GET /api/estimador?bsr=5000
  // → {vendas_diarias, vendas_mensais, amostras, bsr_min, bsr_max}
  estimador: (bsr) => req('/api/estimador', { bsr }),

  // GET /api/calibracao
  // → [{bsr_min, bsr_max, vendas_diarias_media, amostras}]
  calibracao: () => req('/api/calibracao'),

  // ── Sazonalidade ────────────────────────────────────────────────────────────
  // GET /api/sazonalidade[?asin=...]
  // → [{ano, mes, total_vendas, total_kenp, media_bsr, indice_sazonal}]
  sazonalidade: (asin) => req('/api/sazonalidade', asin ? { asin } : {}),

  // ── IA ──────────────────────────────────────────────────────────────────────
  // POST /ai/analisar/:asin
  // → {asin, titulo, diagnostico, oportunidades, acoes, alerta, confianca, modelo, gerado_em}
  analisarTitulo: (asin) => req(`/ai/analisar/${asin}`, {}, 'POST'),

  // POST /ai/portfolio
  // → {total_titulos, diagnostico, destaques, alertas, acoes, modelo, gerado_em}
  analisarPortfolio: () => req('/ai/portfolio', {}, 'POST'),
}
