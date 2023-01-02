import { Song } from "./song";
import { Pattern } from "./pattern";
import { Track } from "./track";

export type ProjectId = string;
export interface Project {
  song: Song;
  pattern: Pattern;
  tracks: Track[];
}
