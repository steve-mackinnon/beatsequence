import { MakeStep, Step } from "./StepState";
import { RecoilState } from "recoil";

const NUM_STEPS = 16;

export interface Track {
  steps: Step[];
}

export default class TrackState {
  steps: Array<RecoilState<Step>>;

  constructor() {
    this.steps = new Array<RecoilState<Step>>();
    for (const i of Array(NUM_STEPS).keys()) {
      this.steps.push(MakeStep(i.toString()));
    }
  }
}

export const globalTrackState = new TrackState();
