import { useEffect, useRef, useState } from 'react';
import { CHAPTERS } from '../data/chapters';

export default function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(CHAPTERS[0].id);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-0 md:flex lg:right-8"
    >
      <div className="relative h-56 w-px bg-white/10">
        <div
          className="absolute left-0 top-0 w-px bg-cyan transition-[height] duration-150 ease-linear"
          style={{ height: `${progress * 100}%`, boxShadow: '0 0 8px #00F0FF' }}
        />
        {CHAPTERS.map((chapter, i) => (
          <span
            key={chapter.id}
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full border transition-colors duration-300"
            style={{
              top: `${(i / (CHAPTERS.length - 1)) * 100}%`,
              transform: 'translate(-50%, -50%)',
              borderColor: activeId === chapter.id ? '#00F0FF' : 'rgba(255,255,255,0.25)',
              background: activeId === chapter.id ? '#00F0FF' : 'transparent',
              boxShadow: activeId === chapter.id ? '0 0 10px #00F0FF' : 'none',
            }}
          />
        ))}
      </div>
      <span className="mt-4 font-mono-label text-[9px] text-white/40">
        {String(Math.round(progress * 100)).padStart(2, '0')}%
      </span>
    </aside>
  );
}
