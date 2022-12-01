import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sequencerEngine } from "../../engine";
import { GeneratorType } from "./GeneratorType";
import { RootState } from "../../store";
import { AnyGeneratorParams, KickParams } from "../../generators";

export interface TrackState {
  id: number;
  muted: boolean;
  generatorType: GeneratorType;
  generatorParams: AnyGeneratorParams;
  displayName: string;
  paramViewVisible: boolean;
}

export interface ParamInfo {
  name: string;
  displayName: string;
  min: number;
  max: number;
  logScale: boolean;
  valueSelector: (state: RootState, trackId: number) => number;
}

function getDecayTimeParamInfo(trackId: number): ParamInfo {
  return {
    name: "decayTime",
    displayName: "Decay",
    min: 0.0001,
    max: 2.0,
    logScale: true,
    valueSelector: (state: RootState, trackId: number) =>
      state.tracks[trackId].generatorParams.decayTime,
  };
}

function getGainParamInfo(trackId: number): ParamInfo {
  return {
    name: "gain",
    displayName: "Gain",
    min: 0.0,
    max: 2.0,
    logScale: false,
    valueSelector: (state: RootState, trackId: number) =>
      state.tracks[trackId].generatorParams.gain,
  };
}

function getCommonParamsForTrack(trackId: number): ParamInfo[] {
  return [getGainParamInfo(trackId), getDecayTimeParamInfo(trackId)];
}

export function paramInfoForGeneratorType(
  generatorType: GeneratorType
): ParamInfo[] {
  switch (generatorType) {
    case GeneratorType.Kick:
      return getCommonParamsForTrack(GeneratorType.Kick).concat({
        name: "transientTime",
        displayName: "Punch",
        min: 0.01,
        max: 0.4,
        logScale: false,
        valueSelector: (state: RootState, trackId: number) => {
          const kickParams = state.tracks[trackId]
            .generatorParams as KickParams;
          return kickParams.transientTime;
        },
      });
    case GeneratorType.Snare:
      return getCommonParamsForTrack(GeneratorType.Snare);
    case GeneratorType.ClosedHH:
      return getCommonParamsForTrack(GeneratorType.ClosedHH);
    case GeneratorType.SineBleep:
      return getCommonParamsForTrack(GeneratorType.SineBleep);
    case GeneratorType.SquareBleep:
      return getCommonParamsForTrack(GeneratorType.SquareBleep);
  }
}

function generatorTypeForTrackIndex(trackIndex: number): GeneratorType {
  return trackIndex;
}

export function defaultNameForGeneratorType(
  generatorType: GeneratorType
): string {
  switch (generatorType) {
    case GeneratorType.Kick:
      return "Kick";
    case GeneratorType.Snare:
      return "Snare";
    case GeneratorType.ClosedHH:
      return "CH";
    case GeneratorType.SineBleep:
      return "Sine Pluck";
    case GeneratorType.SquareBleep:
      return "Square Pluck";
  }
}

function decayTimeForGeneratorType(generatorType: GeneratorType): number {
  switch (generatorType) {
    case GeneratorType.Kick:
      return 0.2;
    case GeneratorType.Snare:
      return 0.12;
    case GeneratorType.ClosedHH:
      return 0.03;
    case GeneratorType.SineBleep:
      return 0.18;
    case GeneratorType.SquareBleep:
      return 0.18;
  }
}

export const INITIAL_NUM_TRACKS = 5;

export const initialState: TrackState[] = new Array<TrackState>();
for (let index = 0; index < INITIAL_NUM_TRACKS; ++index) {
  const generatorType = generatorTypeForTrackIndex(index);
  const generatorParams = {
    decayTime: decayTimeForGeneratorType(generatorType),
    gain: 1.0,
    transientTime: 0.1,
  };

  initialState.push({
    id: index,
    muted: false,
    generatorType,
    generatorParams,
    displayName: defaultNameForGeneratorType(generatorType),
    paramViewVisible: false,
  });
}

initialState.forEach((trackState: TrackState) => {
  sequencerEngine.setTrackState(trackState.id, trackState);
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

export const tracksSlice = createSlice({
  name: "tracks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    mute: (state, action: PayloadAction<TrackInfo>) => {
      state.map((trackState: TrackState) => {
        if (trackState.id === action.payload.trackId) {
          trackState.muted = true;
        }
        return trackState;
      });
    },
    unmute: (state, action: PayloadAction<TrackInfo>) => {
      state.map((trackState: TrackState) => {
        if (trackState.id === action.payload.trackId) {
          trackState.muted = false;
        }
        return trackState;
      });
    },
    setGeneratorParam: (state, action: PayloadAction<TrackParamPayload>) => {
      state.map((trackState: TrackState) => {
        if (trackState.id === action.payload.trackId) {
          const paramId = action.payload.paramId;
          trackState.generatorParams[paramId as keyof AnyGeneratorParams] =
            action.payload.paramValue as number;
        }
        return trackState;
      });
    },
    setDisplayName: (state, action: PayloadAction<SetDisplayNamePayload>) => {
      state.map((trackState: TrackState) => {
        if (trackState.id === action.payload.trackId) {
          trackState.displayName = action.payload.name;
        }
        return trackState;
      });
    },
    toggleParamViewVisibility: (state, action: PayloadAction<TrackInfo>) => {
      state.map((trackState: TrackState) => {
        if (trackState.id === action.payload.trackId) {
          trackState.paramViewVisible = !trackState.paramViewVisible;
        }
        return trackState;
      });
    },
    setTrackStates: (state, action: PayloadAction<TrackState[]>) => {
      return action.payload;
    },
  },
  extraReducers: {
    "song/newProject": (state, _) => {
      initialState.forEach((trackState: TrackState, index: number) => {
        state[index] = trackState;
      });
    },
  },
});

export function selectTrackHasCoarsePitchParam(
  state: RootState,
  trackId: number
): boolean {
  const generatorType = state.tracks[trackId].generatorType;
  switch (generatorType) {
    case GeneratorType.ClosedHH:
    case GeneratorType.Kick:
    case GeneratorType.Snare:
      return false;
    case GeneratorType.SineBleep:
    case GeneratorType.SquareBleep:
      return true;
  }
}

export const {
  mute,
  unmute,
  setGeneratorParam,
  setDisplayName,
  toggleParamViewVisibility,
  setTrackStates,
} = tracksSlice.actions;
export default tracksSlice.reducer;
