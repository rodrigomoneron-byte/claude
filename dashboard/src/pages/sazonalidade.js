import { useState, useMemo } from 'react'
import useSWR from 'swr'
import { api } from '../lib/api'
import { Card, SectionTitle, Loading, PageError, Table } from '../components/ui'

const MESES     = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const MESES_ABR = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

// ── Roda Radar SVG ────────────────────────────────────────────────────────────
function RadarRoda({ dados, label = 'vendas' }) {
  const R    = 110
  const CX   = 140
  const CY   = 140
  const SIZE = 280

  const values = MESES.map((_, i) => {
    const row = dados.find(d => d.mes === i + 1)
    return row?.[label] ?? 0
  })
  const maxVal = Math.max(...values, 1)

  const pts = values.map((v, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
    const r     = (v / maxVal) * R
    return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle), v }
  })
  const polygon = pts.map(p => `${p.x},${p.y}`).join(' ')

  // Anéis de referência
  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <svg width={SIZE} height={SIZE} style={{ overflow: 'visible' }}>
      {/* Anéis */}
      {rings.map(r => (
        <circle
          key={r}
          cx={CX} cy={CY}
          r={r * R}
          fill="none"
          stroke="var(--border)"
          strokeWidth={r === 1 ? 1 : 0.5}
        />
      ))}
      {/* Eixos radiais */}
      {MESES.map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
        return (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={CX + R * Math.cos(angle)}
            y2={CY + R * Math.sin(angle)}
            stroke="var(--border)"
            strokeWidth={0.5}
          />
        )
      })}
      {/* Área preenchida */}
      <polygon
        points={polygon}
        fill="var(--gold)"
        fillOpacity={0.15}
        stroke="var(--gold)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Pontos */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--gold)" />
      ))}
      {/* Labels dos meses */}
      {MESES.map((m, i) => {
        const angle  = (i / 12) * 2 * Math.PI - Math.PI / 2
        const labelR = R + 18
        const lx     = CX + labelR * Math.cos(angle)
        const ly     = CY + labelR * Math.sin(angle)
        return (
          <text
            key={i}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fill={values[i] === Math.max(...values) ? 'var(--gold)' : 'var(--text-dim)'}
            fontWeight={values[i] === Math.max(...values) ? 700 : 400}
          >
            {m}
          </text>
        )
      })}
    </svg>
  )
}

// ── Heatmap ───────────────────────────────────────────────────────────────────
function Heatmap({ dados, anos }) {
  const maxVal = Math.max(...dados.map(d => d.total_vendas ?? 0), 1)

  function cellColor(v) {
    if (v == null) return 'var(--border)'
    const t = v / maxVal
    const r = Math.round(10  + t * (201 - 10))
    const g = Math.round(10  + t * (168 - 10))
    const b = Math.round(10  + t * (76  - 10))
    return `rgb(${r},${g},${b})`
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'separate', borderSpacing: 3 }}>
        <thead>
          <tr>
            <th style={{ color: 'var(--text-dim)', fontSize: '0.7rem', textAlign: 'left', paddingRight: 12, minWidth: 52 }}>Ano</th>
            {MESES.map(m => (
              <th key={m} style={{ color: 'var(--text-dim)', fontSize: '0.7rem', textAlign: 'center', minWidth: 40, paddingBottom: 6 }}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {anos.map(ano => (
            <tr key={ano}>
              <td style={{ color: 'var(--text-dim)', fontSize: '0.78rem', paddingRight: 12, fontVariantNumeric: 'tabular-nums' }}>{ano}</td>
              {MESES.map((_, i) => {
                const row = dados.find(d => d.ano === ano && d.mes === i + 1)
                const v   = row?.total_vendas ?? null
                const bg  = cellColor(v)
                const ratio = v != null ? v / maxVal : 0
                return (
                  <td key={i} title={v != null ? `${v} vendas` : '–'}>
                    <div style={{
                      width: 40, height: 32,
                      borderRadius: 4,
                      background: bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.68rem',
                      color: ratio > 0.45 ? 'rgba(0,0,0,.8)' : 'var(--text-dim)',
                      fontWeight: ratio > 0.65 ? 700 : 400,
                      transition: 'transform .1s',
                      cursor: 'default',
                    }}>
                      {v != null ? v : ''}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Bar chart mensal (médias) ──────────────────────────────────────────────────
function BarMensal({ medias }) {
  const max = Math.max(...medias, 1)
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 120 }}>
      {medias.map((v, i) => {
        const h     = Math.max(2, Math.round((v / max) * 100))
        const isMax = v === max
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ fontSize: '0.62rem', color: isMax ? 'var(--gold)' : 'var(--text-dim)' }}>
              {v > 0 ? Math.round(v) : ''}
            </div>
            <div style={{
              width: '100%', height: h,
              background: isMax ? 'var(--gold)' : `rgba(201,168,76,${0.25 + 0.55 * (h / 100)})`,
              borderRadius: '3px 3px 0 0',
              transition: 'height .3s',
            }} />
            <div style={{ fontSize: '0.65rem', color: isMax ? 'var(--gold)' : 'var(--text-dim)', fontWeight: isMax ? 700 : 400 }}>
              {MESES_ABR[i]}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Sazonalidade() {
  const [asin, setAsin] = useState('')

  const fetcher  = () => api.sazonalidade(asin || undefined)
  const { data, isLoading, error } = useSWR(`sazon-${asin}`, fetcher)

  const dados    = data ?? []
  const anos     = useMemo(() => [...new Set(dados.map(d => d.ano))].sort(), [dados])

  // Médias mensais (todos os anos)
  const mediasMes = useMemo(() => MESES.map((_, i) => {
    const vals = dados.filter(d => d.mes === i + 1).map(d => d.total_vendas ?? 0)
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
  }), [dados])

  // Índice sazonal (1.0 = média)
  const mediaGeral = mediasMes.reduce((a, b) => a + b, 0) / 12 || 1
  const indices    = mediasMes.map(m => +(m / mediaGeral).toFixed(2))

  const tabelaCols = [
    { key: 'mes',     label: 'Mês',    render: (_, r) => MESES[(r.mes ?? 1) - 1] },
    { key: 'media',   label: 'Média vendas', align: 'right', render: (_, r) => mediasMes[r.mes - 1]?.toFixed(1) ?? '—' },
    { key: 'indice',  label: 'Índice sazonal', align: 'right',
      render: (_, r) => {
        const idx = indices[r.mes - 1]
        const color = idx >= 1.2 ? 'var(--green)' : idx <= 0.8 ? 'var(--red)' : 'var(--text)'
        return <span style={{ color, fontWeight: 600 }}>{idx?.toFixed(2)}×</span>
      }
    },
    { key: 'melhor',  label: 'Destaque', align: 'center',
      render: (_, r) => indices[r.mes - 1] === Math.max(...indices) ? '★' : '' }
  ]
  const tabelaRows = MESES.map((_, i) => ({ mes: i + 1 }))

  if (isLoading) return <Loading />
  if (error)     return <PageError message={error.message} />

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <SectionTitle sub="Padrão de vendas ao longo do ano">Sazonalidade</SectionTitle>
        <input
          value={asin}
          onChange={e => setAsin(e.target.value.toUpperCase())}
          placeholder="ASIN (opcional)"
          maxLength={10}
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.875rem', width: 175 }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'start' }}>
        {/* Roda radar */}
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-dim)' }}>Roda Sazonal</div>
          <RadarRoda dados={dados} label="total_vendas" />
        </Card>

        {/* Bar + heatmap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>Média por mês</div>
            <BarMensal medias={mediasMes} />
          </Card>

          <Card style={{ overflowX: 'auto' }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>Heatmap anual</div>
            {anos.length > 0 ? <Heatmap dados={dados} anos={anos} /> : (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Sem dados suficientes.</p>
            )}
          </Card>
        </div>
      </div>

      {/* Tabela índice sazonal */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '1rem 1.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>Índice Sazonal por mês</div>
        <Table columns={tabelaCols} rows={tabelaRows} emptyText="Sem dados." />
      </Card>
    </>
  )
}
