import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
} from "@reduxjs/toolkit";
import {
  enable,
  disable,
  setParam,
  twoOnTheFloor,
  fourOnTheFloor,
  randomize,
  StepInfo,
  fillAllSteps,
  loadSteps,
  rotateLeft,
  rotateRight,
} from "../reducers/stepsSlice";
import { sequencerEngine } from "../engine";
import type { RootState, AppDispatch } from "../store";
import { Step } from "../entities/step";

export const stepsListenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

function sendStepStateToSequencerEngine(
  stepInfo: StepInfo,
  steps: Step[][]
): void {
  sequencerEngine.setStepState(
    stepInfo.trackId,
    stepInfo.stepIndex,
    steps[stepInfo.trackId][stepInfo.stepIndex]
  );
}

function sendAllStepStatesToSequencerEngineForTrack(
  trackId: number,
  steps: Step[][]
): void {
  steps[trackId].forEach((step: Step, stepIndex: number) => {
    sequencerEngine.setStepState(trackId, stepIndex, step);
  });
}

function sendAllStepStatesToSequencerEngine(steps: Step[][]): void {
  steps.forEach((trackSteps: Step[], trackIndex: number) => {
    trackSteps.forEach((step: Step, stepIndex: number) => {
      sequencerEngine.setStepState(trackIndex, stepIndex, step);
    });
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
  actionCreator: setParam,
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
      state.steps.forEach((trackSteps: Step[], trackIndex: number) => {
        trackSteps.forEach((step: Step, stepIndex: number) => {
          sequencerEngine.setStepState(trackIndex, stepIndex, step);
        });
      });
    } else {
      sendAllStepStatesToSequencerEngineForTrack(
        action.payload.trackId,
        state.steps
      );
    }
  },
});

stepsListenerMiddleware.startListening({
  actionCreator: loadSteps,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sendAllStepStatesToSequencerEngine(state.steps);
  },
});

stepsListenerMiddleware.startListening({
  actionCreator: rotateLeft,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sendAllStepStatesToSequencerEngineForTrack(
      action.payload.trackId,
      state.steps
    );
  },
});

stepsListenerMiddleware.startListening({
  actionCreator: rotateRight,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    sendAllStepStatesToSequencerEngineForTrack(
      action.payload.trackId,
      state.steps
    );
  },
});
