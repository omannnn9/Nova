/**
 * True when the device asks for, or likely needs, a lighter experience: Data Saver is on,
 * or the CPU / memory is very limited. WebGL atmosphere is skipped in that case; the CSS
 * lighting (horizon glow, light from above) still renders, so the design holds without it.
 */
export function prefersLiteEffects(): boolean {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return true;
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) return true;
  if (nav.deviceMemory && nav.deviceMemory <= 2) return true;
  return false;
}
