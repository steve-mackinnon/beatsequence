import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sequencerEngine } from "../../engine";
import { GeneratorType } from "../../entities/generatorType";
import { RootState } from "../../store";
import { CommonParams } from "../../entities/commonParams";
import { Track, DEFAULT_TRACKS } from "../../entities/track";

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

export const tracksSlice = createSlice({
  name: "tracks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: DEFAULT_TRACKS,
  reducers: {
    mute: (state, action: PayloadAction<TrackInfo>) => {
      state.map((trackState: Track) => {
        if (trackState.id === action.payload.trackId) {
          trackState.muted = true;
        }
        return trackState;
      });
    },
    unmute: (state, action: PayloadAction<TrackInfo>) => {
      state.map((trackState: Track) => {
        if (trackState.id === action.payload.trackId) {
          trackState.muted = false;
        }
        return trackState;
      });
    },
    setGeneratorParam: (state, action: PayloadAction<TrackParamPayload>) => {
      state.map((trackState: Track) => {
        if (trackState.id === action.payload.trackId) {
          const paramId = action.payload.paramId;
          trackState.generatorParams[paramId as keyof CommonParams] = action
            .payload.paramValue as number;
        }
        return trackState;
      });
    },
    setDisplayName: (state, action: PayloadAction<SetDisplayNamePayload>) => {
      state.map((trackState: Track) => {
        if (trackState.id === action.payload.trackId) {
          trackState.displayName = action.payload.name;
        }
        return trackState;
      });
    },
    toggleParamViewVisibility: (state, action: PayloadAction<TrackInfo>) => {
      state.map((trackState: Track) => {
        if (trackState.id === action.payload.trackId) {
          trackState.paramViewVisible = !trackState.paramViewVisible;
        }
        return trackState;
      });
    },
    setTrackStates: (state, action: PayloadAction<Track[]>) => {
      return action.payload;
    },
  },
  extraReducers: {
    "song/newProject": (state, _) => {
      DEFAULT_TRACKS.forEach((trackState: Track, index: number) => {
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
