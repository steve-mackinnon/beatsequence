import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import seedrandom from "seedrandom";
import { sequencerEngine } from "../engine";
import { DEFAULT_PATTERN } from "../entities/pattern";
import { Step, generateRandomNote } from "../entities/step";
import { rotateStepsLeft, rotateStepsRight } from "../entities/stepRotator";
export interface StepInfo {
  trackId: number;
  stepIndex: number;
}

interface SetParamPayload {
  paramId: string;
  trackId: number;
  stepIndex: number;
  value: number | string;
}

interface SequencerMacroPayload {
  trackId: number;
}

interface RandomizePayload {
  trackId: number | undefined; // undefined is used to specify all tracks
  seed: string;
}

// Pass the initial state to the sequencer engine
DEFAULT_PATTERN.steps.forEach((steps: Step[], trackIndex: number) => {
  steps.forEach((step: Step, stepIndex: number) => {
    sequencerEngine.setStepState(trackIndex, stepIndex, step);
  });
});

export const stepsSlice = createSlice({
  name: "steps",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: DEFAULT_PATTERN.steps,
  reducers: {
    enable: (state, action: PayloadAction<StepInfo>) => {
      state[action.payload.trackId][action.payload.stepIndex].enabled = true;
    },
    disable: (state, action: PayloadAction<StepInfo>) => {
      state[action.payload.trackId][action.payload.stepIndex].enabled = false;
    },
    setParam: (state, action: PayloadAction<SetParamPayload>) => {
      // TODO: this assumes that the param is always coarse pitch
      const step = state[action.payload.trackId][action.payload.stepIndex];
      if (typeof action.payload.value === "number") {
        throw new Error("setParam only supports string values in stepsSlice");
      }
      step.note = action.payload.value;
    },
    twoOnTheFloor: (state, action: PayloadAction<SequencerMacroPayload>) => {
      state[action.payload.trackId].forEach((step: Step, stepIndex: number) => {
        const enabled = stepIndex === 4 || stepIndex === 12;
        step.enabled = enabled;
      });
    },
    fourOnTheFloor: (state, action: PayloadAction<SequencerMacroPayload>) => {
      state[action.payload.trackId].forEach((step: Step, stepIndex: number) => {
        const enabled = stepIndex === 0 || stepIndex % 4 === 0;
        step.enabled = enabled;
      });
    },
    randomize: (state, action: PayloadAction<RandomizePayload>) => {
      const rng = seedrandom(action.payload.seed);
      state.forEach((trackSteps: Step[], trackIndex: number) => {
        if (
          action.payload.trackId == null ||
          trackIndex === action.payload.trackId
        ) {
          trackSteps.forEach((step: Step, stepIndex: number) => {
            step.enabled = rng.quick() > 0.5;
            step.note = generateRandomNote(rng);
          });
        }
      });
    },
    fillAllSteps: (state, action: PayloadAction<SequencerMacroPayload>) => {
      state[action.payload.trackId].forEach((step: Step) => {
        step.enabled = true;
      });
    },
    loadSteps: (state, action: PayloadAction<Step[][]>) => {
      action.payload.forEach((trackSteps: Step[], trackIndex: number) => {
        trackSteps.forEach((step: Step, stepIndex: number) => {
          state[trackIndex][stepIndex] = step;
        });
      });
    },
    rotateLeft: (state, action: PayloadAction<SequencerMacroPayload>) => {
      state[action.payload.trackId] = rotateStepsLeft(
        state[action.payload.trackId]
      );
    },
    rotateRight: (state, action: PayloadAction<SequencerMacroPayload>) => {
      state[action.payload.trackId] = rotateStepsRight(
        state[action.payload.trackId]
      );
    },
  },
  extraReducers: {
    "song/newProject": (state, _) => {
      DEFAULT_PATTERN.steps.forEach((steps: Step[], trackIndex: number) => {
        steps.forEach((step: Step, stepIndex: number) => {
          state[trackIndex][stepIndex] = step;
        });
      });
    },
  },
});

export const {
  enable,
  disable,
  setParam,
  twoOnTheFloor,
  fourOnTheFloor,
  randomize,
  fillAllSteps,
  loadSteps,
  rotateLeft,
  rotateRight,
} = stepsSlice.actions;

export default stepsSlice.reducer;
