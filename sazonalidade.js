/**
 * KindleRanker BR — Página: Sazonalidade
 * Padrão anual do mercado Kindle BR com dados reais (2019–2026).
 */

import { useState, useEffect } from 'react';
import { Navbar, Loading, ErrorBox, fmt } from '../components/ui';
import { getSazonalidade, getResumoCatalogo } from '../lib/api';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// ── Heatmap mensal ─────────────────────────────────────────────────────────────

function HeatmapBar({ mes, nome, valor, max, rank }) {
  const pct = max ? valor / max : 0;
  const tier = pct >= 0.85 ? { bg: '#C9A84C', text: '#0A0A0B' }
    : pct >= 0.65 ? { bg: '#6B5521', text: '#E2C97E' }
    : pct >= 0.45 ? { bg: '#2A2215', text: '#C9A84C' }
    : { bg: '#18181C', text: '#5A5652' };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
      <span style={{ width: 28, fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#5A5652', textAlign: 'right', flexShrink: 0 }}>
        {nome}
      </span>
      <div style={{ flex: 1, height: 36, background: '#111113', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          width: `${pct * 100}%`,
          height: '100%',
          background: tier.bg,
          borderRadius: 6,
          transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
          {pct > 0.3 && (
            <span style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: tier.text, whiteSpace: 'nowrap' }}>
              {fmt.num(Math.round(valor))} KENP/dia
            </span>
          )}
        </div>
        {pct <= 0.3 && (
          <span style={{ position: 'absolute', left: `calc(${pct * 100}% + 8px)`, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontFamily: 'DM Mono, monospace', color: '#5A5652', whiteSpace: 'nowrap' }}>
            {fmt.num(Math.round(valor))}
          </span>
        )}
      </div>
      <span style={{ width: 16, fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#5A5652', flexShrink: 0 }}>
        {rank}
      </span>
    </div>
  );
}

// ── Roda sazonal (SVG) ────────────────────────────────────────────────────────

function RadarSazonal({ data }) {
  if (!data?.length) return null;

  const cx = 200, cy = 200, r = 140, pad = 20;
  const max = Math.max(...data.map(d => d.kenp_medio_diario));
  const n = 12;
  const angulo = (i) => (i / n) * 2 * Math.PI - Math.PI / 2;

  const pts = data.map((d, i) => {
    const a = angulo(i);
    const rv = pad + (d.kenp_medio_diario / max) * (r - pad);
    return { x: cx + Math.cos(a) * rv, y: cy + Math.sin(a) * rv, v: d.kenp_medio_diario, nome: d.nome_mes?.slice(0, 3) };
  });

  const polyline = pts.map(p => `${p.x},${p.y}`).join(' ');

  // Grid círculos
  const gridCircles = [0.25, 0.5, 0.75, 1].map(pct => r * pct + pad * (1 - pct));

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" style={{ display: 'block', margin: '0 auto' }}>
      <defs>
        <radialGradient id="radarGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.02" />
        </radialGradient>
      </defs>

      {/* Grid */}
      {gridCircles.map((rv, i) => (
        <circle key={i} cx={cx} cy={cy} r={rv} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}

      {/* Linhas radiais */}
      {Array.from({ length: n }).map((_, i) => {
        const a = angulo(i);
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(a) * r}
            y2={cy + Math.sin(a) * r}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1"
          />
        );
      })}

      {/* Polígono preenchido */}
      <polygon points={polyline} fill="url(#radarGrad)" stroke="#C9A84C" strokeWidth="2" strokeLinejoin="round" />

      {/* Labels dos meses */}
      {pts.map((p, i) => {
        const a = angulo(i);
        const lx = cx + Math.cos(a) * (r + 22);
        const ly = cy + Math.sin(a) * (r + 22);
        const pct = data[i].kenp_medio_diario / max;
        return (
          <text key={i} x={lx} y={ly + 4}
            textAnchor="middle"
            fill={pct >= 0.85 ? '#C9A84C' : '#5A5652'}
            fontSize={pct >= 0.85 ? 13 : 11}
            fontFamily="DM Mono, monospace"
            fontWeight={pct >= 0.85 ? 500 : 400}
          >
            {p.nome}
          </text>
        );
      })}

      {/* Pontos */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#C9A84C" opacity="0.8" />
      ))}
    </svg>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function Sazonalidade() {
  const [dados, setDados]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    getSazonalidade()
      .then(d => {
        // Ordena por mês (garantia)
        const sorted = [...(d.sazonalidade || [])].sort((a, b) => a.mes - b.mes);
        setDados(sorted);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const max = dados.length ? Math.max(...dados.map(d => d.kenp_medio_diario)) : 1;
  const ranked = [...dados].sort((a, b) => b.kenp_medio_diario - a.kenp_medio_diario);
  const rankMap = Object.fromEntries(ranked.map((d, i) => [d.mes, i + 1]));

  // Insights automáticos
  const top3 = ranked.slice(0, 3).map(d => d.nome_mes?.slice(0, 3));
  const bot3 = ranked.slice(-3).reverse().map(d => d.nome_mes?.slice(0, 3));

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0B; color: #F0EDE8; font-family: 'Inter', sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0A0A0B' }}>
        <Navbar active="/sazonalidade" />

        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.1 }}>
              Sazonalidade
            </h1>
            <p style={{ color: '#5A5652', fontSize: 14, marginTop: 8 }}>
              Padrão anual de consumo Kindle Unlimited — Amazon.com.br · 2019–2026
            </p>
          </div>

          {loading && <Loading text="Calculando sazonalidade..." />}
          {error && <ErrorBox message={error} />}

          {dados.length > 0 && (
            <div className="fade-in">

              {/* Insights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 48 }}>
                <div style={{ background: '#111113', border: '1px solid #6B5521', borderRadius: 12, padding: '24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Pico de leitura</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    {top3.map(m => (
                      <span key={m} style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid #6B5521', borderRadius: 6, padding: '4px 10px', fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#C9A84C' }}>{m}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: '#9A9590', lineHeight: 1.5 }}>
                    Férias escolares de verão e festas de fim de ano impulsionam o consumo KU no Brasil.
                    Lançar em outubro maximiza a captura do pico.
                  </p>
                </div>

                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Vale sazonal</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    {bot3.map(m => (
                      <span key={m} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '4px 10px', fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#5A5652' }}>{m}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: '#9A9590', lineHeight: 1.5 }}>
                    Primeiro semestre apresenta menor consumo. Período ideal para produção e preparação de lançamentos futuros.
                  </p>
                </div>

                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Anos observados</div>
                  <div style={{ fontSize: 36, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#F0EDE8', lineHeight: 1, marginBottom: 8 }}>
                    {dados[0]?.anos_observados || '—'}
                  </div>
                  <p style={{ fontSize: 12, color: '#9A9590' }}>
                    Dados reais de 2019 a 2026. Base proprietária — não estimativas genéricas.
                  </p>
                </div>
              </div>

              {/* Layout principal: radar + barras */}
              <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 32, alignItems: 'start' }}>

                {/* Radar */}
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '32px 24px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>
                    Roda Sazonal
                  </h2>
                  <RadarSazonal data={dados} />
                </div>

                {/* Barras */}
                <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '32px 24px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
                    KENP Médio por Mês
                  </h2>
                  {dados.map((d) => (
                    <HeatmapBar
                      key={d.mes}
                      mes={d.mes}
                      nome={d.nome_mes?.slice(0, 3) || MESES[d.mes - 1]}
                      valor={Number(d.kenp_medio_diario)}
                      max={max}
                      rank={`#${rankMap[d.mes]}`}
                    />
                  ))}
                  <p style={{ fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace', marginTop: 20 }}>
                    Média diária de KENP por mês do ano · Catálogo Amazon.com.br
                  </p>
                </div>
              </div>

              {/* Tabela detalhada */}
              <div style={{ marginTop: 32, background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600 }}>Dados Detalhados</h2>
                </div>
                <div style={{ overflowX: 'auto', padding: '16px 0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr>
                        {['Rank', 'Mês', 'KENP médio/dia', 'vs. Média anual', 'Índice'].map(h => (
                          <th key={h} style={{ textAlign: h === 'Mês' ? 'left' : 'right', padding: '10px 20px', fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const media = dados.reduce((s, d) => s + Number(d.kenp_medio_diario), 0) / dados.length;
                        return [...dados]
                          .sort((a, b) => b.kenp_medio_diario - a.kenp_medio_diario)
                          .map((d, i) => {
                            const v = Number(d.kenp_medio_diario);
                            const delta = ((v - media) / media) * 100;
                            const idx = (v / media).toFixed(2);
                            return (
                              <tr key={d.mes} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: i < 3 ? '#C9A84C' : '#5A5652' }}>#{i + 1}</td>
                                <td style={{ padding: '12px 20px', fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#F0EDE8' }}>
                                  {d.nome_mes || MESES[d.mes - 1]}
                                </td>
                                <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12 }}>
                                  {fmt.num(Math.round(v))}
                                </td>
                                <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: delta >= 0 ? '#4CAF7D' : '#E05C5C' }}>
                                  {delta >= 0 ? '+' : ''}{delta.toFixed(1)}%
                                </td>
                                <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: idx >= 1 ? '#C9A84C' : '#9A9590' }}>
                                  {idx}×
                                </td>
                              </tr>
                            );
                          });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </main>
      </div>
    </>
  );
}
