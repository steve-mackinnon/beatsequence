import { createListenerMiddleware } from "@reduxjs/toolkit";
import { togglePlayback, adjustTempo } from "./song";
import { RootState } from "../../store";
import { audioEngine, sequencerEngine } from "../../engine";

export const songListenerMiddleware = createListenerMiddleware();

songListenerMiddleware.startListening({
  actionCreator: togglePlayback,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    audioEngine.playing = state.persistedReducer.song.playing;
  },
});

songListenerMiddleware.startListening({
  actionCreator: adjustTempo,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.tempo = state.persistedReducer.song.tempo;
  },
});
