export interface Song {
  id?: string;
  name: string;
  tempo: number;
  playing: boolean;
}

export function hasBeenSaved(song: Song): boolean {
  return song.id != null;
}
