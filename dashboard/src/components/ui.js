import Link from 'next/link'
import { useRouter } from 'next/router'

// ── Helpers ───────────────────────────────────────────────────────────────────
export function bsrColor(bsr) {
  if (!bsr) return 'var(--text-dim)'
  if (bsr < 1_000)   return 'var(--tier1)'
  if (bsr < 5_000)   return 'var(--tier2)'
  if (bsr < 20_000)  return 'var(--tier3)'
  if (bsr < 100_000) return 'var(--tier4)'
  return 'var(--tier5)'
}

function bsrTierLabel(bsr) {
  if (!bsr) return null
  if (bsr < 1_000)   return 'Top'
  if (bsr < 5_000)   return 'Ótimo'
  if (bsr < 20_000)  return 'Bom'
  if (bsr < 100_000) return 'Ok'
  return 'Baixo'
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, style, ...props }) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '1.25rem 1.5rem',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// ── BSRBadge ──────────────────────────────────────────────────────────────────
export function BSRBadge({ value, size = 'md', showTier = false }) {
  const color = bsrColor(value)
  const fontSize = size === 'lg' ? '1.75rem' : size === 'sm' ? '0.75rem' : '0.9rem'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.375rem' }}>
      <span style={{ color, fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontSize }}>
        {value ? `#${value.toLocaleString('pt-BR')}` : '—'}
      </span>
      {showTier && value && (
        <span style={{ fontSize: '0.7rem', color, opacity: 0.75 }}>{bsrTierLabel(value)}</span>
      )}
    </span>
  )
}

// ── Sparkline (SVG puro) ──────────────────────────────────────────────────────
export function Sparkline({ data = [], width = 88, height = 30 }) {
  if (!data || data.length < 2) return <span style={{ color: 'var(--text-faint)' }}>—</span>
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 2
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2)
    // Invert Y: lower BSR (better) = higher on chart
    const y = pad + ((v - min) / range) * (height - pad * 2)
    return `${x},${y}`
  }).join(' ')

  const first = data[0]
  const last  = data[data.length - 1]
  const stroke = last < first ? 'var(--green)' : last > first ? 'var(--red)' : 'var(--gold)'

  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      <polyline
        points={pts}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ── Stat ──────────────────────────────────────────────────────────────────────
export function Stat({ label, value, sub, color }) {
  return (
    <div>
      <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1, color: color || 'var(--text)' }}>
        {value ?? '—'}
      </div>
      {sub && (
        <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginTop: '0.3rem' }}>{sub}</div>
      )}
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ children, color = 'var(--gold)' }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.15rem 0.55rem',
      borderRadius: 999,
      fontSize: '0.72rem',
      fontWeight: 500,
      background: color + '1a',
      color,
      border: `1px solid ${color}33`,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

// ── Table ─────────────────────────────────────────────────────────────────────
export function Table({ columns, rows, onRowClick, emptyText = 'Nenhum resultado.' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: '0.6rem 1rem',
                  textAlign: col.align || 'left',
                  color: 'var(--text-dim)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                  cursor: col.onSort ? 'pointer' : 'default',
                }}
                onClick={() => col.onSort?.()}
              >
                {col.label}
                {col.sorted === 'asc' && ' ↑'}
                {col.sorted === 'desc' && ' ↓'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr
              key={row.asin ?? row.id ?? i}
              onClick={() => onRowClick?.(row)}
              style={{
                borderBottom: '1px solid var(--border)',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background .1s',
              }}
              onMouseEnter={e => { if (onRowClick) e.currentTarget.style.background = 'var(--bg-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: '0.75rem 1rem',
                    textAlign: col.align || 'left',
                    fontSize: col.fontSize || '0.875rem',
                    verticalAlign: 'middle',
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '/',              label: 'Catálogo' },
  { href: '/estimador',     label: 'Estimador' },
  { href: '/sazonalidade',  label: 'Sazonalidade' },
]

export function Nav() {
  const router = useRouter()
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9,9,9,.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      height: '3.25rem',
    }}>
      <span style={{
        color: 'var(--gold)',
        fontWeight: 700,
        fontSize: '0.95rem',
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
      }}>
        KindleRanker BR
      </span>
      {NAV_LINKS.map(({ href, label }) => {
        const active = router.pathname === href
        return (
          <Link
            key={href}
            href={href}
            style={{
              color: active ? 'var(--gold)' : 'var(--text-dim)',
              fontWeight: active ? 600 : 400,
              fontSize: '0.875rem',
              paddingBottom: '1px',
              borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
              transition: 'color .15s',
            }}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

// ── Loading ───────────────────────────────────────────────────────────────────
export function Loading({ text = 'Carregando...' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem', color: 'var(--text-dim)', gap: '0.625rem' }}>
      <svg width="18" height="18" viewBox="0 0 18 18" style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }}>
        <circle cx="9" cy="9" r="7" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="35 9" />
      </svg>
      {text}
    </div>
  )
}

// ── PageError ─────────────────────────────────────────────────────────────────
export function PageError({ message }) {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <div style={{ color: 'var(--red)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Erro ao carregar dados</div>
      {message && <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{message}</div>}
    </div>
  )
}

// ── SectionTitle ──────────────────────────────────────────────────────────────
export function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)' }}>{children}</h1>
      {sub && <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{sub}</p>}
    </div>
  )
}

// ── MiniBar (inline bar chart em SVG) ────────────────────────────────────────
export function MiniBar({ data = [], color = 'var(--gold)', width = 96, height = 28 }) {
  if (!data.length) return <span style={{ color: 'var(--text-faint)' }}>—</span>
  const max = Math.max(...data, 1)
  const barW = Math.floor((width - (data.length - 1)) / data.length)
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      {data.map((v, i) => {
        const h = Math.max(2, Math.round((v / max) * (height - 2)))
        return (
          <rect
            key={i}
            x={i * (barW + 1)}
            y={height - h}
            width={barW}
            height={h}
            rx={1}
            fill={color}
            opacity={0.5 + 0.5 * (v / max)}
          />
        )
      })}
    </svg>
  )
}

// ── Tooltip simples ───────────────────────────────────────────────────────────
const TOOLTIP_STYLE = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '0.5rem 0.75rem',
  fontSize: '0.8rem',
  color: 'var(--text)',
}

export { TOOLTIP_STYLE }
