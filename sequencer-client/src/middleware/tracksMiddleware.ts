import { audioEngine, sequencerEngine } from "../engine";
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
  loadSample,
} from "../reducers/tracksSlice";
import { sampleManager } from "../engine/sampleManager";

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

tracksListenerMiddleware.startListening({
  actionCreator: loadSample,
  effect: async (action, listenerApi) => {
    const rawAudioFile = sampleManager.getRawFile(action.payload.sampleId);
    if (rawAudioFile == null) {
      console.log("Could not find sample!");
      return;
    }
    const decodedAudio = await audioEngine.decodeAudioFileData(rawAudioFile);
    sampleManager.addSample(action.payload.sampleId, decodedAudio);
    const state = listenerApi.getState() as RootState;
    sequencerEngine.setTrackState(
      action.payload.trackId,
      state.tracks[action.payload.trackId]
    );
  },
});
