import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sequencerEngine } from "../../engine";
import { GeneratorType } from "./GeneratorType";
import { RootState } from "../../store";

export interface TrackState {
  id: number;
  muted: boolean;
  generatorType: GeneratorType;
  generatorParams: any;
  displayName: string;
}

function generatorTypeForTrackIndex(trackIndex: number): GeneratorType {
  return trackIndex;
}

function defaultNameForGeneratorType(generatorType: GeneratorType): string {
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

const initialState: TrackState[] = new Array<TrackState>();
for (let index = 0; index < INITIAL_NUM_TRACKS; ++index) {
  const generatorType = generatorTypeForTrackIndex(index);
  const generatorParams = {
    decay_time: decayTimeForGeneratorType(generatorType),
  };

  initialState.push({
    id: index,
    muted: false,
    generatorType,
    generatorParams,
    displayName: defaultNameForGeneratorType(generatorType),
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
  paramValue: string | number | boolean;
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
          trackState.generatorParams[paramId] = action.payload.paramValue;
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
  },
});

export function selectTrackHasCoarsePitchParam(
  state: RootState,
  trackId: number
): boolean {
  const generatorType = state.persistedReducer.tracks[trackId].generatorType;
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

export const { mute, unmute, setGeneratorParam, setDisplayName } =
  tracksSlice.actions;
export default tracksSlice.reducer;
