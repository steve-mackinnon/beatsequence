import { sequencerEngine } from "../engine";
import type { RootState, AppDispatch } from "../store";
import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
} from "@reduxjs/toolkit";
import {
  mute,
  unmute,
  setGeneratorParam,
  loadTracks,
  toggleSolo,
} from "../reducers/tracksSlice";

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
      state.tracks[action.payload.trackId]
    );
  },
});

tracksListenerMiddleware.startListening({
  actionCreator: unmute,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.setTrackState(
      action.payload.trackId,
      state.tracks[action.payload.trackId]
    );
  },
});

tracksListenerMiddleware.startListening({
  actionCreator: setGeneratorParam,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.setTrackState(
      action.payload.trackId,
      state.tracks[action.payload.trackId]
    );
  },
});

tracksListenerMiddleware.startListening({
  actionCreator: loadTracks,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    state.tracks.forEach((trackState, index: number) => {
      sequencerEngine.setTrackState(index, trackState);
    });
  },
});

tracksListenerMiddleware.startListening({
  actionCreator: toggleSolo,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.setTrackState(
      action.payload.trackId,
      state.tracks[action.payload.trackId]
    );
  },
});
