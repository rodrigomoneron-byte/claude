import { useCallback, useRef, useState } from 'react';
import { gsap } from '../lib/smoothScroll';
import { mapRange } from '../lib/mapRange';
import SectionShell from '../components/SectionShell';
import ScrubVideo from '../components/ScrubVideo';
import TechLabel from '../components/TechLabel';
import MobileChapter from '../components/MobileChapter';

const EXPLODED_IMG = '/media/loadout/loadout-exploded.jpeg';
const RIFLE_A_IMG = '/media/loadout/Futuristic_rifle_exploded_techni.jpeg';
const RIFLE_B_IMG = '/media/loadout/Futuristic_rifle_exploded_techni_2K_202608142226.jpeg';
const RIFLE_VIDEO = '/media/loadout/arma_explodida.mp4';

const LABEL_THRESHOLDS = [0.16, 0.42, 0.66];

function sameFlags(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function LoadoutDesktop() {
  const layerARef = useRef(null); // rifle A crossfades in over exploded
  const layerBRef = useRef(null); // rifle B crossfades in over A
  const videoStackRef = useRef(null);
  const videoHandleRef = useRef(null);
  const introRef = useRef(null);
  const [activeLabels, setActiveLabels] = useState([false, false, false]);

  const handleProgress = useCallback((p) => {
    if (layerARef.current) gsap.set(layerARef.current, { opacity: mapRange(p, 0.22, 0.46) });
    if (layerBRef.current) gsap.set(layerBRef.current, { opacity: mapRange(p, 0.46, 0.7) });

    const videoOpacity = mapRange(p, 0.7, 0.86);
    if (videoStackRef.current) gsap.set(videoStackRef.current, { opacity: videoOpacity });
    if (videoHandleRef.current && p >= 0.72) {
      videoHandleRef.current.setProgress(mapRange(p, 0.72, 1));
    }

    const nextFlags = LABEL_THRESHOLDS.map((t) => p >= t);
    setActiveLabels((prev) => (sameFlags(prev, nextFlags) ? prev : nextFlags));

    if (introRef.current) {
      gsap.set(introRef.current, { opacity: 1 - mapRange(p, 0.86, 1) });
    }
  }, []);

  return (
    <SectionShell id="equipamento" heightMultiplier={3.8} onProgress={handleProgress}>
      <div className="absolute inset-0 flex items-center justify-center bg-void">
        <img
          src={EXPLODED_IMG}
          alt="Vista explodida completa do carregamento tático NEXUS."
          className="h-full w-full object-contain"
        />
        <img
          ref={layerARef}
          src={RIFLE_A_IMG}
          alt="Rifle futurista NEXUS em vista explodida técnica, primeira revisão."
          className="absolute inset-0 h-full w-full object-contain"
          style={{ opacity: 0 }}
        />
        <img
          ref={layerBRef}
          src={RIFLE_B_IMG}
          alt="Rifle futurista NEXUS em vista explodida técnica, renderização 2K."
          className="absolute inset-0 h-full w-full object-contain"
          style={{ opacity: 0 }}
        />
        <div ref={videoStackRef} className="absolute inset-0" style={{ opacity: 0 }}>
          <ScrubVideo
            ref={videoHandleRef}
            src={RIFLE_VIDEO}
            poster={RIFLE_B_IMG}
            alt="Rifle NEXUS passando do estado intacto para a vista explodida completa."
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div ref={introRef} className="pointer-events-none absolute inset-x-0 top-16 z-10 px-6 md:px-16">
        <span className="font-mono-label block text-[11px] text-cyan">02 / 04</span>
        <h2 className="font-display mt-5 max-w-xl text-5xl leading-[0.98] text-white md:text-6xl">
          FEITO PARA
          <br />
          <span className="text-violet">/ IMPACTO.</span>
        </h2>
        <p className="mt-5 max-w-sm font-body text-sm font-light leading-relaxed text-white/70">
          Cada componente é projetado para o instante anterior ao impacto.
        </p>
      </div>

      <TechLabel
        label="RECEPTOR MODULAR"
        side="left"
        active={activeLabels[0]}
        className="left-[15%] bottom-[16%]"
      />
      <TechLabel
        label="ÓPTICA DE SINAL"
        side="right"
        active={activeLabels[1]}
        className="right-[8%] top-[20%]"
      />
      <TechLabel
        label="NÚCLEO CINÉTICO"
        side="right"
        active={activeLabels[2]}
        className="right-[15%] bottom-[16%]"
      />
    </SectionShell>
  );
}

function LoadoutMobile() {
  return (
    <MobileChapter
      id="equipamento"
      image={RIFLE_B_IMG}
      alt="Rifle NEXUS em vista explodida técnica completa."
      index="02 / 04"
      title={<>FEITO PARA<br />/ IMPACTO.</>}
      body="Cada componente é projetado para o instante anterior ao impacto."
    >
      <ul className="mt-2 flex flex-col gap-2">
        {['RECEPTOR MODULAR', 'ÓPTICA DE SINAL', 'NÚCLEO CINÉTICO'].map((label) => (
          <li key={label} className="font-mono-label flex items-center gap-3 text-[10px] text-cyan/90">
            <span className="h-px w-8 bg-cyan" />
            {label}
          </li>
        ))}
      </ul>
    </MobileChapter>
  );
}

export default function LoadoutSection({ mobile }) {
  return mobile ? <LoadoutMobile /> : <LoadoutDesktop />;
}
