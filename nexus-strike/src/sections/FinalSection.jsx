import { useCallback, useRef } from 'react';
import { gsap } from '../lib/smoothScroll';
import { mapRange } from '../lib/mapRange';
import SectionShell from '../components/SectionShell';
import ScrubVideo from '../components/ScrubVideo';
import MobileChapter from '../components/MobileChapter';

const CHARACTER_IMG = '/media/final/Armed_character_standing_in_combat_202608141841.jpeg';
const FINAL_VIDEO = '/media/final/final-protocol.mp4';

function FinalDesktop() {
  const videoStackRef = useRef(null);
  const videoHandleRef = useRef(null);
  const indexRef = useRef(null);
  const revealRef = useRef(null);

  const handleProgress = useCallback((p) => {
    const videoOpacity = mapRange(p, 0.25, 0.4);
    if (videoStackRef.current) gsap.set(videoStackRef.current, { opacity: videoOpacity });
    if (videoHandleRef.current && p >= 0.27) {
      videoHandleRef.current.setProgress(mapRange(p, 0.27, 0.92));
    }

    if (indexRef.current) gsap.set(indexRef.current, { opacity: 1 - mapRange(p, 0.7, 0.85) });

    if (revealRef.current) {
      const reveal = mapRange(p, 0.78, 1);
      gsap.set(revealRef.current, { opacity: reveal, y: (1 - reveal) * 30 });
    }
  }, []);

  return (
    <SectionShell id="protocolo" heightMultiplier={3.6} onProgress={handleProgress}>
      <div className="absolute inset-0 flex items-center justify-center bg-void">
        <img
          src={CHARACTER_IMG}
          alt="Operador NEXUS armado, pronto para o protocolo final de combate."
          className="h-full w-full object-contain"
        />
        <div ref={videoStackRef} className="absolute inset-0" style={{ opacity: 0 }}>
          <ScrubVideo
            ref={videoHandleRef}
            src={FINAL_VIDEO}
            poster={CHARACTER_IMG}
            alt="Operador NEXUS atingindo o estado final de prontidão para o protocolo."
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,18,0.05) 0%, rgba(10,10,18,0.15) 55%, rgba(10,10,18,0.85) 100%)' }}
      />

      <div ref={indexRef} className="absolute left-6 top-16 z-10 md:left-16">
        <span className="font-mono-label block text-[11px] text-cyan">04 / 04</span>
      </div>

      <div ref={revealRef} className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-16 text-center" style={{ opacity: 0 }}>
        <h2 className="font-display text-5xl leading-[0.98] text-white md:text-7xl">
          A ARENA
          <br />
          <span className="text-cyan">/ ESTÁ À ESPERA.</span>
        </h2>
        <p className="mt-5 max-w-md font-body text-sm font-light leading-relaxed text-white/70">
          Sinal recebido. A próxima jogada é sua.
        </p>
        <a
          href="#topo"
          className="font-mono-label mt-8 inline-block border border-cyan bg-cyan/10 px-8 py-4 text-xs text-cyan transition-colors hover:bg-cyan hover:text-void"
        >
          INICIALIZAR CORRESPONDÊNCIA
        </a>
        <span className="mt-5 font-mono-label text-[10px] text-white/40">STATUS DO SISTEMA: PRONTO</span>
      </div>
    </SectionShell>
  );
}

function FinalMobile() {
  return (
    <MobileChapter
      id="protocolo"
      image={CHARACTER_IMG}
      alt="Operador NEXUS armado, pronto para o protocolo final."
      index="04 / 04"
      title={<>A ARENA<br />/ ESTÁ À ESPERA.</>}
      body="Sinal recebido. A próxima jogada é sua."
      status="STATUS DO SISTEMA: PRONTO"
      cta={
        <a
          href="#topo"
          className="font-mono-label mt-2 inline-block w-fit border border-cyan bg-cyan/10 px-8 py-4 text-xs text-cyan"
        >
          INICIALIZAR CORRESPONDÊNCIA
        </a>
      }
    />
  );
}

export default function FinalSection({ mobile }) {
  return mobile ? <FinalMobile /> : <FinalDesktop />;
}
