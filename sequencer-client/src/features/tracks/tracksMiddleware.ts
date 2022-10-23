import { sequencerEngine } from "../../engine";
import type { RootState, AppDispatch } from "../../store";
import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
} from "@reduxjs/toolkit";
import { mute, unmute, setGeneratorParam } from "./tracks";

export const tracksListenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

tracksListenerMiddleware.startListening({
  actionCreator: mute,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.setTrackState(
      action.payload.trackId,
      state.persistedReducer.tracks[action.payload.trackId]
    );
  },
});

tracksListenerMiddleware.startListening({
  actionCreator: unmute,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.setTrackState(
      action.payload.trackId,
      state.persistedReducer.tracks[action.payload.trackId]
    );
  },
});

tracksListenerMiddleware.startListening({
  actionCreator: setGeneratorParam,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.setTrackState(
      action.payload.trackId,
      state.persistedReducer.tracks[action.payload.trackId]
    );
  },
});
