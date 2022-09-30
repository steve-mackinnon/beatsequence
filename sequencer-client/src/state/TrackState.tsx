import { MakeStep } from "./StepState";
import { RecoilState } from "recoil";
import { StepState } from "../audio/SequencerEngine";

const NUM_STEPS = 16;

export interface Track {
  steps: StepState[];
}

export default class TrackState {
  steps: Array<RecoilState<StepState>>;

  constructor() {
    this.steps = new Array<RecoilState<StepState>>();
    for (const i of Array(NUM_STEPS).keys()) {
      this.steps.push(MakeStep(i.toString(), i));
    }
  }
}

export const globalTrackState = new TrackState();
