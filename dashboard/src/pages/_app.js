import '../styles/globals.css'
import { Nav } from '../components/ui'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 1320, margin: '0 auto', padding: '2rem 1.5rem' }} className="fade-in">
        <Component {...pageProps} />
      </main>
    </>
  )
}
