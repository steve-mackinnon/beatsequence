import { atom, RecoilState } from "recoil";
import { sequencerEngine } from "./AudioEngineState";
import { StepState } from "../audio/SequencerEngine";

export interface StepInfo {
  trackIndex: number;
  stepIndex: number;
}

export function MakeStep(
  trackIndex: number,
  stepIndex: number
): RecoilState<StepState> {
  return atom<StepState>({
    key: `T${trackIndex}S${stepIndex}`,
    default: {
      active: true,
      coarsePitch: 24,
    },
    effects: [
      ({ onSet, setSelf, trigger }) => {
        if (trigger === "get") {
          // Initialize the atom by fetching the correct StepState from
          // sequencerEngine to intiailize.
          setSelf(sequencerEngine.getStepState(trackIndex, stepIndex));
        }
        // Forward StepState changes over to the sequencerEngine
        onSet((stepState: StepState) => {
          sequencerEngine.setStepState(trackIndex, stepIndex, stepState);
        });
      },
    ],
  });
}
