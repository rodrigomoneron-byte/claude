import { useCallback, useRef, useState } from 'react';
import { gsap } from '../lib/smoothScroll';
import { mapRange } from '../lib/mapRange';
import SectionShell from '../components/SectionShell';
import ScrubVideo from '../components/ScrubVideo';
import MobileChapter from '../components/MobileChapter';

const STATIC_IMG = '/media/sistemas/Armored_gauntlet_and_recon_device_202608141841.jpeg';
const SYSTEMS_VIDEO = '/media/sistemas/sistemas.mp4';

const PHRASES = [
  { label: 'INTENÇÃO TÁTICA', threshold: 0.4 },
  { label: 'RESPOSTA CINÉTICA', threshold: 0.6 },
  { label: 'SINAL SILENCIOSO', threshold: 0.8 },
];

function sameFlags(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function PhraseRow({ label, active }) {
  return (
    <div className="relative flex items-center gap-4 py-3">
      <span
        className="h-px bg-cyan transition-transform duration-700 ease-cinematic"
        style={{ width: 40, transform: `scaleX(${active ? 1 : 0})`, transformOrigin: 'left', boxShadow: '0 0 6px #00F0FF' }}
      />
      <span className="relative font-display text-lg tracking-wide text-white/85 md:text-xl" style={{ opacity: active ? 1 : 0.25 }}>
        {label}
        {active && (
          <span
            aria-hidden="true"
            className="absolute -left-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet"
            style={{ animation: 'nexusPulse 0.9s cubic-bezier(0.16,1,0.3,1) 1' }}
          />
        )}
      </span>
    </div>
  );
}

function SystemsDesktop() {
  const videoStackRef = useRef(null);
  const videoHandleRef = useRef(null);
  const introRef = useRef(null);
  const [activeFlags, setActiveFlags] = useState([false, false, false]);

  const handleProgress = useCallback((p) => {
    const videoOpacity = mapRange(p, 0.28, 0.42);
    if (videoStackRef.current) gsap.set(videoStackRef.current, { opacity: videoOpacity });
    if (videoHandleRef.current && p >= 0.3) {
      videoHandleRef.current.setProgress(mapRange(p, 0.3, 1));
    }

    const next = PHRASES.map((ph) => p >= ph.threshold);
    setActiveFlags((prev) => (sameFlags(prev, next) ? prev : next));

    if (introRef.current) {
      gsap.set(introRef.current, { opacity: mapRange(p, 0, 0.1) });
    }
  }, []);

  return (
    <SectionShell id="sistemas" heightMultiplier={3.6} onProgress={handleProgress}>
      <div className="absolute inset-0 flex items-center justify-center bg-void">
        <img
          src={STATIC_IMG}
          alt="Manopla blindada e dispositivo de reconhecimento NEXUS em estado inativo."
          className="h-full w-full object-contain"
        />
        <div ref={videoStackRef} className="absolute inset-0" style={{ opacity: 0 }}>
          <ScrubVideo
            ref={videoHandleRef}
            src={SYSTEMS_VIDEO}
            poster={STATIC_IMG}
            alt="Manopla e dispositivo de reconhecimento NEXUS transitando do estado inativo para o ativado."
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(90deg, transparent 40%, rgba(10,10,18,0.2) 65%, rgba(10,10,18,0.7) 100%)' }}
      />

      <div ref={introRef} className="absolute left-6 top-16 z-10 max-w-md md:left-16">
        <span className="font-mono-label block text-[11px] text-cyan">03 / 04</span>
        <h2 className="font-display mt-5 text-5xl leading-[0.98] text-white md:text-6xl">
          PRECISÃO
          <br />
          <span className="text-violet">/ EM MOVIMENTO.</span>
        </h2>
      </div>

      <div className="absolute bottom-28 right-6 z-10 flex flex-col items-end md:right-16">
        {PHRASES.map((ph, i) => (
          <PhraseRow key={ph.label} label={ph.label} active={activeFlags[i]} />
        ))}
      </div>

      <div className="absolute bottom-10 right-6 z-10 flex gap-6 md:right-16">
        <span className="font-mono-label text-[10px] text-white/40">SINAL: BLOQUEADO</span>
        <span className="font-mono-label text-[10px] text-white/40">RESPOSTA: 0,04S</span>
        <span className="font-mono-label text-[10px] text-cyan">STATUS: ONLINE</span>
      </div>
    </SectionShell>
  );
}

function SystemsMobile() {
  return (
    <MobileChapter
      id="sistemas"
      image={STATIC_IMG}
      alt="Manopla blindada e dispositivo de reconhecimento NEXUS."
      index="03 / 04"
      title={<>PRECISÃO<br />/ EM MOVIMENTO.</>}
      status="SINAL: BLOQUEADO   RESPOSTA: 0,04S   STATUS: ONLINE"
    >
      <ul className="mt-2 flex flex-col gap-3">
        {PHRASES.map((ph) => (
          <li key={ph.label} className="font-display flex items-center gap-3 text-lg text-white/85">
            <span className="h-px w-8 bg-cyan" />
            {ph.label}
          </li>
        ))}
      </ul>
    </MobileChapter>
  );
}

export default function SystemsSection({ mobile }) {
  return mobile ? <SystemsMobile /> : <SystemsDesktop />;
}
