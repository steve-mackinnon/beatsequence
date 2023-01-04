import { Step } from "./step";
import { NUM_DEFAULT_TRACKS } from "./track";

export interface Pattern {
  name: string;
  steps: Step[][];
}

const NUM_DEFAULT_STEPS = 16;

export const DEFAULT_PATTERN: Pattern = {
  name: "Init",
  steps: (() => {
    const steps = new Array<Step[]>();
    for (let trackIndex = 0; trackIndex < NUM_DEFAULT_TRACKS; ++trackIndex) {
      steps.push(new Array<Step>());
      for (let stepIndex = 0; stepIndex < NUM_DEFAULT_STEPS; ++stepIndex) {
        steps[trackIndex].push({
          enabled: false,
          note: "C3",
        });
      }
    }
    return steps;
  })(),
};
