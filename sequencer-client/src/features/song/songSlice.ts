import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, DEFAULT_SONG } from "../../entities/song";

export interface SongParamPayload {
  paramId: string;
  value: number;
}
export interface SaveAsPayload {
  name: string;
}
export interface LoadProjectPayload {
  project: Song;
}

export const songSlice = createSlice({
  name: "song",
  initialState: DEFAULT_SONG,
  reducers: {
    togglePlayback: (song, action: PayloadAction<boolean | undefined>) => {
      if (action.payload == null) {
        song.playing = !song.playing;
        return;
      }
      song.playing = action.payload;
    },
    shutDownAudioEngine: (song, _) => {
      song.playing = false;
    },
    setParam: (song, action: PayloadAction<SongParamPayload>) => {
      song.tempo = action.payload.value;
    },
    loadSong: (song, action: PayloadAction<Song>) => {
      song.id = action.payload.id;
      song.name = action.payload.name;
      song.tempo = action.payload.tempo;
    },
    projectSavedAs: (song, action: PayloadAction<Song>) => {
      song.id = action.payload.id;
      song.name = action.payload.name;
      song.tempo = action.payload.tempo;
    },
    newProject: (song, _) => {
      song.name = "New project";
      song.tempo = 127;
      song.playing = false;
    },
  },
});

export const {
  togglePlayback,
  shutDownAudioEngine,
  setParam,
  loadSong,
  newProject,
  projectSavedAs,
} = songSlice.actions;
export default songSlice.reducer;
