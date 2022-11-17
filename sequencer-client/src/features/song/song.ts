import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SongParams {
  tempo: number;
}

export interface SongState {
  playing: boolean;
  params: SongParams;
}

export const initialState = {
  playing: false,
  params: {
    tempo: 127.0,
  },
};

export interface SongParamPayload {
  paramId: string;
  value: number;
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
  },
});

export const { togglePlayback, shutDownAudioEngine, resetState, setParam } =
  songSlice.actions;
export default songSlice.reducer;
