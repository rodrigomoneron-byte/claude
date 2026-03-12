/**
 * KindleRanker BR — Página: Título Individual
 * BSR histórico, KENP mensal, vendas, estimativas.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Card, StatCard, BSRBadge, MiniBarChart,
  Loading, ErrorBox, SectionHeader, fmt,
} from '../../components/ui';
import { getTitulo, getHistoricoBSR, getKenpTitulo, getVendasTitulo } from '../../lib/api';

// ── Gráfico de linha BSR ───────────────────────────────────────────────────────

function BSRChart({ data }) {
  if (!data?.length) return (
    <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5A5652', fontSize: 13 }}>
      Sem dados de BSR suficientes.
    </div>
  );

  const w = 700, h = 140, pad = { t: 10, r: 20, b: 30, l: 60 };
  const pts = data.filter(d => d.bsr_geral);
  if (pts.length < 2) return null;

  const bsrs = pts.map(d => d.bsr_geral);
  const minB = Math.min(...bsrs), maxB = Math.max(...bsrs);
  const range = maxB - minB || 1;

  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;

  const x = (i) => pad.l + (i / (pts.length - 1)) * iw;
  const y = (v) => pad.t + (1 - (v - minB) / range) * ih;

  const pathD = pts.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.bsr_geral)}`).join(' ');
  const areaD = `${pathD} L ${x(pts.length - 1)} ${pad.t + ih} L ${pad.l} ${pad.t + ih} Z`;

  // Labels do eixo X (primeiros 4 e último)
  const xLabels = [0, Math.floor(pts.length / 3), Math.floor(2 * pts.length / 3), pts.length - 1]
    .filter((v, i, a) => a.indexOf(v) === i);

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="bsrGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid horizontal */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
        const yv = pad.t + pct * ih;
        const bv = maxB - pct * range;
        return (
          <g key={i}>
            <line x1={pad.l} y1={yv} x2={w - pad.r} y2={yv} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <text x={pad.l - 8} y={yv + 4} textAnchor="end" fill="#5A5652" fontSize="10" fontFamily="DM Mono, monospace">
              {bv >= 1000 ? `${(bv / 1000).toFixed(0)}k` : Math.round(bv)}
            </text>
          </g>
        );
      })}

      {/* Área */}
      <path d={areaD} fill="url(#bsrGrad)" />

      {/* Linha */}
      <path d={pathD} fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Labels X */}
      {xLabels.map(i => (
        <text key={i} x={x(i)} y={h - 4} textAnchor="middle" fill="#5A5652" fontSize="10" fontFamily="DM Mono, monospace">
          {fmt.data(pts[i].coletado_em)}
        </text>
      ))}

      {/* Ponto atual */}
      <circle cx={x(pts.length - 1)} cy={y(pts[pts.length - 1].bsr_geral)} r="4" fill="#C9A84C" />
    </svg>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function TituloPage() {
  const router = useRouter();
  const { asin } = router.query;

  const [titulo, setTitulo]   = useState(null);
  const [bsr, setBsr]         = useState([]);
  const [kenp, setKenp]       = useState([]);
  const [vendas, setVendas]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [bsrDias, setBsrDias] = useState(30);

  useEffect(() => {
    if (!asin) return;
    setLoading(true);
    Promise.all([
      getTitulo(asin),
      getHistoricoBSR(asin, bsrDias),
      getKenpTitulo(asin, 12),
      getVendasTitulo(asin, 24),
    ])
      .then(([t, b, k, v]) => {
        setTitulo(t);
        setBsr(b.historico || []);
        setKenp(k.kenp_mensal || []);
        setVendas(v.vendas_mensais || []);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [asin, bsrDias]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0B; color: #F0EDE8; font-family: 'Inter', sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0A0A0B' }}>
        <Navbar />

        {/* Breadcrumb */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px 0' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#5A5652', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Mono, monospace', display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Catálogo
          </button>
        </div>

        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px' }}>

          {loading && <Loading text={`Carregando ${asin}...`} />}
          {error && <ErrorBox message={error} />}

          {titulo && (
            <div className="fade-in">
              {/* Header do título */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', marginBottom: 8 }}>
                  ASIN: {asin}
                </div>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', color: '#F0EDE8', lineHeight: 1.2, marginBottom: 6 }}>
                  {titulo.titulo?.titulo}
                </h1>
                {titulo.titulo?.autor && (
                  <p style={{ color: '#9A9590', fontSize: 14 }}>{titulo.titulo.autor}</p>
                )}
              </div>

              {/* Stats principais */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 36 }}>
                <div style={{ background: '#111113', border: '1px solid #6B5521', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>BSR Geral</div>
                  <BSRBadge value={titulo.bsr_atual?.bsr_geral} />
                </div>
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>BSR Categoria</div>
                  <BSRBadge value={titulo.bsr_atual?.bsr_categoria} />
                </div>
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Vendas/dia estimadas</div>
                  <div style={{ fontSize: 22, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#E2C97E' }}>
                    {titulo.vendas_diarias_estimadas ? `~${titulo.vendas_diarias_estimadas.toFixed(1)}` : '—'}
                  </div>
                </div>
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Royalties totais BR</div>
                  <div style={{ fontSize: 22, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#F0EDE8' }}>
                    {fmt.brl(titulo.historico?.total_royalties_brl)}
                  </div>
                </div>
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>KENP total BR</div>
                  <div style={{ fontSize: 22, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#F0EDE8' }}>
                    {fmt.num(titulo.historico?.total_kenp_br)}
                  </div>
                </div>
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Categoria</div>
                  <div style={{ fontSize: 12, color: '#9A9590', lineHeight: 1.4 }}>
                    {titulo.bsr_atual?.categoria_nome || '—'}
                  </div>
                </div>
              </div>

              {/* BSR histórico */}
              <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600 }}>Histórico BSR</h2>
                    <p style={{ color: '#5A5652', fontSize: 12, marginTop: 2 }}>{bsr.length} coletas — Amazon.com.br</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[7, 30, 90].map(d => (
                      <button key={d} onClick={() => setBsrDias(d)} style={{
                        background: bsrDias === d ? 'rgba(201,168,76,0.12)' : 'transparent',
                        border: `1px solid ${bsrDias === d ? '#6B5521' : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: 6,
                        color: bsrDias === d ? '#C9A84C' : '#5A5652',
                        cursor: 'pointer',
                        fontSize: 12,
                        fontFamily: 'DM Mono, monospace',
                        padding: '5px 10px',
                      }}>
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
                <BSRChart data={bsr} />
              </div>

              {/* KENP mensal */}
              {kenp.length > 0 && (
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, marginBottom: 6 }}>KENP Mensal</h2>
                  <p style={{ color: '#5A5652', fontSize: 12, marginBottom: 24 }}>Páginas KU lidas por mês — Amazon.com.br</p>
                  <MiniBarChart
                    data={kenp}
                    labelKey="mes"
                    valueKey="kenp_total"
                    color="#C9A84C"
                    height={160}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace' }}>{fmt.mes(kenp[0]?.mes)}</span>
                    <span style={{ fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace' }}>{fmt.mes(kenp[kenp.length - 1]?.mes)}</span>
                  </div>
                </div>
              )}

              {/* Vendas mensais */}
              {vendas.length > 0 && (
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '24px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Royalties Mensais</h2>
                  <p style={{ color: '#5A5652', fontSize: 12, marginBottom: 24 }}>Receita real em BRL — Amazon.com.br</p>
                  <MiniBarChart
                    data={vendas}
                    labelKey="periodo"
                    valueKey="royalties_brl"
                    color="#4CAF7D"
                    height={160}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace' }}>{fmt.mes(vendas[0]?.periodo)}</span>
                    <span style={{ fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace' }}>{fmt.mes(vendas[vendas.length - 1]?.periodo)}</span>
                  </div>
                  {/* Tabela resumida */}
                  <div style={{ marginTop: 24, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr>
                          {['Período', 'Unidades', 'KENP', 'Royalties BRL'].map(h => (
                            <th key={h} style={{ textAlign: h === 'Período' ? 'left' : 'right', padding: '8px 12px', fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {vendas.slice(-12).reverse().map((v, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '10px 12px', fontFamily: 'DM Mono, monospace', color: '#9A9590', fontSize: 12 }}>{fmt.mes(v.periodo)}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12 }}>{fmt.num(v.unidades_liquidas)}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#9A9590' }}>{fmt.num(v.kenp_mensal)}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#C9A84C' }}>{fmt.brl(v.royalties_brl)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
