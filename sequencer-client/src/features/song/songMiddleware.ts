import { createListenerMiddleware } from "@reduxjs/toolkit";
import { togglePlayback } from "./song";
import { RootState } from "../../store";
import { audioEngine } from "../../engine";

export const songListenerMiddleware = createListenerMiddleware();

songListenerMiddleware.startListening({
  actionCreator: togglePlayback,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    audioEngine.playing = state.song.playing;
  },
});
