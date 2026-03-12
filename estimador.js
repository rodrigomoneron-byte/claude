/**
 * KindleRanker BR — Página: Estimador
 * Ferramenta pública: BSR → estimativa de vendas diárias e receita.
 * Isca de tráfego — calibração com dados reais do mercado BR.
 */

import { useState, useEffect } from 'react';
import {
  Navbar, Loading, ErrorBox, SectionHeader, fmt,
} from '../components/ui';
import { estimarPorBSR, getTabelaCalibracao } from '../lib/api';

// ── Slider de BSR ─────────────────────────────────────────────────────────────

function BSRSlider({ value, onChange }) {
  return (
    <div>
      <input
        type="range"
        min={1}
        max={500000}
        step={100}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: '#C9A84C',
          cursor: 'pointer',
          height: 4,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace' }}>#1</span>
        <span style={{ fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace' }}>#500.000</span>
      </div>
    </div>
  );
}

// ── Resultado visual ──────────────────────────────────────────────────────────

function ResultCard({ label, value, sub, gold = false }) {
  return (
    <div style={{
      background: '#111113',
      border: gold ? '1px solid #6B5521' : '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12,
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ fontSize: 36, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: gold ? '#E2C97E' : '#F0EDE8', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: '#5A5652', marginTop: 8 }}>{sub}</div>}
    </div>
  );
}

// ── Tabela de calibração ──────────────────────────────────────────────────────

function TabelaCalibracao({ data }) {
  if (!data?.length) return null;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {['Faixa BSR', 'Mín/dia', 'Máx/dia', 'Média/dia', 'Amostras'].map(h => (
              <th key={h} style={{
                textAlign: h === 'Faixa BSR' ? 'left' : 'right',
                padding: '10px 16px',
                fontSize: 11,
                color: '#5A5652',
                fontFamily: 'DM Mono, monospace',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', color: '#C9A84C', fontSize: 12 }}>
                #{fmt.num(row.bsr_min)} — #{fmt.num(row.bsr_max)}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#9A9590' }}>
                {row.vendas_diarias_min?.toFixed(1)}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#9A9590' }}>
                {row.vendas_diarias_max?.toFixed(1)}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#F0EDE8' }}>
                {row.vendas_diarias_media?.toFixed(1)}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#5A5652' }}>
                {fmt.num(row.amostras)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function Estimador() {
  const [bsr, setBsr]               = useState(10000);
  const [inputBsr, setInputBsr]     = useState('10000');
  const [resultado, setResultado]   = useState(null);
  const [calibracao, setCalibracao] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [loadingCal, setLoadingCal] = useState(true);
  const [error, setError]           = useState(null);

  // Carrega tabela de calibração
  useEffect(() => {
    getTabelaCalibracao()
      .then(d => setCalibracao(d.calibracao || []))
      .catch(() => {})
      .finally(() => setLoadingCal(false));
  }, []);

  // Estimativa com debounce
  useEffect(() => {
    if (!bsr) return;
    const t = setTimeout(() => {
      setLoading(true);
      setError(null);
      estimarPorBSR(bsr)
        .then(setResultado)
        .catch(e => { setError(e.message); setResultado(null); })
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(t);
  }, [bsr]);

  const handleInput = (v) => {
    setInputBsr(v);
    const n = parseInt(v.replace(/\D/g, ''), 10);
    if (n >= 1 && n <= 500000) setBsr(n);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0B; color: #F0EDE8; font-family: 'Inter', sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.35s ease forwards; }
        input[type=range] { -webkit-appearance: none; appearance: none; background: rgba(255,255,255,0.08); border-radius: 2px; height: 4px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #C9A84C; cursor: pointer; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0A0A0B' }}>
        <Navbar active="/estimador" />

        <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

          {/* Header */}
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
              Dados reais — Amazon.com.br
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.05, marginBottom: 16 }}>
              Estimador de Vendas
            </h1>
            <p style={{ color: '#9A9590', fontSize: 16, lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
              Quantos livros um ranking está vendendo no mercado brasileiro?
              Calibrado com dados reais de títulos publicados na Amazon.com.br.
            </p>
          </div>

          {/* Input do BSR */}
          <div style={{ background: '#111113', border: '1px solid #6B5521', borderRadius: 16, padding: '36px', marginBottom: 32 }}>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: '#5A5652', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 16 }}>
                Best Seller Rank (BSR)
              </label>

              {/* Input numérico */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ color: '#5A5652', fontFamily: 'DM Mono, monospace', fontSize: 20 }}>#</span>
                <input
                  type="text"
                  value={inputBsr}
                  onChange={e => handleInput(e.target.value)}
                  style={{
                    background: '#18181C',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    color: '#C9A84C',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 28,
                    fontWeight: 500,
                    padding: '10px 16px',
                    width: 180,
                    outline: 'none',
                    letterSpacing: '0.02em',
                  }}
                  onFocus={e => e.target.style.borderColor = '#6B5521'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                <span style={{ color: '#5A5652', fontSize: 13 }}>na Loja Kindle — Amazon.com.br</span>
              </div>

              {/* Slider */}
              <BSRSlider value={bsr} onChange={(v) => { setBsr(v); setInputBsr(String(v)); }} />
            </div>

            {/* BSR shortcuts */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[100, 500, 1000, 5000, 10000, 50000, 100000].map(v => (
                <button key={v} onClick={() => { setBsr(v); setInputBsr(String(v)); }} style={{
                  background: bsr === v ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${bsr === v ? '#6B5521' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 6,
                  color: bsr === v ? '#C9A84C' : '#5A5652',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontFamily: 'DM Mono, monospace',
                  padding: '5px 10px',
                  transition: 'all 150ms',
                }}>
                  #{v >= 1000 ? `${v / 1000}k` : v}
                </button>
              ))}
            </div>
          </div>

          {/* Resultados */}
          {loading && (
            <div style={{ textAlign: 'center', padding: 32 }}>
              <div style={{ width: 28, height: 28, border: '2px solid rgba(255,255,255,0.06)', borderTop: '2px solid #C9A84C', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {error && <ErrorBox message={error} />}

          {resultado && !loading && (
            <div className="fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
                <ResultCard
                  label="Vendas / dia"
                  value={`~${resultado.vendas_diarias_estimadas?.toFixed(1)}`}
                  sub="unidades pagas"
                  gold
                />
                <ResultCard
                  label="Receita / dia"
                  value={fmt.brl(resultado.receita_diaria_estimada_brl)}
                  sub="royalties estimados"
                />
                <ResultCard
                  label="Receita / mês"
                  value={fmt.brl(resultado.receita_mensal_estimada_brl)}
                  sub="projeção 30 dias"
                />
              </div>

              {/* Faixa BSR */}
              <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#5A5652', fontFamily: 'DM Mono, monospace' }}>
                  Faixa: #{fmt.num(resultado.faixa?.min)} — #{fmt.num(resultado.faixa?.max)}
                </span>
                <span style={{ fontSize: 12, color: resultado.amostras_calibracao > 10 ? '#4CAF7D' : '#C9A84C', fontFamily: 'DM Mono, monospace' }}>
                  {resultado.amostras_calibracao} amostras de calibração
                </span>
                <span style={{ fontSize: 11, color: '#5A5652', maxWidth: 360 }}>
                  {resultado.aviso}
                </span>
              </div>
            </div>
          )}

          {/* Tabela de calibração */}
          <div style={{ marginTop: 56 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600 }}>
                Tabela de Calibração
              </h2>
              <p style={{ color: '#5A5652', fontSize: 13, marginTop: 4 }}>
                Baseada em dados reais do mercado Amazon.com.br — atualizada continuamente.
              </p>
            </div>

            {loadingCal ? (
              <div style={{ height: 80 }} />
            ) : (
              <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                <TabelaCalibracao data={calibracao} />
              </div>
            )}

            <p style={{ fontSize: 12, color: '#5A5652', marginTop: 16, fontFamily: 'DM Mono, monospace', lineHeight: 1.6 }}>
              ¹ Royalty médio calculado com base no catálogo brasileiro real. Valores variam conforme preço, KU e margem.
              <br />² Estimativas não incluem KENP (Kindle Unlimited). O valor real pode ser maior.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
