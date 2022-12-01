import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import seedrandom from "seedrandom";
import { INITIAL_NUM_TRACKS } from "../tracks/tracks";
import { sequencerEngine } from "../../engine";

export interface StepInfo {
  trackId: number;
  stepIndex: number;
}

export interface AnyStepParams {
  coarsePitch: number;
}
export interface StepState {
  trackId: number;
  stepIndex: number;
  params: AnyStepParams;
  enabled: boolean;
}

interface SetParamPayload {
  paramId: string;
  trackId: number;
  stepIndex: number;
  value: number;
}

interface SequencerMacroPayload {
  trackId: number;
}

interface RandomizePayload {
  trackId: number | undefined; // undefined is used to specify all tracks
  seed: string;
}

// Define the initial state using that type
const INITIAL_NUM_STEPS = 16;
export const initialState: StepState[] = new Array<StepState>();
for (let index = 0; index < INITIAL_NUM_TRACKS * INITIAL_NUM_STEPS; ++index) {
  initialState.push({
    params: {
      coarsePitch: 0,
    },
    enabled: false,
    stepIndex: index % INITIAL_NUM_STEPS,
    trackId: Math.floor(index / INITIAL_NUM_STEPS),
  });
}

// Pass the initial state to the sequencer engine
initialState.forEach((step: StepState) => {
  sequencerEngine.setStepState(step.trackId, step.stepIndex, step);
});

export const stepsSlice = createSlice({
  name: "steps",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    enable: (state, action: PayloadAction<StepInfo>) => {
      state.map((step: StepState) => {
        if (
          step.trackId === action.payload.trackId &&
          step.stepIndex === action.payload.stepIndex
        ) {
          step.enabled = true;
        }
        return step;
      });
    },
    disable: (state, action: PayloadAction<StepInfo>) => {
      state.map((step: StepState) => {
        if (
          step.trackId === action.payload.trackId &&
          step.stepIndex === action.payload.stepIndex
        ) {
          step.enabled = false;
        }
        return step;
      });
    },
    setParam: (state, action: PayloadAction<SetParamPayload>) => {
      state.map((step: StepState) => {
        if (
          step.trackId === action.payload.trackId &&
          step.stepIndex === action.payload.stepIndex &&
          action.payload.paramId in step.params
        ) {
          step.params[action.payload.paramId as keyof AnyStepParams] =
            action.payload.value;
        }
        return step;
      });
    },
    twoOnTheFloor: (state, action: PayloadAction<SequencerMacroPayload>) => {
      state.map((step: StepState) => {
        if (step.trackId === action.payload.trackId) {
          const enabled = step.stepIndex === 4 || step.stepIndex === 12;
          step.enabled = enabled;
        }
        return step;
      });
    },
    fourOnTheFloor: (state, action: PayloadAction<SequencerMacroPayload>) => {
      state.map((step: StepState) => {
        if (step.trackId === action.payload.trackId) {
          const enabled = step.stepIndex === 0 || step.stepIndex % 4 === 0;
          step.enabled = enabled;
        }
        return step;
      });
    },
    randomize: (state, action: PayloadAction<RandomizePayload>) => {
      const rng = seedrandom(action.payload.seed);
      state.map((step: StepState) => {
        if (
          action.payload.trackId == null ||
          step.trackId === action.payload.trackId
        ) {
          step.enabled = rng.quick() > 0.5;
          step.params.coarsePitch = Math.floor(rng.quick() * (36 * 2) - 36);
        }
        return step;
      });
    },
    fillAllSteps: (state, action: PayloadAction<SequencerMacroPayload>) => {
      state.map((step: StepState) => {
        if (step.trackId === action.payload.trackId) {
          step.enabled = true;
        }
        return step;
      });
    },
    setStepStates: (state, action: PayloadAction<StepState[]>) => {
      return action.payload;
    },
  },
  extraReducers: {
    "song/newProject": (state, _) => {
      initialState.forEach((step: StepState, index: number) => {
        state[index] = step;
      });
    },
  },
});

export function stepStateForTrackAndStep(
  trackId: number,
  stepIndex: number,
  steps: StepState[]
): StepState {
  const step = steps.find(
    (step: StepState) =>
      step.trackId === trackId && step.stepIndex === stepIndex
  );
  if (step == null) {
    throw RangeError(
      `No step found for step index ${stepIndex} and track ID ${trackId}`
    );
  }
  return step;
}

export const {
  enable,
  disable,
  setParam,
  twoOnTheFloor,
  fourOnTheFloor,
  randomize,
  fillAllSteps,
  setStepStates,
} = stepsSlice.actions;

export default stepsSlice.reducer;
