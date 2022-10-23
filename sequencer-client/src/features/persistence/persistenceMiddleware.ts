import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
} from "@reduxjs/toolkit";
import { sequencerEngine } from "../../engine";
import type { RootState, AppDispatch } from "../../store";
import { StepState } from "../steps/steps";
import { TrackState } from "../tracks/tracks";

export const persistenceMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

persistenceMiddleware.startListening({
  type: "persist/REHYDRATE",
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    state.persistedReducer.steps.forEach((step: StepState) => {
      sequencerEngine.setStepState(step.trackId, step.stepIndex, step);
    });
    state.persistedReducer.tracks.forEach((trackState: TrackState, index) => {
      sequencerEngine.setTrackState(index, trackState);
    });
    sequencerEngine.tempo = state.persistedReducer.song.tempo;
  },
});
