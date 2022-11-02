import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedView = "sequencer" | "params";

export interface SongState {
  playing: boolean;
  tempo: number;
  selectedView: SelectedView;
}

const initialState = {
  playing: false,
  tempo: 127.0,
  selectedView: "sequencer",
};

const TEMPO_RANGE = {
  min: 10.0,
  max: 999.0,
};

export interface SelectedViewInfo {
  currentView: SelectedView;
}

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    togglePlayback: (state, _) => {
      state.playing = !state.playing;
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
    setCurrentView: (state, action: PayloadAction<SelectedViewInfo>) => {
      state.selectedView = action.payload.currentView;
    },
  },
});

export const { togglePlayback, adjustTempo, resetState, setCurrentView } =
  songSlice.actions;
export default songSlice.reducer;
