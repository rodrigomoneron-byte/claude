import { useCallback, useRef, useState } from 'react';
import { gsap } from '../lib/smoothScroll';
import { mapRange, clamp01 } from '../lib/mapRange';
import SectionShell from '../components/SectionShell';
import ScrubVideo from '../components/ScrubVideo';
import MobileChapter from '../components/MobileChapter';

const STAGES = ['MÁSCARA', 'OMBROS', 'PEITO', 'BRAÇOS', 'TRAJE COMPLETO'];

const BASE_IMG = '/media/hero/hero-base.jpeg';
const SUIT_IMG = '/media/hero/hero-suit.jpeg';
const TRANSFORM_VIDEO = '/media/hero/hero_transform.mp4';

function HeroDesktop() {
  const suitRef = useRef(null);
  const videoStackRef = useRef(null);
  const videoHandleRef = useRef(null);
  const introRef = useRef(null);
  const stageLabelRef = useRef(null);
  const hintRef = useRef(null);
  const [stageText, setStageText] = useState(STAGES[0]);

  const handleProgress = useCallback((p) => {
    // 0.00 - 0.10 base fully visible
    // 0.10 - 0.58 staged wipe reveal of the suit
    // 0.58 - 0.72 crossfade suit -> video
    // 0.72 - 1.00 scroll-scrubbed transform video
    const wipe = mapRange(p, 0.1, 0.58);
    if (suitRef.current) {
      gsap.set(suitRef.current, { clipPath: `inset(${(1 - wipe) * 100}% 0 0 0)` });
    }

    const stageIndex = Math.min(STAGES.length - 1, Math.floor(wipe * STAGES.length));
    const nextStage = STAGES[stageIndex];
    if (wipe > 0 && wipe < 1) {
      setStageText((prev) => (prev !== nextStage ? nextStage : prev));
    }
    if (stageLabelRef.current) {
      gsap.set(stageLabelRef.current, { opacity: p >= 0.1 && p <= 0.6 ? 1 : 0 });
    }

    const videoOpacity = mapRange(p, 0.58, 0.72);
    if (videoStackRef.current) {
      gsap.set(videoStackRef.current, { opacity: videoOpacity });
    }
    if (videoHandleRef.current && p >= 0.6) {
      const t = mapRange(p, 0.72, 1);
      videoHandleRef.current.setProgress(t);
    }

    if (introRef.current) {
      gsap.set(introRef.current, {
        opacity: 1 - mapRange(p, 0.72, 0.94),
        y: -mapRange(p, 0.72, 0.94) * 24,
      });
    }
    if (hintRef.current) {
      gsap.set(hintRef.current, { opacity: 1 - mapRange(p, 0.03, 0.12) });
    }
  }, []);

  return (
    <SectionShell id="carregamento" heightMultiplier={4.2} onProgress={handleProgress}>
      <div className="absolute inset-0 flex items-center justify-center bg-void">
        <img
          src={BASE_IMG}
          alt="Operador NEXUS em estado de repouso, antes da ativação do traje."
          className="h-full w-full object-contain"
        />
        <img
          ref={suitRef}
          src={SUIT_IMG}
          alt="Traje tático NEXUS sendo revelado sobre o operador, camada por camada."
          className="absolute inset-0 h-full w-full object-contain"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        />
        <div ref={videoStackRef} className="absolute inset-0" style={{ opacity: 0 }}>
          <ScrubVideo
            ref={videoHandleRef}
            src={TRANSFORM_VIDEO}
            poster={SUIT_IMG}
            alt="Transformação completa do operador para o estado de combate NEXUS."
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(10,10,18,0.65) 0%, rgba(10,10,18,0.15) 42%, transparent 60%)' }}
      />

      <div ref={introRef} className="absolute inset-x-0 top-0 z-10 flex h-full flex-col justify-center px-6 md:px-16">
        <div className="max-w-lg">
          <span className="font-mono-label block text-[11px] text-cyan">01 / 04</span>
          <h1 className="font-display mt-6 text-6xl leading-[0.95] text-white md:text-7xl">
            VESTIR
            <br />O TERNO.
          </h1>
          <p className="mt-6 max-w-sm font-body text-sm font-light leading-relaxed text-white/70">
            O sinal começa por baixo da armadura.
          </p>
          <span ref={stageLabelRef} className="font-mono-label mt-8 inline-block text-[10px] text-violet" style={{ opacity: 0 }}>
            {stageText}
          </span>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 z-10 md:left-16">
        <a
          href="#equipamento"
          className="font-mono-label inline-block border border-cyan/50 px-6 py-3 text-[11px] text-cyan transition-colors hover:bg-cyan hover:text-void"
        >
          ENTRE NA ARENA
        </a>
      </div>

      <div ref={hintRef} className="absolute bottom-10 right-6 z-10 md:right-16">
        <span className="font-mono-label text-[10px] text-white/40">DESLIZE PARA INICIALIZAR</span>
      </div>
    </SectionShell>
  );
}

function HeroMobile() {
  return (
    <MobileChapter
      id="carregamento"
      image={SUIT_IMG}
      alt="Operador NEXUS com o traje tático completo ativado."
      index="01 / 04"
      title={<>VESTIR<br />O TERNO.</>}
      body="O sinal começa por baixo da armadura."
      cta={
        <a
          href="#equipamento"
          className="font-mono-label mt-2 inline-block w-fit border border-cyan/50 px-6 py-3 text-[11px] text-cyan"
        >
          ENTRE NA ARENA
        </a>
      }
    />
  );
}

export default function HeroSection({ mobile }) {
  return mobile ? <HeroMobile /> : <HeroDesktop />;
}
