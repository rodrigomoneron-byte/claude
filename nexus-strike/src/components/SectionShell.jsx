import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/smoothScroll';

/**
 * Desktop cinematic chapter shell: pins a full-viewport panel for
 * `heightMultiplier` viewport-heights of scroll while reporting normalized
 * progress (0 -> 1) through `onProgress`, so the section can drive
 * crossfades, clip-path reveals and video scrubbing off one scrub timeline.
 *
 * The pin distance is computed in pixels via a function (re-evaluated on
 * ScrollTrigger.refresh/resize) rather than a "+=Nvh" string — GSAP's
 * relative-offset shorthand only accepts px, so a vh suffix there is
 * silently dropped and the pin ends almost immediately.
 */
export default function SectionShell({ id, heightMultiplier = 3.8, onProgress, children }) {
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id,
        trigger: wrapperRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * heightMultiplier}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => onProgress?.(self.progress),
      });
    }, wrapperRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightMultiplier]);

  return (
    <section id={id} ref={wrapperRef} className="relative">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-void">
        {children}
      </div>
    </section>
  );
}
