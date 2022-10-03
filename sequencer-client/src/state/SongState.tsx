import { MakeStep } from "./StepState";
import { RecoilState } from "recoil";
import { StepState } from "../audio/SequencerEngine";
import { sequencerEngine } from "./AudioEngineState";

const NUM_STEPS = 16;
const NUM_TRACKS = 5;

export default class SongState {
  private readonly _steps: Array<Array<RecoilState<StepState>>>;

  constructor(numTracks: number) {
    sequencerEngine.setNumTracks(numTracks);
    this._steps = new Array<Array<RecoilState<StepState>>>(numTracks);
    for (const trackIndex of this._steps.keys()) {
      this._steps[trackIndex] = new Array<RecoilState<StepState>>(NUM_STEPS);
      for (const stepIndex of this._steps[trackIndex].keys()) {
        this._steps[trackIndex][stepIndex] = MakeStep(trackIndex, stepIndex);
      }
    }
  }

  getStepState(trackIndex: number, stepIndex: number): RecoilState<StepState> {
    return this._steps[trackIndex][stepIndex];
  }

  getStepsForTrack(trackIndex: number): Array<RecoilState<StepState>> {
    return this._steps[trackIndex];
  }

  getNumTracks(): number {
    return this._steps.length;
  }
}

export const songState = new SongState(NUM_TRACKS);
