import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SongParams {
  tempo: number;
}

export interface SongState {
  playing: boolean;
  params: SongParams;
  name: string;
  hasBeenSaved: boolean;
}

export const initialState = {
  playing: false,
  params: {
    tempo: 127.0,
  },
  name: "New project",
  hasBeenSaved: false,
};

export interface SongParamPayload {
  paramId: string;
  value: number;
}
export interface SaveAsPayload {
  name: string;
}
export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    togglePlayback: (state, _) => {
      state.playing = !state.playing;
    },
    shutDownAudioEngine: (state, _) => {
      state.playing = false;
    },
    setParam: (state, action: PayloadAction<SongParamPayload>) => {
      if (state.params[action.payload.paramId as keyof SongParams] == null) {
        console.log(
          `Attempting to set song param ${action.payload.paramId} which does not exist`
        );
        return;
      }
      state.params[action.payload.paramId as keyof SongParams] =
        action.payload.value;
    },
    resetState: (state, action) => {},
    saveAs: (state, action: PayloadAction<SaveAsPayload>) => {
      if (
        action.payload.name.length === 0 ||
        action.payload.name.trim().length === 0
      ) {
        console.log(
          "Invalid project name. Length must be greater than zero and contain non-space charaters."
        );
        state.hasBeenSaved = false;
        return;
      }
      state.name = action.payload.name;
      state.hasBeenSaved = true;
    },
  },
});

export const {
  togglePlayback,
  shutDownAudioEngine,
  resetState,
  setParam,
  saveAs,
} = songSlice.actions;
export default songSlice.reducer;
