/**
 * KindleRanker BR — Página de Preços
 * /precos
 */
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const PLANOS = [
  {
    id: 'mensal',
    nome: 'Mensal',
    preco: 'R$ 47',
    periodo: '/mês',
    descricao: 'Ideal para começar a monitorar seu catálogo.',
    destaque: false,
  },
  {
    id: 'anual',
    nome: 'Anual',
    preco: 'R$ 397',
    periodo: '/ano',
    desconto: 'Economize R$ 167',
    descricao: 'Melhor custo-benefício. Equivale a R$ 33/mês.',
    destaque: true,
  },
]

const RECURSOS = [
  'BSR coletado a cada 6h automaticamente',
  'Histórico completo de rankings',
  'Análise de sazonalidade (Livro Escolar, Dia das Mães etc.)',
  'Estimativa de vendas e KENP',
  'Análise IA contextualizada por título',
  'Alertas de queda/subida de BSR por e-mail',
  'Relatório semanal automático',
  '7 dias grátis — cancele quando quiser',
]

export default function Precos() {
  const router  = useRouter()
  const [email, setEmail] = useState('')
  const [nome,  setNome]  = useState('')
  const [plano, setPlano] = useState('anual')
  const [loading, setLoading] = useState(false)
  const [erro,    setErro]    = useState('')

  const cancelado = router.query.cancelado === '1'

  async function iniciarCheckout(e) {
    e.preventDefault()
    if (!email || !nome) { setErro('Preencha nome e e-mail.'); return }
    setErro('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/stripe/criar-sessao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nome, plano }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Erro ao criar sessão.')
      window.location.href = data.url
    } catch (err) {
      setErro(err.message)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-mono)', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <Link href="/" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          ← VOLTAR AO DASHBOARD
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', margin: '1rem 0 0.5rem' }}>
          KindleRanker BR
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          Monitoramento de BSR e análise de catálogo Kindle na Amazon.com.br
        </p>
      </div>

      {cancelado && (
        <div style={{ maxWidth: 480, margin: '0 auto 1.5rem', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: '0.85rem', color: '#fca5a5', textAlign: 'center' }}>
          Pagamento cancelado. Nenhuma cobrança foi feita.
        </div>
      )}

      {/* Planos */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: 700, margin: '0 auto 2.5rem' }}>
        {PLANOS.map(p => (
          <div
            key={p.id}
            onClick={() => setPlano(p.id)}
            style={{
              flex: '1 1 260px',
              maxWidth: 300,
              background: plano === p.id ? 'rgba(212,175,55,0.07)' : 'var(--surface)',
              border: `2px solid ${plano === p.id ? 'var(--gold)' : 'var(--border)'}`,
              borderRadius: 12,
              padding: '1.5rem',
              cursor: 'pointer',
              position: 'relative',
              transition: 'border-color .15s, background .15s',
            }}
          >
            {p.destaque && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#0a0a0a', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.75rem', borderRadius: 20, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                MAIS POPULAR
              </div>
            )}
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{p.nome.toUpperCase()}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: plano === p.id ? 'var(--gold)' : 'var(--text)' }}>{p.preco}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{p.periodo}</span>
            </div>
            {p.desconto && (
              <div style={{ fontSize: '0.75rem', color: '#4ade80', marginBottom: '0.5rem' }}>{p.desconto}</div>
            )}
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{p.descricao}</p>
            {plano === p.id && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>✓ SELECIONADO</div>
            )}
          </div>
        ))}
      </div>

      {/* Recursos */}
      <div style={{ maxWidth: 460, margin: '0 auto 2.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '1rem' }}>INCLUSO EM TODOS OS PLANOS</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {RECURSOS.map((r, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text)', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulário */}
      <form onSubmit={iniciarCheckout} style={{ maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textAlign: 'center', letterSpacing: '0.08em' }}>
          PAGUE COM CARTÃO OU PIX — COMECE COM 7 DIAS GRÁTIS
        </div>
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        {erro && (
          <div style={{ fontSize: '0.8rem', color: '#fca5a5', textAlign: 'center' }}>{erro}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? 'rgba(212,175,55,0.3)' : 'var(--gold)',
            color: loading ? 'var(--text-dim)' : '#0a0a0a',
            border: 'none',
            borderRadius: 8,
            padding: '0.85rem',
            fontSize: '0.9rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.05em',
            transition: 'opacity .15s',
          }}
        >
          {loading ? 'Aguarde...' : `Assinar ${PLANOS.find(p => p.id === plano)?.nome} — 7 dias grátis`}
        </button>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.6 }}>
          Pagamento seguro via Stripe. Cancele quando quiser sem taxa.
          Após o trial, cobrado automaticamente até você cancelar.
        </p>
      </form>
    </div>
  )
}

const inputStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '0.75rem 1rem',
  color: 'var(--text)',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-mono)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}
