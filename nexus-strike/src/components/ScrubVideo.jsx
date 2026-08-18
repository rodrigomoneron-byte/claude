import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

/**
 * A muted, inline video whose playhead is driven entirely by scroll
 * position (via the imperative `setProgress` handle) rather than
 * autoplaying. Falls back to a static poster image if the source fails
 * to load — the same visual state used for prefers-reduced-motion.
 */
const ScrubVideo = forwardRef(function ScrubVideo(
  { src, poster, alt, className = '', style },
  ref
) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      setProgress(p) {
        const v = videoRef.current;
        if (!v || !ready || !Number.isFinite(v.duration) || v.duration === 0) return;
        const clamped = Math.min(0.999, Math.max(0, p));
        v.currentTime = clamped * v.duration;
      },
      isReady: () => ready && !failed,
    }),
    [ready, failed]
  );

  if (failed) {
    return (
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        className={className}
        style={style}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={alt}
      tabIndex={-1}
      onLoadedMetadata={() => setReady(true)}
      onError={() => setFailed(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
});

export default ScrubVideo;
