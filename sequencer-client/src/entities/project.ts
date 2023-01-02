import { Song } from "./song";
import { Pattern } from "./pattern";
import { Track } from "./track";

export interface Project {
  song: Song;
  pattern: Pattern;
  tracks: Track[];
}
