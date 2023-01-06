import { Step, extractNoteAndOctave } from "./step";
import { Note, NOTES } from "./note";

export type ScaleType = "major" | "minor" | "chromatic";
export const SCALE_TYPES: ScaleType[] = ["major", "minor", "chromatic"];

export interface MusicalScale {
  rootNote: Note;
  type: ScaleType;
}

const MINOR_SCALE_INDICES = [0, 2, 3, 5, 7, 8, 10];
const MAJOR_SCALE_INDICES = [0, 2, 4, 5, 7, 9, 11];
const CHROMATIC_SCALE_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function getScaleNotes(rootNote: Note, scaleType: ScaleType): Note[] {
  const rootNoteIndex = NOTES.indexOf(rootNote);
  let scaleIndices: number[];
  switch (scaleType) {
    case "major":
      scaleIndices = MAJOR_SCALE_INDICES;
      break;
    case "minor":
      scaleIndices = MINOR_SCALE_INDICES;
      break;
    case "chromatic":
      scaleIndices = CHROMATIC_SCALE_INDICES;
      break;
  }
  return scaleIndices.map((index) => {
    const noteIndex = (rootNoteIndex + index) % 12;
    return NOTES[noteIndex];
  });
}

export function GetNotesForScale(scale: MusicalScale): Note[] {
  return getScaleNotes(scale.rootNote, scale.type);
}

export function snapStepToScale(step: Step, scale: Note[]): Step {
  const { note, octave } = extractNoteAndOctave(step.note);
  const noteIndex = scale.indexOf(note);
  if (noteIndex !== -1) {
    return step;
  }
  const chromaticIndex = NOTES.indexOf(note);
  let closestNoteDistance = 12;
  let closestNoteIndex = 0;
  for (let noteIndex = 0; noteIndex < scale.length; noteIndex++) {
    const scaleNote = scale[noteIndex];
    const scaleNoteChromaticIndex = NOTES.indexOf(scaleNote);
    const distance = Math.abs(scaleNoteChromaticIndex - chromaticIndex);
    if (distance < closestNoteDistance) {
      closestNoteDistance = distance;
      closestNoteIndex = noteIndex;
      if (distance === 1) {
        break;
      }
    }
  }
  return {
    ...step,
    note: `${scale[closestNoteIndex]}${octave}`,
  };
}
