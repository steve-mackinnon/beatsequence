import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
} from "@reduxjs/toolkit";
import { audioEngine, sequencerEngine } from "../engine";
import type { RootState, AppDispatch } from "../store";
import { Track, defaultNameForGeneratorType } from "../entities/track";
import { Step } from "../entities/step";

export const persistenceMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

const syncEntireState = (state: RootState): void => {
  audioEngine.playing = false;
  state.steps.forEach((steps: Step[], trackIndex: number) => {
    steps.forEach((step: Step, stepIndex: number) => {
      sequencerEngine.setStepState(trackIndex, stepIndex, step);
    });
  });
  state.tracks.forEach((trackState: Track, index) => {
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
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    syncEntireState(state);
  },
});
