import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import { api } from '../lib/api'
import {
  Card, Table, BSRBadge, Sparkline, MiniBar, Badge,
  SectionTitle, Loading, PageError, bsrColor,
} from '../components/ui'

// ── Tier cards (KENP top) ─────────────────────────────────────────────────────
function TopCard({ titulo, rank }) {
  const bsr = titulo.bsr_geral
  const color = bsrColor(bsr)
  return (
    <Link href={`/titulo/${titulo.asin}`} style={{ textDecoration: 'none' }}>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          cursor: 'pointer',
          transition: 'border-color .15s',
          borderColor: 'var(--border)',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-dim)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontVariantNumeric: 'tabular-nums' }}>#{rank}</span>
          <BSRBadge value={bsr} size="sm" showTier />
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.35, color: 'var(--text)' }}>
          {titulo.titulo?.length > 55 ? titulo.titulo.slice(0, 55) + '…' : titulo.titulo}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            {titulo.kenp_mes != null ? `${titulo.kenp_mes.toLocaleString('pt-BR')} KENP` : ''}
          </span>
          <Sparkline data={titulo.bsr_7d ?? []} width={72} height={24} />
        </div>
      </Card>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
const SORT_OPTS = [
  { key: 'bsr_geral',   label: 'BSR',          dir: 'asc'  },
  { key: 'titulo',      label: 'Título',        dir: 'asc'  },
  { key: 'vendas_mes',  label: 'Vendas/mês',    dir: 'desc' },
  { key: 'kenp_mes',    label: 'KENP/mês',      dir: 'desc' },
]

export default function Catalogo() {
  const { data, error, isLoading } = useSWR('titulos', api.titulos)
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('bsr_geral')
  const [sortDir, setSortDir] = useState('asc')

  const rows = useMemo(() => {
    if (!data) return []
    let filtered = data.filter(t =>
      !search ||
      t.titulo?.toLowerCase().includes(search.toLowerCase()) ||
      t.asin?.toLowerCase().includes(search.toLowerCase())
    )
    filtered.sort((a, b) => {
      const av = a[sortKey] ?? (sortDir === 'asc' ? Infinity : -Infinity)
      const bv = b[sortKey] ?? (sortDir === 'asc' ? Infinity : -Infinity)
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })
    return filtered
  }, [data, search, sortKey, sortDir])

  function toggleSort(key, defaultDir) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir(defaultDir)
    }
  }

  if (isLoading) return <Loading />
  if (error)     return <PageError message={error.message} />

  const topKenp = [...(data ?? [])].sort((a, b) => (b.kenp_mes ?? 0) - (a.kenp_mes ?? 0)).slice(0, 4)

  const cols = [
    {
      key: 'titulo', label: 'Título',
      sorted: sortKey === 'titulo' ? sortDir : null,
      onSort: () => toggleSort('titulo', 'asc'),
      render: (v, row) => (
        <Link href={`/titulo/${row.asin}`} style={{ color: 'var(--text)', fontWeight: 500 }}>
          {v?.length > 60 ? v.slice(0, 60) + '…' : v}
        </Link>
      ),
    },
    {
      key: 'asin', label: 'ASIN',
      render: v => <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.78rem' }}>{v}</span>,
    },
    {
      key: 'bsr_geral', label: 'BSR', align: 'right',
      sorted: sortKey === 'bsr_geral' ? sortDir : null,
      onSort: () => toggleSort('bsr_geral', 'asc'),
      render: v => <BSRBadge value={v} showTier />,
    },
    {
      key: 'bsr_7d', label: '7 dias',
      render: v => <Sparkline data={v ?? []} />,
    },
    {
      key: 'categoria_nome', label: 'Categoria',
      render: v => v ? <Badge>{v}</Badge> : '—',
    },
    {
      key: 'vendas_mes', label: 'Vendas/mês', align: 'right',
      sorted: sortKey === 'vendas_mes' ? sortDir : null,
      onSort: () => toggleSort('vendas_mes', 'desc'),
      render: v => <span style={{ fontWeight: 600 }}>{v?.toLocaleString('pt-BR') ?? '—'}</span>,
    },
    {
      key: 'kenp_mes', label: 'KENP/mês', align: 'right',
      sorted: sortKey === 'kenp_mes' ? sortDir : null,
      onSort: () => toggleSort('kenp_mes', 'desc'),
      render: v => <span style={{ color: 'var(--text-dim)' }}>{v?.toLocaleString('pt-BR') ?? '—'}</span>,
    },
    {
      key: 'royalties_mes', label: 'Royalties', align: 'right',
      render: v => v != null
        ? <span style={{ color: 'var(--green)' }}>R$ {v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        : '—',
    },
  ]

  return (
    <>
      <SectionTitle sub={`${data?.length ?? 0} títulos ativos`}>Catálogo</SectionTitle>

      {/* Top KENP cards */}
      {topKenp.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {topKenp.map((t, i) => <TopCard key={t.asin} titulo={t} rank={i + 1} />)}
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar título ou ASIN…"
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.875rem', width: 260 }}
        />
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {SORT_OPTS.map(opt => (
            <button
              key={opt.key}
              onClick={() => toggleSort(opt.key, opt.dir)}
              style={{
                padding: '0.35rem 0.7rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: sortKey === opt.key ? 'var(--gold-bg)' : 'transparent',
                color: sortKey === opt.key ? 'var(--gold)' : 'var(--text-dim)',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 500,
                transition: 'all .15s',
              }}
            >
              {opt.label}
              {sortKey === opt.key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
            </button>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
          {rows.length} resultado{rows.length !== 1 ? 's' : ''}
        </span>
      </div>

      <Card style={{ padding: 0 }}>
        <Table
          columns={cols}
          rows={rows}
          onRowClick={row => router.push(`/titulo/${row.asin}`)}
          emptyText="Nenhum título encontrado."
        />
      </Card>
    </>
  )
}
