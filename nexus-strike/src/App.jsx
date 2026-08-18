import { useEffect } from 'react';
import Nav from './components/Nav';
import ProgressRail from './components/ProgressRail';
import HeroSection from './sections/HeroSection';
import LoadoutSection from './sections/LoadoutSection';
import SystemsSection from './sections/SystemsSection';
import FinalSection from './sections/FinalSection';
import { useIsMobile } from './hooks/useIsMobile';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { ScrollTrigger } from './lib/smoothScroll';

export default function App() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const cinematic = !isMobile && !reducedMotion;

  useSmoothScroll(cinematic);

  useEffect(() => {
    if (!cinematic) return undefined;
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(timeout);
  }, [cinematic]);

  return (
    <div id="topo" className="relative bg-void">
      <a
        href="#carregamento"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-cyan focus:px-4 focus:py-2 focus:text-void"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <ProgressRail />
      <main>
        <HeroSection mobile={!cinematic} />
        <LoadoutSection mobile={!cinematic} />
        <SystemsSection mobile={!cinematic} />
        <FinalSection mobile={!cinematic} />
      </main>
    </div>
  );
}
