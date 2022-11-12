import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface SongState {
  playing: boolean;
  tempo: number;
}

export const initialState = {
  playing: false,
  tempo: 127.0,
};

const TEMPO_RANGE = {
  min: 10.0,
  max: 999.0,
};

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
    adjustTempo: (state, action: PayloadAction<number>) => {
      let tempo = action.payload;
      if (tempo < TEMPO_RANGE.min) {
        tempo = TEMPO_RANGE.min;
      } else if (tempo > TEMPO_RANGE.max) {
        tempo = TEMPO_RANGE.max;
      }
      state.tempo = tempo;
    },
    resetState: (state, action) => {},
  },
});

export const { togglePlayback, shutDownAudioEngine, adjustTempo, resetState } =
  songSlice.actions;
export default songSlice.reducer;
