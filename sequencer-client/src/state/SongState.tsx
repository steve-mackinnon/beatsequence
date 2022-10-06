import { MakeStep } from "./StepState";
import { RecoilState } from "recoil";
import { StepState } from "../audio/SequencerEngine";
import { sequencerEngine } from "./AudioEngineState";
import { TrackState } from "../model/TrackState";
import { MakeTrackStateAtom } from "./TrackState";

const NUM_STEPS = 16;

export default class SongState {
  private readonly _steps: Array<Array<RecoilState<StepState>>>;
  private readonly _trackStates: Array<RecoilState<TrackState>>;

  constructor() {
    this._steps = new Array<Array<RecoilState<StepState>>>(
      sequencerEngine.numTracks
    );
    this._trackStates = new Array<RecoilState<TrackState>>(
      sequencerEngine.numTracks
    );
    for (const trackIndex of this._steps.keys()) {
      this._trackStates[trackIndex] = MakeTrackStateAtom(trackIndex);
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

  getTrackStateAtom(trackIndex: number): RecoilState<TrackState> {
    return this._trackStates[trackIndex];
  }

  setStepState(
    trackIndex: number,
    stepIndex: number,
    newState: StepState
  ): void {}
}

export const songState = new SongState();
