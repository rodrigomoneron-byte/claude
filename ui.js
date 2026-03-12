/**
 * KindleRanker BR — Design System Components
 * Todos os componentes UI reutilizáveis.
 */

import { useState } from 'react';

// ── Formatadores ──────────────────────────────────────────────────────────────

export const fmt = {
  brl: (v) => v == null ? '—' : `R$\u00a0${Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  num: (v) => v == null ? '—' : Number(v).toLocaleString('pt-BR'),
  bsr: (v) => v == null ? '—' : `#${Number(v).toLocaleString('pt-BR')}`,
  pct: (v) => v == null ? '—' : `${Number(v).toFixed(1)}%`,
  mes: (v) => {
    if (!v) return '—';
    const d = new Date(v + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
  },
  data: (v) => {
    if (!v) return '—';
    return new Date(v).toLocaleDateString('pt-BR');
  },
};

// ── Card ──────────────────────────────────────────────────────────────────────

export function Card({ children, className = '', style = {}, gold = false }) {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: gold ? '1px solid var(--gold-dim)' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      ...style,
    }} className={className}>
      {children}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

export function StatCard({ label, value, sub, accent = false }) {
  return (
    <Card gold={accent} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
      <span style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 600, color: accent ? 'var(--gold-light)' : 'var(--text-primary)', lineHeight: 1.1 }}>
        {value}
      </span>
      {sub && (
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</span>
      )}
    </Card>
  );
}

// ── Badge BSR ─────────────────────────────────────────────────────────────────

export function BSRBadge({ value }) {
  if (!value) return <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>sem BSR</span>;

  const tier = value <= 1000 ? { color: 'var(--green)', bg: 'rgba(76,175,125,0.1)' }
    : value <= 10000 ? { color: 'var(--gold)', bg: 'var(--gold-glow)' }
    : value <= 50000 ? { color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.05)' }
    : { color: 'var(--text-muted)', bg: 'rgba(255,255,255,0.03)' };

  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: tier.color,
      background: tier.bg,
      padding: '2px 8px',
      borderRadius: 4,
      whiteSpace: 'nowrap',
    }}>
      #{Number(value).toLocaleString('pt-BR')}
    </span>
  );
}

// ── Tabela ────────────────────────────────────────────────────────────────────

export function Table({ columns, data, onRowClick }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{
                textAlign: col.align || 'left',
                padding: '10px 16px',
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 400,
                borderBottom: '1px solid var(--border-subtle)',
                whiteSpace: 'nowrap',
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background var(--transition)',
              }}
              onMouseEnter={e => { if (onRowClick) e.currentTarget.style.background = 'var(--bg-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              {columns.map((col) => (
                <td key={col.key} style={{
                  padding: '12px 16px',
                  textAlign: col.align || 'left',
                  color: col.muted ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontFamily: col.mono ? 'var(--font-mono)' : 'inherit',
                  fontSize: col.mono ? 13 : 14,
                  maxWidth: col.maxWidth || 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: col.wrap ? 'normal' : 'nowrap',
                }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Sparkline SVG ─────────────────────────────────────────────────────────────

export function Sparkline({ data, color = 'var(--gold)', height = 40, width = 120 }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * w;
    const y = pad + (1 - (v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}

// ── Mini Bar Chart ────────────────────────────────────────────────────────────

export function MiniBarChart({ data, labelKey, valueKey, color = 'var(--gold)', height = 180 }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d[valueKey]));

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height }}>
      {data.map((d, i) => {
        const pct = max ? (d[valueKey] / max) * 100 : 0;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{
              width: '100%',
              height: `${pct}%`,
              background: color,
              borderRadius: '2px 2px 0 0',
              opacity: 0.7 + (pct / 100) * 0.3,
              transition: 'height 0.4s ease',
              minHeight: 2,
            }} title={`${d[labelKey]}: ${fmt.num(d[valueKey])}`} />
          </div>
        );
      })}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

export function Navbar({ active }) {
  const links = [
    { href: '/', label: 'Catálogo' },
    { href: '/estimador', label: 'Estimador' },
    { href: '/sazonalidade', label: 'Sazonalidade' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10,10,11,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: 56,
    }}>
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--gold)', letterSpacing: '-0.01em' }}>
          KindleRanker
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-elevated)', padding: '2px 6px', borderRadius: 3 }}>
          BR
        </span>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', gap: 4 }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            padding: '6px 14px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 400,
            color: active === l.href ? 'var(--gold)' : 'var(--text-secondary)',
            background: active === l.href ? 'var(--gold-glow)' : 'transparent',
            transition: 'all var(--transition)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => { if (active !== l.href) e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { if (active !== l.href) e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ── Loading ───────────────────────────────────────────────────────────────────

export function Loading({ text = 'Carregando...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, gap: 16 }}>
      <div style={{
        width: 32, height: 32,
        border: '2px solid var(--border-subtle)',
        borderTop: '2px solid var(--gold)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>{text}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Error ─────────────────────────────────────────────────────────────────────

export function ErrorBox({ message }) {
  return (
    <div style={{
      background: 'rgba(224,92,92,0.08)',
      border: '1px solid rgba(224,92,92,0.2)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 20px',
      color: 'var(--red)',
      fontSize: 13,
      fontFamily: 'var(--font-mono)',
    }}>
      ⚠ {message}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────

export function Input({ value, onChange, placeholder, type = 'text', style = {} }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        padding: '10px 14px',
        outline: 'none',
        width: '100%',
        transition: 'border-color var(--transition)',
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = 'var(--gold-dim)'}
      onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
    />
  );
}

// ── Button ────────────────────────────────────────────────────────────────────

export function Button({ children, onClick, disabled, variant = 'primary', style = {} }) {
  const styles = {
    primary: {
      background: 'var(--gold)',
      color: '#0A0A0B',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--gold)',
      border: '1px solid var(--gold-dim)',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: '10px 20px',
        borderRadius: 'var(--radius-md)',
        fontSize: 13,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all var(--transition)',
        fontFamily: 'var(--font-body)',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────

export function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      {sub && <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{sub}</p>}
    </div>
  );
}
