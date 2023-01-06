import { Note, NOTES } from "./note";
import seedrandom from "seedrandom";

export interface Step {
  enabled: boolean;
  note: string;
}

export function noteNameToPitchOffset(noteName: string): number {
  // Split the note name into its parts
  const { note, octave } = extractNoteAndOctave(noteName);
  const noteIndex = NOTES.indexOf(note);
  // Octave 3 is the octave that contains middle C, so we treat C3 as 0
  return (octave - 3) * 12 + noteIndex;
}

export interface NoteAndOctave {
  note: Note;
  octave: number;
}

export function extractNoteAndOctave(noteName: string): NoteAndOctave {
  const noteNameParts = noteName.split(/(-?[0-9]+)/);
  if (noteNameParts.length < 2) {
    throw new Error("Invalid input note name");
  }
  if (!NOTES.includes(noteNameParts[0])) {
    throw new Error("Invalid input");
  }
  const noteNamePart = noteNameParts[0];
  const octavePart = noteNameParts[1];
  const octave = parseInt(octavePart);
  return {
    note: noteNamePart as Note,
    octave,
  };
}
export function pitchOffsetToNoteName(coarsePitch: number): string {
  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const octave = Math.floor(coarsePitch / 12) + 3;
  const noteIndex =
    coarsePitch < 0 ? (12 + (coarsePitch % 12)) % 12 : coarsePitch % 12;
  const noteName = noteNames[noteIndex];
  return `${noteName}${octave}`;
}

export function generateRandomNote(rng?: seedrandom.PRNG): string {
  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const rng_: seedrandom.PRNG = rng == null ? seedrandom() : rng;
  const octave = Math.floor(rng_.quick() * 3) + 3;
  const noteName = noteNames[Math.floor(rng_.quick() * noteNames.length)];
  return `${noteName}${octave}`;
}

export function noteToHz(note: string): number {
  const a4 = 440;
  const a4Offset = noteNameToPitchOffset("A4");
  const noteOffset = noteNameToPitchOffset(note);
  const semitones = noteOffset - a4Offset;
  return a4 * Math.pow(2, semitones / 12);
}
