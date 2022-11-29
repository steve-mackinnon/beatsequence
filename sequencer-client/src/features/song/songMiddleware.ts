import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  togglePlayback,
  setParam,
  shutDownAudioEngine,
  SongParams,
} from "./song";
import { RootState } from "../../store";
import { audioEngine, sequencerEngine } from "../../engine";
export const songListenerMiddleware = createListenerMiddleware();

songListenerMiddleware.startListening({
  actionCreator: togglePlayback,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    audioEngine.playing = state.song.playing;
  },
});

songListenerMiddleware.startListening({
  actionCreator: shutDownAudioEngine,
  effect: (action, listenerApi) => {
    audioEngine.playing = false;
    void audioEngine.shutDown();
  },
});

songListenerMiddleware.startListening({
  actionCreator: setParam,
  effect: (action, listenerApi) => {
    sequencerEngine.params[action.payload.paramId as keyof SongParams] =
      action.payload.value;
  },
});
