/**
 * KindleRanker BR — Componente: AIAnalysis
 * Painel de análise com Claude AI integrado ao dashboard.
 *
 * Uso:
 *   import AIAnalysis from '../components/AIAnalysis';
 *
 *   // Página de título:
 *   <AIAnalysis tipo="titulo" contexto={{ asin, titulo, bsr_geral, ... }} />
 *
 *   // Página de catálogo:
 *   <AIAnalysis tipo="catalogo" contexto={{ total_titulos, top_kenp, ... }} />
 *
 *   // Estimador:
 *   <AIAnalysis tipo="estimador" contexto={{ bsr, vendas_diarias_estimadas, ... }} />
 */

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ── Markdown simples → JSX ────────────────────────────────────────────────────

function renderMarkdown(text) {
  if (!text) return null;

  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height: 10 }} />;

    // **negrito**
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const rendered = parts.map((part, j) =>
      j % 2 === 1
        ? <strong key={j} style={{ color: '#E2C97E', fontWeight: 500 }}>{part}</strong>
        : part
    );

    // Linha com número (1. 2. 3.) = cabeçalho de seção
    if (/^\d+\./.test(line.trim())) {
      return (
        <div key={i} style={{ marginTop: 20, marginBottom: 4 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#C9A84C', marginRight: 8 }}>
            {line.match(/^\d+\./)[0]}
          </span>
          <span style={{ fontWeight: 500, color: '#F0EDE8', fontSize: 14 }}>
            {rendered.slice(1)}
          </span>
        </div>
      );
    }

    // Linha com bullet
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      return (
        <div key={i} style={{ display: 'flex', gap: 8, marginLeft: 16, marginTop: 4 }}>
          <span style={{ color: '#6B5521', flexShrink: 0, marginTop: 1 }}>▸</span>
          <span style={{ color: '#9A9590', fontSize: 13, lineHeight: 1.6 }}>{rendered.slice(1)}</span>
        </div>
      );
    }

    return (
      <div key={i} style={{ color: '#9A9590', fontSize: 13, lineHeight: 1.7, marginTop: 2 }}>
        {rendered}
      </div>
    );
  });
}

// ── Ícones ────────────────────────────────────────────────────────────────────

const IconIA = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="3" stroke="#C9A84C" strokeWidth="1.5"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="4" y="4" width="8" height="8" rx="1" stroke="#5A5652" strokeWidth="1.2"/>
    <path d="M2 10V2h8" stroke="#5A5652" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// ── Labels por tipo ───────────────────────────────────────────────────────────

const CONFIG = {
  titulo: {
    label: 'Analisar com IA',
    endpoint: '/ai/titulo',
    descricao: 'Diagnóstico do título com base em BSR, KENP e histórico real.',
  },
  catalogo: {
    label: 'Analisar catálogo',
    endpoint: '/ai/catalogo',
    descricao: 'Visão estratégica do catálogo completo com recomendação de timing.',
  },
  estimador: {
    label: 'Interpretar com IA',
    endpoint: '/ai/estimador',
    descricao: 'Contextualização do BSR consultado para o mercado brasileiro.',
  },
};

// ── Componente principal ──────────────────────────────────────────────────────

export default function AIAnalysis({ tipo, contexto, style = {} }) {
  const [analise, setAnalise]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [copiado, setCopiado]   = useState(false);
  const [tokens, setTokens]     = useState(null);

  const cfg = CONFIG[tipo];
  if (!cfg) return null;

  const analisar = async () => {
    setLoading(true);
    setError(null);
    setAnalise(null);

    try {
      const res = await fetch(`${API_URL}${cfg.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contexto),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || `Erro ${res.status}`);
      }

      const data = await res.json();
      setAnalise(data.analise);
      setTokens(data.tokens_usados);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copiar = () => {
    if (!analise) return;
    navigator.clipboard.writeText(analise);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div style={{
      background: '#0F0F12',
      border: analise ? '1px solid #6B5521' : '1px solid rgba(201,168,76,0.1)',
      borderRadius: 12,
      overflow: 'hidden',
      transition: 'border-color 300ms',
      ...style,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconIA />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#C9A84C', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Análise IA
          </span>
          {!analise && (
            <span style={{ fontSize: 12, color: '#5A5652' }}>{cfg.descricao}</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {analise && (
            <button
              onClick={copiar}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6,
                color: copiado ? '#4CAF7D' : '#5A5652',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontFamily: 'DM Mono, monospace',
                padding: '5px 10px',
                transition: 'all 150ms',
              }}
            >
              <IconCopy />
              {copiado ? 'Copiado' : 'Copiar'}
            </button>
          )}

          <button
            onClick={analisar}
            disabled={loading}
            style={{
              background: loading ? 'rgba(201,168,76,0.08)' : 'rgba(201,168,76,0.12)',
              border: '1px solid #6B5521',
              borderRadius: 6,
              color: loading ? '#6B5521' : '#C9A84C',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 12,
              fontFamily: 'DM Mono, monospace',
              fontWeight: 500,
              padding: '6px 14px',
              transition: 'all 150ms',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 12, height: 12,
                  border: '1.5px solid rgba(201,168,76,0.2)',
                  borderTop: '1.5px solid #C9A84C',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                  flexShrink: 0,
                }} />
                Analisando…
              </>
            ) : analise ? 'Reanalisar' : cfg.label}
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      {loading && (
        <div style={{ padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#5A5652', fontFamily: 'DM Mono, monospace', marginBottom: 8 }}>
            Processando dados com Claude AI…
          </div>
          <div style={{ fontSize: 12, color: '#3A3632' }}>
            BSR · KENP · Sazonalidade · Histórico
          </div>
        </div>
      )}

      {error && (
        <div style={{ padding: '20px 24px' }}>
          <div style={{
            background: 'rgba(224,92,92,0.08)',
            border: '1px solid rgba(224,92,92,0.15)',
            borderRadius: 8,
            padding: '12px 16px',
            color: '#E05C5C',
            fontSize: 13,
            fontFamily: 'DM Mono, monospace',
          }}>
            ⚠ {error}
          </div>
        </div>
      )}

      {analise && !loading && (
        <div style={{ padding: '20px 24px' }}>
          {/* Separador decorativo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)' }} />
            <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: '#6B5521', letterSpacing: '0.12em' }}>ANÁLISE</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(270deg, rgba(201,168,76,0.3), transparent)' }} />
          </div>

          {/* Texto da análise */}
          <div style={{ lineHeight: 1.7 }}>
            {renderMarkdown(analise)}
          </div>

          {/* Footer */}
          {tokens && (
            <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: '#3A3632', fontFamily: 'DM Mono, monospace' }}>
                Claude Sonnet · {tokens.toLocaleString('pt-BR')} tokens
              </span>
              <span style={{ fontSize: 11, color: '#3A3632', fontFamily: 'DM Mono, monospace' }}>
                KindleRanker BR · dados reais Amazon.com.br
              </span>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
