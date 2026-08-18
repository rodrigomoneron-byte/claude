import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../data/chapters';

export default function Nav() {
  const [dimmed, setDimmed] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setDimmed(window.scrollY > window.innerHeight * 0.6);
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event, href) => {
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    const lenis = window.__nexusLenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 top-0 z-40 flex flex-nowrap items-center justify-between px-4 py-4 transition-opacity duration-700 ease-cinematic sm:px-6 sm:py-5 md:px-10"
      style={{ opacity: dimmed ? 0.45 : 1 }}
    >
      <a
        href="#topo"
        className="font-display whitespace-nowrap text-xs tracking-[0.15em] text-white/90 transition-colors hover:text-cyan sm:text-sm sm:tracking-widest2"
      >
        NEXUS <span className="text-cyan">//</span> STRIKE
      </a>
      <ul className="flex flex-nowrap items-center gap-3 sm:gap-6 md:gap-10">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={activeHref === link.href ? 'true' : undefined}
              className="font-mono-label whitespace-nowrap text-[8px] tracking-[0.15em] text-white/60 transition-colors hover:text-cyan sm:text-[10px] sm:tracking-[0.3em] md:text-[11px]"
              style={activeHref === link.href ? { color: '#00F0FF' } : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
