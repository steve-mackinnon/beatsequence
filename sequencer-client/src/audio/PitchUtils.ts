const REFERENCE_C = 440.0 * Math.pow(2.0, -(9 + 12 * 4) / 12.0);

export function semitoneToHz(semitone: number): number {
  return REFERENCE_C * Math.pow(2.0, semitone / 12.0);
}
