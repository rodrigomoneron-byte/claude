/**
 * KindleRanker BR — API Client
 * Wrapper para chamadas ao backend FastAPI.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function apiFetch(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `Erro ${res.status}`);
  }
  return res.json();
}

// ── Catálogo ──────────────────────────────────────────────────────────────────

export const getTitulos = () =>
  apiFetch('/titulos');

export const getTitulo = (asin) =>
  apiFetch(`/titulos/${asin}`);

export const getResumoCatalogo = () =>
  apiFetch('/catalogo/resumo');

// ── BSR + Séries temporais ────────────────────────────────────────────────────

export const getHistoricoBSR = (asin, dias = 30) =>
  apiFetch(`/titulos/${asin}/bsr?dias=${dias}`);

export const getKenpTitulo = (asin, meses = 12) =>
  apiFetch(`/titulos/${asin}/kenp?meses=${meses}`);

export const getVendasTitulo = (asin, meses = 24) =>
  apiFetch(`/titulos/${asin}/vendas?meses=${meses}`);

// ── Autor ─────────────────────────────────────────────────────────────────────

export const getAutor = (nome) =>
  apiFetch(`/autores/${encodeURIComponent(nome)}`);

// ── Estimador ─────────────────────────────────────────────────────────────────

export const estimarPorBSR = (bsr) =>
  apiFetch(`/calibracao/estimar?bsr=${bsr}`);

export const getTabelaCalibracao = () =>
  apiFetch('/calibracao');

// ── Sazonalidade ──────────────────────────────────────────────────────────────

export const getSazonalidade = () =>
  apiFetch('/sazonalidade');
