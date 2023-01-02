import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  togglePlayback,
  setParam,
  shutDownAudioEngine,
  loadSong,
  newProject,
} from "./songSlice";
import { RootState } from "../../store";
import { audioEngine, sequencerEngine } from "../../engine";
import { Step } from "../../entities/step";
import { Track } from "../../entities/track";
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
  actionCreator: loadSong,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.tempo = state.song.tempo;
    state.steps.forEach((steps: Step[], trackIndex: number) => {
      steps.forEach((step: Step, stepIndex: number) => {
        sequencerEngine.setStepState(trackIndex, stepIndex, step);
      });
    });
    state.tracks.forEach((track: Track, index: number) => {
      sequencerEngine.setTrackState(index, track);
    });
  },
});

songListenerMiddleware.startListening({
  actionCreator: newProject,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sequencerEngine.tempo = state.song.tempo;
    state.steps.forEach((steps: Step[], trackIndex: number) => {
      steps.forEach((step: Step, stepIndex: number) => {
        sequencerEngine.setStepState(trackIndex, stepIndex, step);
      });
    });
  },
});
