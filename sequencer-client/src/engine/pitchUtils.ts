/**
 *
 * @param semitone is an offset from C3
 * @returns the value in Hz
 *
 */
export function semitoneToHz(semitone: number): number {
  // Source: https://pages.mtu.edu/~suits/NoteFreqCalcs.html
  // fn = f0 * (a)^n
  // where
  // f0 = the frequency of one fixed note which must be defined - we use A4 at 440 Hz.
  // n = the number of half steps away from the fixed note you are.
  //     If you are at a higher note, n is positive. If you are on a lower note, n is negative.
  // fn = the frequency of the note n half steps away.
  return 440.0 * Math.pow(1.059463094359, semitone);
}
