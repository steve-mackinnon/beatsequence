export interface Song {
  id?: string;
  name: string;
  tempo: number;
  playing: boolean;
}

export const DEFAULT_SONG: Song = {
  name: "Untitled",
  tempo: 127.0,
  playing: false,
};
export function hasBeenSaved(song: Song): boolean {
  return song.id != null;
}
