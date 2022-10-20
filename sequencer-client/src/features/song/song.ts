import { createSlice } from "@reduxjs/toolkit";

export interface SongState {
  playing: boolean;
}

const initialState = {
  playing: false,
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    togglePlayback: (state, _) => {
      state.playing = !state.playing;
    },
  },
});

export const { togglePlayback } = songSlice.actions;
export default songSlice.reducer;
