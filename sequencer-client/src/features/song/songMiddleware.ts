import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  togglePlayback,
  setParam,
  shutDownAudioEngine,
  loadProject,
  newProject,
} from "./songSlice";
import { RootState } from "../../store";
import { audioEngine, sequencerEngine } from "../../engine";
import { StepState } from "../steps/steps";
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
  effect: (action) => {
    sequencerEngine.tempo = action.payload.value;
  },
});

songListenerMiddleware.startListening({
  actionCreator: loadProject,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.tempo = state.song.tempo;
  },
});

songListenerMiddleware.startListening({
  actionCreator: newProject,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.tempo = state.song.tempo;
    state.steps.forEach((stepState: StepState) => {
      sequencerEngine.setStepState(
        stepState.trackId,
        stepState.stepIndex,
        stepState
      );
    });
  },
});
