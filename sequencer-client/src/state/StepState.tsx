import { atom, RecoilState } from "recoil";
import { sequencerEngine } from "./AudioEngineState";
import { StepState } from "../audio/SequencerEngine";

export interface StepInfo {
  trackIndex: number;
  stepIndex: number;
}

export function MakeStep(key: string, index: number): RecoilState<StepState> {
  return atom<StepState>({
    key,
    default: {
      active: true,
      coarsePitch: 24,
    },
    effects: [
      ({ onSet }) => {
        onSet((stepState: StepState) => {
          sequencerEngine.setStepState(index, stepState);
        });
      },
    ],
  });
}
