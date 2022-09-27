import { atom, RecoilState } from "recoil";

export interface Step {
  active: boolean;
  coarsePitch: number;
}

export interface StepInfo {
  trackIndex: number;
  stepIndex: number;
}

export function MakeStep(key: string): RecoilState<Step> {
  return atom<Step>({
    key,
    default: {
      active: true,
      coarsePitch: 24,
    },
  });
}
