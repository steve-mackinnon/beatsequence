import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sequencerEngine } from "../engine";
import { generatorHasPitchControls } from "../entities/generatorType";
import { RootState } from "../store";
import { CommonParams } from "../entities/commonParams";
import { Track, DEFAULT_TRACKS } from "../entities/track";
import { shouldTrackBeMuted } from "../entities/soloMuteHandler";

DEFAULT_TRACKS.forEach((trackState: Track, index: number) => {
  sequencerEngine.setTrackState(index, trackState);
});

export interface TrackInfo {
  trackId: number;
}
export interface TrackParamPayload {
  trackId: number;
  paramId: string;
  paramValue: number | boolean;
}

export interface SetDisplayNamePayload {
  trackId: number;
  name: string;
}

export interface LoadSamplePayload {
  trackId: number;
  sampleId: string;
}

export const tracksSlice = createSlice({
  name: "tracks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: DEFAULT_TRACKS,
  reducers: {
    mute: (state, action: PayloadAction<TrackInfo>) => {
      state[action.payload.trackId].muted = true;
    },
    unmute: (state, action: PayloadAction<TrackInfo>) => {
      state[action.payload.trackId].muted = false;
    },
    toggleSolo: (state, action: PayloadAction<TrackInfo>) => {
      const wasSoloed = state[action.payload.trackId].soloed;
      state[action.payload.trackId].soloed = !wasSoloed;
    },
    setGeneratorParam: (state, action: PayloadAction<TrackParamPayload>) => {
      const paramId = action.payload.paramId;
      state[action.payload.trackId].generatorParams[
        paramId as keyof CommonParams
      ] = action.payload.paramValue as number;
    },
    setDisplayName: (state, action: PayloadAction<SetDisplayNamePayload>) => {
      state[action.payload.trackId].displayName = action.payload.name;
    },
    toggleParamViewVisibility: (state, action: PayloadAction<TrackInfo>) => {
      const wasVisible = state[action.payload.trackId].paramViewVisible;
      state[action.payload.trackId].paramViewVisible = !wasVisible;
    },
    loadTracks: (state, action: PayloadAction<Track[]>) => {
      action.payload.forEach((track: Track, index: number) => {
        state[index] = track;
      });
    },
    loadSample: (state, action: PayloadAction<LoadSamplePayload>) => {
      state[action.payload.trackId].sampleId = action.payload.sampleId;
    },
  },
  extraReducers: {
    "song/newProject": (state, _) => {
      DEFAULT_TRACKS.forEach((trackState: Track, index: number) => {
        state[index] = trackState;
      });
    },
    "song/loadProject": (state, payload) => {
      payload.payload.project.tracks.forEach((track: Track, index: number) => {
        state[index] = track;
      });
    },
  },
});

export function selectTrackHasCoarsePitchParam(
  state: RootState,
  trackId: number
): boolean {
  const generatorType = state.tracks[trackId].generatorType;
  return generatorHasPitchControls(generatorType);
}

export function selectTrackIsEffectivelyMuted(
  state: RootState,
  trackId: number
): boolean {
  const track = state.tracks[trackId];
  return shouldTrackBeMuted(track, state.tracks);
}

export const {
  mute,
  unmute,
  setGeneratorParam,
  setDisplayName,
  toggleParamViewVisibility,
  loadTracks,
  toggleSolo,
  loadSample,
} = tracksSlice.actions;
export default tracksSlice.reducer;
