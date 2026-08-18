import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let rafId = null;

/**
 * Wires Lenis smooth scrolling to GSAP's ticker so ScrollTrigger stays in
 * sync with the interpolated scroll position (rather than the raw native
 * scroll event, which would fight Lenis's easing).
 */
export function startSmoothScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.1,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  document.documentElement.classList.add('lenis');
  window.__nexusLenis = lenis;

  return lenis;
}

export function stopSmoothScroll() {
  if (!lenis) return;
  lenis.destroy();
  lenis = null;
  window.__nexusLenis = null;
  document.documentElement.classList.remove('lenis');
  if (rafId) cancelAnimationFrame(rafId);
}

export function getLenis() {
  return lenis;
}

export { gsap, ScrollTrigger };
