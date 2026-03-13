/**
 * KindleRanker BR — Confirmação de pagamento
 * /sucesso?session_id=...
 */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Sucesso() {
  const router = useRouter()
  const { session_id } = router.query
  const [segundos, setSegundos] = useState(8)

  // Redireciona para o dashboard após contagem regressiva
  useEffect(() => {
    if (!router.isReady) return
    const t = setInterval(() => {
      setSegundos(s => {
        if (s <= 1) { clearInterval(t); router.push('/'); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [router.isReady])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-mono)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        {/* Ícone */}
        <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📚</div>

        {/* Título */}
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem' }}>
          Bem-vindo ao KindleRanker!
        </h1>

        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          Sua assinatura foi ativada com sucesso.<br />
          Você receberá um e-mail de confirmação em instantes.<br />
          O dashboard já tem os dados do seu catálogo.
        </p>

        {/* Card de próximos passos */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          textAlign: 'left',
        }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            PRÓXIMOS PASSOS
          </div>
          <ol style={{ margin: 0, padding: '0 0 0 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              'Acesse o dashboard — seus títulos já estão lá',
              'O coletor BSR roda a cada 6h automaticamente',
              'Ative alertas de BSR na página de cada título',
              'O relatório semanal chega toda segunda-feira',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.5 }}>
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* Botão principal */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'var(--gold)',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: 8,
            padding: '0.85rem 2rem',
            fontSize: '0.9rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            marginBottom: '1rem',
            width: '100%',
          }}>
            Ir para o Dashboard
          </button>
        </Link>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          Redirecionando em {segundos}s...
        </p>

        {session_id && (
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', marginTop: '1rem', wordBreak: 'break-all' }}>
            {session_id}
          </p>
        )}
      </div>
    </div>
  )
}
