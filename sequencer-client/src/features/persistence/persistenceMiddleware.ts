import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
} from "@reduxjs/toolkit";
import { audioEngine, sequencerEngine } from "../../engine";
import type { RootState, AppDispatch } from "../../store";
import { StepState } from "../steps/steps";
import { TrackState, defaultNameForGeneratorType } from "../tracks/tracks";

export const persistenceMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

const syncEntireState = (state: RootState): void => {
  audioEngine.playing = false;
  state.steps.forEach((step: StepState) => {
    sequencerEngine.setStepState(step.trackId, step.stepIndex, step);
  });
  state.tracks.forEach((trackState: TrackState, index) => {
    if (trackState.displayName == null) {
      trackState.displayName = defaultNameForGeneratorType(
        trackState.generatorType
      );
    }
    sequencerEngine.setTrackState(index, trackState);
  });
  sequencerEngine.tempo = state.song.tempo;
};
persistenceMiddleware.startListening({
  type: "persist/REHYDRATE",
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    syncEntireState(state);
  },
});

persistenceMiddleware.startListening({
  type: "song/resetState",
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    syncEntireState(state);
  },
});
