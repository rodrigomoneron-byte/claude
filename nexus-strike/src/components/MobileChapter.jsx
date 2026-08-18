/**
 * Mobile / no-pin fallback: a clean, stacked vertical section with a
 * static image (never video, never a scroll-pinned panel) and the same
 * text hierarchy as the desktop chapter, revealed with a simple
 * fade/rise as it enters the viewport.
 */
export default function MobileChapter({ id, image, alt, index, eyebrow, title, body, cta, status, children }) {
  return (
    <section id={id} className="relative flex min-h-[100svh] w-full flex-col justify-end bg-void">
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,18,0.15) 0%, rgba(10,10,18,0.55) 55%, rgba(10,10,18,0.95) 100%)' }}
      />
      <div className="relative z-10 flex flex-col gap-4 px-6 pb-16 pt-24">
        <span className="font-mono-label text-[10px] text-cyan">{index}</span>
        {eyebrow && <span className="font-mono-label text-[10px] text-white/50">{eyebrow}</span>}
        <h2 className="font-display text-4xl leading-[1.05] text-white">{title}</h2>
        {body && <p className="max-w-sm font-body text-sm font-light leading-relaxed text-white/70">{body}</p>}
        {children}
        {cta}
        {status && <p className="font-mono-label text-[10px] text-white/40">{status}</p>}
      </div>
    </section>
  );
}
