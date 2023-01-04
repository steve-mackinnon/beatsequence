import { Track } from "./track";

export function shouldTrackBeMuted(track: Track, allTracks: Track[]): boolean {
  const soloedTracks = allTracks.filter((t) => t.soloed);
  if (soloedTracks.length === 0) {
    return track.muted;
  }
  return !soloedTracks.includes(track) || track.muted;
}
