export function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}

/** Remaps `v` from [inMin, inMax] to [outMin, outMax], clamped to the output range. */
export function mapRange(v, inMin, inMax, outMin = 0, outMax = 1) {
  const t = clamp01((v - inMin) / (inMax - inMin));
  return outMin + t * (outMax - outMin);
}
