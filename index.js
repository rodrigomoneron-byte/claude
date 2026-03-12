/**
 * KindleRanker BR — Página: Catálogo
 * Lista todos os títulos com BSR atual, estimativa de vendas e histórico.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Card, StatCard, Table, BSRBadge,
  Sparkline, Loading, ErrorBox, Input, SectionHeader, fmt,
} from '../components/ui';
import { getTitulos, getResumoCatalogo } from '../lib/api';

export default function Catalogo() {
  const router = useRouter();
  const [titulos, setTitulos]   = useState([]);
  const [resumo, setResumo]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [busca, setBusca]       = useState('');
  const [sort, setSort]         = useState({ key: 'bsr_geral', dir: 'asc' });

  useEffect(() => {
    Promise.all([getTitulos(), getResumoCatalogo()])
      .then(([t, r]) => { setTitulos(t.titulos); setResumo(r); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = titulos
    .filter(t => !busca || t.titulo?.toLowerCase().includes(busca.toLowerCase()) || t.asin?.includes(busca))
    .sort((a, b) => {
      const va = a[sort.key] ?? Infinity;
      const vb = b[sort.key] ?? Infinity;
      return sort.dir === 'asc' ? va - vb : vb - va;
    });

  const toggleSort = (key) => setSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));

  const columns = [
    {
      key: 'titulo', label: 'Título', maxWidth: '280px', wrap: false,
      render: (v, row) => (
        <div>
          <div style={{ fontSize: 14, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 280 }}>{v}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{row.asin}</div>
        </div>
      )
    },
    {
      key: 'bsr_geral', label: 'BSR Geral', align: 'right', mono: true,
      render: (v) => <BSRBadge value={v} />
    },
    {
      key: 'bsr_categoria', label: 'BSR Cat.', align: 'right', mono: true,
      render: (v) => v ? <BSRBadge value={v} /> : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>
    },
    {
      key: 'categoria_nome', label: 'Categoria', muted: true,
      render: (v) => <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v || '—'}</span>
    },
    {
      key: 'bsr_atualizado_em', label: 'Atualizado', muted: true, mono: true,
      render: (v) => <span style={{ fontSize: 12 }}>{fmt.data(v)}</span>
    },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0B; color: #F0EDE8; font-family: 'Inter', sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0A0A0B; } ::-webkit-scrollbar-thumb { background: #6B5521; border-radius: 3px; }
        .sort-btn { background: none; border: none; color: inherit; cursor: pointer; font: inherit; display: flex; align-items: center; gap: 4px; }
        .sort-btn:hover { color: var(--gold, #C9A84C); }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0A0A0B' }}>
        <Navbar active="/" />

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 1.1 }}>
              Catálogo
            </h1>
            <p style={{ color: '#5A5652', fontSize: 14, marginTop: 8 }}>
              Rastreamento em tempo real — Amazon.com.br
            </p>
          </div>

          {loading && <Loading text="Carregando catálogo..." />}
          {error && <ErrorBox message={error} />}

          {/* Stats do catálogo */}
          {resumo && (
            <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
              <StatCard
                label="Títulos ativos"
                value={fmt.num(resumo.totais?.total_titulos)}
                accent
              />
              <StatCard
                label="Royalties totais BR"
                value={fmt.brl(resumo.totais?.total_royalties_brl)}
                sub="desde 2019"
              />
              <StatCard
                label="KENP total BR"
                value={fmt.num(resumo.totais?.total_kenp_br)}
                sub="páginas KU lidas"
              />
              <StatCard
                label="Unidades vendidas BR"
                value={fmt.num(resumo.totais?.total_unidades_br)}
                sub="Amazon.com.br"
              />
            </div>
          )}

          {/* Tabela principal */}
          {!loading && !error && (
            <div className="fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
                <SectionHeader
                  title={`${filtered.length} título${filtered.length !== 1 ? 's' : ''}`}
                  sub={busca ? `Filtrado por "${busca}"` : 'Ordenado por BSR geral'}
                />
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {/* Busca */}
                  <input
                    placeholder="Buscar por título ou ASIN…"
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                    style={{
                      background: '#18181C',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 8,
                      color: '#F0EDE8',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 13,
                      padding: '8px 14px',
                      outline: 'none',
                      width: 260,
                    }}
                  />
                  {/* Sort buttons */}
                  {[['bsr_geral', 'BSR'], ['bsr_categoria', 'Cat.']].map(([k, l]) => (
                    <button key={k} onClick={() => toggleSort(k)} style={{
                      background: sort.key === k ? 'rgba(201,168,76,0.12)' : 'transparent',
                      border: `1px solid ${sort.key === k ? '#6B5521' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 6,
                      color: sort.key === k ? '#C9A84C' : '#5A5652',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontFamily: 'DM Mono, monospace',
                      padding: '7px 12px',
                    }}>
                      {l} {sort.key === k ? (sort.dir === 'asc' ? '↑' : '↓') : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                <Table
                  columns={columns}
                  data={filtered}
                  onRowClick={row => router.push(`/titulo/${row.asin}`)}
                />
                {filtered.length === 0 && (
                  <div style={{ padding: '48px 24px', textAlign: 'center', color: '#5A5652', fontSize: 13 }}>
                    Nenhum título encontrado.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Top KENP */}
          {resumo?.top_kenp?.length > 0 && (
            <div className="fade-in" style={{ marginTop: 48 }}>
              <SectionHeader title="Top KENP" sub="Títulos mais lidos no Kindle Unlimited BR" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {resumo.top_kenp.map((t, i) => (
                  <a key={t.asin} href={`/titulo/${t.asin}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: '#111113',
                      border: i === 0 ? '1px solid #6B5521' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      padding: '16px 20px',
                      cursor: 'pointer',
                      transition: 'border-color 150ms',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#C9A84C'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = i === 0 ? '#6B5521' : 'rgba(255,255,255,0.06)'}
                    >
                      <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: i === 0 ? '#C9A84C' : '#5A5652', marginBottom: 8 }}>
                        #{i + 1} KENP
                      </div>
                      <div style={{ fontSize: 14, color: '#F0EDE8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>
                        {t.titulo}
                      </div>
                      <div style={{ fontSize: 20, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#E2C97E' }}>
                        {fmt.num(t.kenp_total)}
                      </div>
                      <div style={{ fontSize: 11, color: '#5A5652', fontFamily: 'DM Mono, monospace' }}>páginas lidas</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
