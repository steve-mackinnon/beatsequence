import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StepInfo {
  trackId: number;
  stepIndex: number;
}

export interface StepState {
  trackId: number;
  stepIndex: number;
  coarsePitch: number;
  enabled: boolean;
}

interface SetPitchPayload {
  trackId: number;
  stepIndex: number;
  coarsePitch: number;
}

interface SequencerMacroPayload {
  trackId: number;
}

// Define the initial state using that type
const INITIAL_NUM_TRACKS = 5;
const INITIAL_NUM_STEPS = 16;
const initialState: StepState[] = new Array<StepState>();
for (let index = 0; index < INITIAL_NUM_TRACKS * INITIAL_NUM_STEPS; ++index) {
  initialState.push({
    coarsePitch: 0,
    enabled: false,
    stepIndex: index % INITIAL_NUM_STEPS,
    trackId: Math.floor(index / INITIAL_NUM_STEPS),
  });
}

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
    setCoarsePitch: (state, action: PayloadAction<SetPitchPayload>) => {
      state.map((step: StepState) => {
        if (
          step.trackId === action.payload.trackId &&
          step.stepIndex === action.payload.stepIndex
        ) {
          step.coarsePitch = action.payload.coarsePitch;
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
  setCoarsePitch,
  twoOnTheFloor,
  fourOnTheFloor,
} = stepsSlice.actions;

export default stepsSlice.reducer;
