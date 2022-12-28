import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  togglePlayback,
  setParam,
  shutDownAudioEngine,
  loadProject,
  newProject,
} from "./song";
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
    const newParams = { ...sequencerEngine.params };
    newParams.tempo = action.payload.value;
    sequencerEngine.params = newParams;
  },
});

songListenerMiddleware.startListening({
  actionCreator: loadProject,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.params.tempo = state.song.params.tempo;
  },
});

songListenerMiddleware.startListening({
  actionCreator: newProject,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.params.tempo = state.song.params.tempo;
    state.steps.forEach((stepState: StepState) => {
      sequencerEngine.setStepState(
        stepState.trackId,
        stepState.stepIndex,
        stepState
      );
    });
  },
});
