import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { api } from '../../lib/api'
import {
  Card, BSRBadge, Stat, Badge, MiniBar,
  Loading, PageError, Table, TOOLTIP_STYLE, bsrColor,
} from '../../components/ui'

// ── Consts ────────────────────────────────────────────────────────────────────
const PERIODOS = [
  { label: '7d',  dias: 7   },
  { label: '30d', dias: 30  },
  { label: '90d', dias: 90  },
  { label: '1a',  dias: 365 },
]

function fmtData(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

function fmtMes(periodo) {
  if (!periodo) return '—'
  return String(periodo).replace(/-01$/, '').replace('-', '/')
}

// ── Tooltips ──────────────────────────────────────────────────────────────────
function BsrTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div style={TOOLTIP_STYLE}>
      <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginBottom: 2 }}>{d.data}</div>
      <div style={{ color: bsrColor(d.bsr), fontWeight: 700 }}>BSR #{d.bsr?.toLocaleString('pt-BR')}</div>
      {d.cat && <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>Cat. #{d.cat?.toLocaleString('pt-BR')}</div>}
    </div>
  )
}

function VendasTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div style={TOOLTIP_STYLE}>
      <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginBottom: 2 }}>{fmtMes(d.mes)}</div>
      <div><strong>{d.unidades?.toLocaleString('pt-BR')}</strong> un.</div>
      {d.kenp     != null && <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>KENP: {d.kenp.toLocaleString('pt-BR')}</div>}
      {d.royalties != null && <div style={{ color: 'var(--green)', fontSize: '0.72rem' }}>R$ {d.royalties.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>}
    </div>
  )
}

// ── Tabela 12 meses ───────────────────────────────────────────────────────────
function Tabela12Meses({ vendas }) {
  const meses = [...vendas].sort((a, b) => String(b.mes).localeCompare(String(a.mes))).slice(0, 12)
  const cols = [
    { key: 'mes',       label: 'Mês',          render: (v) => fmtMes(v) },
    { key: 'unidades',  label: 'Vendas',        align: 'right', render: v => v?.toLocaleString('pt-BR') },
    { key: 'kenp',      label: 'KENP',          align: 'right', render: v => v?.toLocaleString('pt-BR') ?? '—' },
    { key: 'royalties', label: 'Royalties',     align: 'right',
      render: v => v != null
        ? <span style={{ color: 'var(--green)' }}>R$ {v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        : '—'
    },
    { key: 'kenp',      label: 'KENP spark',    render: (_, r) => null }, // placeholder replaced below
  ]
  return <Table columns={cols.slice(0, 4)} rows={meses} emptyText="Sem histórico." />
}

// ── Botão período ─────────────────────────────────────────────────────────────
function PeriodoBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.3rem 0.65rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)',
        background: active ? 'var(--gold-bg)' : 'transparent',
        color: active ? 'var(--gold)' : 'var(--text-dim)',
        cursor: 'pointer',
        fontSize: '0.78rem',
        fontWeight: 600,
        transition: 'all .15s',
      }}
    >
      {label}
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TituloPerfil() {
  const { query } = useRouter()
  const asin      = query.asin
  const [periodo, setPeriodo] = useState(30)

  const { data: titulo,   isLoading: tLoad, error: tErr } = useSWR(asin ? `t-${asin}`        : null, () => api.titulo(asin))
  const { data: bsrHist,  isLoading: bLoad }              = useSWR(asin ? `b-${asin}-${periodo}` : null, () => api.bsrHistory(asin, periodo))
  const { data: vendas }                                   = useSWR(asin ? `v-${asin}`        : null, () => api.vendasHistory(asin))
  const { data: estimativa }                               = useSWR(
    titulo?.bsr_geral ? `est-${titulo.bsr_geral}` : null,
    () => api.estimador(titulo.bsr_geral)
  )

  if (tLoad || !asin) return <Loading />
  if (tErr)           return <PageError message={tErr.message} />

  const bsrData = (bsrHist ?? []).map(d => ({
    data: fmtData(d.coletado_em),
    bsr:  d.bsr_geral,
    cat:  d.bsr_categoria,
  }))

  const vendasData = (vendas ?? [])
    .sort((a, b) => String(a.mes || a.periodo).localeCompare(String(b.mes || b.periodo)))
    .map(d => ({
      mes:       d.periodo ?? d.mes,
      unidades:  d.unidades_liquidas ?? d.unidades,
      kenp:      d.kenp,
      royalties: d.royalties_brl,
    }))

  const kenp12   = vendasData.slice(-12).map(d => d.kenp      ?? 0)
  const royal12  = vendasData.slice(-12).map(d => d.royalties ?? 0)

  const bsrMin = bsrData.length ? Math.min(...bsrData.map(d => d.bsr).filter(Boolean)) : null
  const bsrAvg = bsrData.length
    ? Math.round(bsrData.reduce((s, d) => s + (d.bsr ?? 0), 0) / bsrData.filter(d => d.bsr).length)
    : null

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '1.25rem', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-dim)' }}>Catálogo</Link>
        <span>›</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{asin}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.6rem' }}>
          {titulo?.titulo ?? asin}
        </h1>
        <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.78rem' }}>{asin}</span>
          {titulo?.categoria_nome && <Badge>{titulo.categoria_nome}</Badge>}
          {titulo?.bsr_geral && (
            <Badge color={bsrColor(titulo.bsr_geral)}>
              BSR #{titulo.bsr_geral.toLocaleString('pt-BR')}
            </Badge>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <Card>
          <Stat label="BSR Atual" value={<BSRBadge value={titulo?.bsr_geral} size="lg" />} />
        </Card>
        <Card>
          <Stat label="BSR Categoria" value={<BSRBadge value={titulo?.bsr_categoria} />} sub={titulo?.categoria_nome} />
        </Card>
        <Card>
          <Stat
            label="Vendas / mês (real)"
            value={titulo?.vendas_mes?.toLocaleString('pt-BR') ?? '—'}
            sub="KDP Report"
          />
        </Card>
        <Card>
          <Stat
            label="Vendas / mês (est.)"
            value={estimativa?.vendas_mensais?.toLocaleString('pt-BR') ?? '—'}
            sub="baseado em calibração"
          />
        </Card>
        <Card>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>KENP / mês</div>
          <div style={{ fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.4rem' }}>
            {titulo?.kenp_mes?.toLocaleString('pt-BR') ?? '—'}
          </div>
          <MiniBar data={kenp12} color="var(--gold)" width={100} />
        </Card>
        <Card>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>Royalties / mês</div>
          <div style={{ fontWeight: 700, fontSize: '1.4rem', color: 'var(--green)', marginBottom: '0.4rem' }}>
            {titulo?.royalties_mes != null ? `R$ ${titulo.royalties_mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—'}
          </div>
          <MiniBar data={royal12} color="var(--green)" width={100} />
        </Card>
      </div>

      {/* BSR History */}
      <Card style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Histórico BSR</span>
            {bsrMin && (
              <span style={{ marginLeft: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                mín: <span style={{ color: 'var(--green)' }}>#{bsrMin.toLocaleString('pt-BR')}</span>
                {' '} média: <span style={{ color: 'var(--gold)' }}>#{bsrAvg?.toLocaleString('pt-BR')}</span>
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {PERIODOS.map(({ label, dias }) => (
              <PeriodoBtn key={dias} label={label} active={periodo === dias} onClick={() => setPeriodo(dias)} />
            ))}
          </div>
        </div>

        {bLoad ? (
          <Loading text="Carregando BSR..." />
        ) : bsrData.length ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={bsrData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <defs>
                <linearGradient id="bsrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="var(--gold)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="data" stroke="var(--text-dim)" tick={{ fontSize: 11 }} />
              <YAxis
                stroke="var(--text-dim)"
                tick={{ fontSize: 11 }}
                reversed
                tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<BsrTooltip />} />
              <Area
                type="monotone"
                dataKey="bsr"
                stroke="var(--gold)"
                fill="url(#bsrGrad)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'var(--gold)', strokeWidth: 0 }}
              />
              {bsrData.some(d => d.cat) && (
                <Line
                  type="monotone"
                  dataKey="cat"
                  stroke="var(--text-dim)"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '2.5rem' }}>Sem histórico para este período.</p>
        )}
      </Card>

      {/* Vendas + Royalties */}
      {vendasData.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Vendas mensais */}
          <Card>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem' }}>Vendas mensais</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={vendasData.slice(-12)} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="mes" tickFormatter={fmtMes} stroke="var(--text-dim)" tick={{ fontSize: 10 }} />
                <YAxis stroke="var(--text-dim)" tick={{ fontSize: 10 }} />
                <Tooltip content={<VendasTooltip />} />
                <Bar dataKey="unidades" fill="var(--gold)" fillOpacity={0.8} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Royalties mensais */}
          <Card>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem' }}>Royalties mensais (R$)</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={vendasData.slice(-12)} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <defs>
                  <linearGradient id="royGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="var(--green)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--green)" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="mes" tickFormatter={fmtMes} stroke="var(--text-dim)" tick={{ fontSize: 10 }} />
                <YAxis stroke="var(--text-dim)" tick={{ fontSize: 10 }} tickFormatter={v => `R$${v}`} />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={v => [`R$ ${v?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Royalties']}
                  labelFormatter={fmtMes}
                />
                <Area type="monotone" dataKey="royalties" stroke="var(--green)" fill="url(#royGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Tabela 12 meses */}
      {vendasData.length > 0 && (
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '1rem 1.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>
            Últimos 12 meses
          </div>
          <Tabela12Meses vendas={vendasData} />
        </Card>
      )}
    </>
  )
}
