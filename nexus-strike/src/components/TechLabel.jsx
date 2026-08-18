/**
 * A minimal HUD-style callout: a thin cyan connector line plus a small
 * mono-spaced technical label. `active` drives both opacity and the
 * line's scale-in, so labels appear progressively as the scroll enters
 * their range instead of all at once.
 */
export default function TechLabel({ label, side = 'left', active, className = '' }) {
  const isLeft = side === 'left';
  return (
    <div
      className={`pointer-events-none absolute flex items-center gap-3 transition-opacity duration-500 ease-cinematic ${className}`}
      style={{ opacity: active ? 1 : 0, flexDirection: isLeft ? 'row' : 'row-reverse' }}
    >
      <span
        className="h-px bg-cyan"
        style={{
          width: 56,
          transform: `scaleX(${active ? 1 : 0})`,
          transformOrigin: isLeft ? 'left' : 'right',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 0 6px #00F0FF',
        }}
      />
      <span className="font-mono-label whitespace-nowrap text-[10px] text-cyan/90">{label}</span>
    </div>
  );
}
