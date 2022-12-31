import { DEFAULT_TRACKS, Track } from "./track";
import { DEFAULT_PATTERN, Pattern } from "./pattern";

export interface Song {
  id?: string;
  name: string;
  tempo: number;
  playing: boolean;
  tracks: Track[];
  pattern: Pattern;
}

export const DEFAULT_SONG: Song = {
  name: "New Project",
  tempo: 127.0,
  playing: false,
  tracks: DEFAULT_TRACKS,
  pattern: DEFAULT_PATTERN,
};
export function hasBeenSaved(song: Song): boolean {
  return song.id != null;
}
