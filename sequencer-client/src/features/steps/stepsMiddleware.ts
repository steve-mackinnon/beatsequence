import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
} from "@reduxjs/toolkit";
import {
  StepState,
  enable,
  disable,
  setCoarsePitch,
  stepStateForTrackAndStep,
  twoOnTheFloor,
  fourOnTheFloor,
  randomize,
  StepInfo,
  fillAllSteps,
} from "./steps";
import { sequencerEngine } from "../../engine";
import type { RootState, AppDispatch } from "../../store";

export const stepsListenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

function sendStepStateToSequencerEngine(
  stepInfo: StepInfo,
  steps: StepState[]
): void {
  const stepState = stepStateForTrackAndStep(
    stepInfo.trackId,
    stepInfo.stepIndex,
    steps
  );
  sequencerEngine.setStepState(
    stepState.trackId,
    stepState.stepIndex,
    stepState
  );
}

function sendAllStepStatesToSequencerEngineForTrack(
  trackId: number,
  steps: StepState[]
): void {
  steps.forEach((stepState: StepState) => {
    if (stepState.trackId === trackId) {
      sequencerEngine.setStepState(
        stepState.trackId,
        stepState.stepIndex,
        stepState
      );
    }
  });
}

stepsListenerMiddleware.startListening({
  actionCreator: enable,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sendStepStateToSequencerEngine(action.payload, state.steps);
  },
});

stepsListenerMiddleware.startListening({
  actionCreator: disable,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sendStepStateToSequencerEngine(action.payload, state.steps);
  },
});

stepsListenerMiddleware.startListening({
  actionCreator: setCoarsePitch,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sendStepStateToSequencerEngine(action.payload, state.steps);
  },
});

const actionsToUpdateAllSteps = [twoOnTheFloor, fourOnTheFloor, fillAllSteps];
actionsToUpdateAllSteps.forEach((action: any) => {
  stepsListenerMiddleware.startListening({
    actionCreator: action,
    effect: (action, listenerApi) => {
      const state = listenerApi.getState() as RootState;
      sendAllStepStatesToSequencerEngineForTrack(
        action.payload.trackId,
        state.steps
      );
    },
  });
});

stepsListenerMiddleware.startListening({
  actionCreator: randomize,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    if (action.payload.trackId === undefined) {
      // Update all steps
      state.steps.forEach((step: StepState) => {
        sequencerEngine.setStepState(step.trackId, step.stepIndex, step);
      });
    } else {
      sendAllStepStatesToSequencerEngineForTrack(
        action.payload.trackId,
        state.steps
      );
    }
  },
});
