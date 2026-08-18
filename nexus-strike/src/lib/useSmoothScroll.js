import { useEffect } from 'react';
import { startSmoothScroll, stopSmoothScroll, ScrollTrigger } from './smoothScroll';

/**
 * Enables Lenis + ScrollTrigger sync only on desktop / non-reduced-motion.
 * Mobile and reduced-motion visitors get plain native scroll, matching the
 * "clean stacked vertical experience" fallback required for those cases.
 */
export function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    startSmoothScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      stopSmoothScroll();
    };
  }, [enabled]);
}
