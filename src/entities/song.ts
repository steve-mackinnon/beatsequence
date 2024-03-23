import { MusicalScale } from "./musicalScale";

export interface Song {
  id?: string;
  name: string;
  tempo: number;
  playing: boolean;
  scale: MusicalScale;
}

export const DEFAULT_SONG: Song = {
  name: "Untitled",
  tempo: 127.0,
  playing: false,
  scale: { rootNote: "C", type: "Chromatic" },
};
export function hasBeenSaved(song: Song): boolean {
  return song.id != null;
}
