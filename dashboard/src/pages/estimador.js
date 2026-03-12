import { useState, useCallback } from 'react'
import useSWR from 'swr'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts'
import { api } from '../lib/api'
import {
  Card, Stat, Badge, Table, SectionTitle,
  Loading, PageError, TOOLTIP_STYLE,
} from '../components/ui'

// ── Confidence badge ──────────────────────────────────────────────────────────
function ConfBadge({ amostras }) {
  if (amostras == null) return '—'
  if (amostras >= 10) return <Badge color="var(--green)">Alta ({amostras})</Badge>
  if (amostras >= 4)  return <Badge color="var(--yellow)">Média ({amostras})</Badge>
  return <Badge color="var(--red)">Baixa ({amostras})</Badge>
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div style={TOOLTIP_STYLE}>
      <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginBottom: 4 }}>
        BSR {d.bsr_min?.toLocaleString('pt-BR')} – {d.bsr_max?.toLocaleString('pt-BR')}
      </div>
      <div style={{ fontWeight: 600 }}>{d.vendas} vendas/dia</div>
      <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>{d.amostras} amostras</div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Estimador() {
  const [bsrInput, setBsrInput] = useState('')
  const bsr = Number(bsrInput) || null

  const { data: calibracao, isLoading, error } = useSWR('calibracao', api.calibracao)
  const { data: estimativa } = useSWR(
    bsr ? `est-${bsr}` : null,
    () => api.estimador(bsr),
    { keepPreviousData: true }
  )

  const chartData = (calibracao ?? [])
    .map(f => ({
      bsr_min:  f.bsr_min,
      bsr_max:  f.bsr_max,
      bsr_mid:  Math.round((f.bsr_min + f.bsr_max) / 2),
      vendas:   f.vendas_diarias_media,
      amostras: f.amostras,
    }))
    .sort((a, b) => a.bsr_mid - b.bsr_mid)

  const totalAmostras = (calibracao ?? []).reduce((s, f) => s + (f.amostras ?? 0), 0)

  const tabelaCols = [
    { key: 'faixa',   label: 'Faixa BSR',        render: (_, r) => `${r.bsr_min?.toLocaleString('pt-BR')} – ${r.bsr_max?.toLocaleString('pt-BR')}` },
    { key: 'vendas',  label: 'Vendas/dia (média)', align: 'right', render: v => v?.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) },
    { key: 'vendas_mes', label: 'Vendas/mês (est.)', align: 'right', render: (_, r) => Math.round((r.vendas ?? 0) * 30).toLocaleString('pt-BR') },
    { key: 'amostras', label: 'Amostras', align: 'right', render: v => v?.toLocaleString('pt-BR') },
  ]

  if (isLoading) return <Loading />
  if (error)     return <PageError message={error.message} />

  return (
    <>
      <SectionTitle sub={`${totalAmostras.toLocaleString('pt-BR')} amostras reais — Amazon.com.br`}>
        Estimador BSR → Vendas
      </SectionTitle>

      {/* Input */}
      <Card style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '0.5rem', color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Insira o BSR
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            value={bsrInput}
            onChange={e => setBsrInput(e.target.value)}
            placeholder="ex: 5.000"
            min={1}
            style={{ padding: '0.55rem 1rem', fontSize: '1.2rem', width: 200, fontVariantNumeric: 'tabular-nums' }}
          />
          <input
            type="range"
            min={100}
            max={200000}
            step={100}
            value={bsr ?? 100}
            onChange={e => setBsrInput(e.target.value)}
            style={{ flex: 1, minWidth: 160, accentColor: 'var(--gold)', cursor: 'pointer' }}
          />
          {bsr && (
            <span style={{ color: 'var(--text-dim)', fontVariantNumeric: 'tabular-nums', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
              BSR #{bsr.toLocaleString('pt-BR')}
            </span>
          )}
        </div>
      </Card>

      {/* Resultado instantâneo */}
      {estimativa && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <Card>
            <Stat
              label="Vendas estimadas / dia"
              value={estimativa.vendas_diarias?.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) ?? '—'}
              sub="unidades"
              color="var(--text)"
            />
          </Card>
          <Card>
            <Stat
              label="Vendas estimadas / mês"
              value={estimativa.vendas_mensais?.toLocaleString('pt-BR') ?? '—'}
              sub="unidades × 30 dias"
            />
          </Card>
          <Card>
            <Stat
              label="Confiança"
              value={<ConfBadge amostras={estimativa.amostras} />}
              sub={`Faixa: #${estimativa.bsr_min?.toLocaleString('pt-BR')} – #${estimativa.bsr_max?.toLocaleString('pt-BR')}`}
            />
          </Card>
        </div>
      )}

      {/* Curva */}
      <Card style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          Curva de Calibração — Amazon.com.br
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="bsr_mid"
              tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
              stroke="var(--text-dim)"
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="var(--text-dim)" tick={{ fontSize: 11 }} />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="vendas"
              stroke="var(--gold)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: 'var(--gold)' }}
            />
            {bsr && (
              <ReferenceLine
                x={bsr}
                stroke="var(--green)"
                strokeDasharray="5 3"
                label={{ value: `#${bsr.toLocaleString('pt-BR')}`, fill: 'var(--green)', fontSize: 11, position: 'top' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Tabela de calibração completa */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '1rem 1.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>
          Tabela de Calibração
        </div>
        <Table
          columns={tabelaCols}
          rows={(calibracao ?? []).sort((a, b) => a.bsr_min - b.bsr_min)}
          emptyText="Sem dados de calibração."
        />
      </Card>
    </>
  )
}
