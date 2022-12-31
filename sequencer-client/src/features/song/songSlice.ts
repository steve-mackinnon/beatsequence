import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../entities/song";

export const initialState: Song = {
  tempo: 127.0,
  name: "Untitled",
  playing: false,
};

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
  initialState,
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
    loadProject: (song, action: PayloadAction<LoadProjectPayload>) => {
      song.id = action.payload.project.id;
      song.name = action.payload.project.name;
      song.tempo = action.payload.project.tempo;
    },
    projectSavedAs: (song, action: PayloadAction<Song>) => {
      song.id = action.payload.id;
      song.name = action.payload.name;
      song.tempo = action.payload.tempo;
    },
    newProject: (song, _) => {
      song = {
        name: "New Project",
        tempo: 127,
        playing: false,
      };
    },
  },
});

export const {
  togglePlayback,
  shutDownAudioEngine,
  setParam,
  loadProject,
  newProject,
  projectSavedAs,
} = songSlice.actions;
export default songSlice.reducer;
