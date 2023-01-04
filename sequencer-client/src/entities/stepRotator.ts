import { Step } from "./step";

export function rotateStepsLeft(steps: Step[]): Step[] {
  const newSteps = new Array<Step>(steps.length);
  for (let i = 0; i < steps.length; ++i) {
    newSteps[i] = steps[(i + 1) % steps.length];
  }
  return newSteps;
}

export function rotateStepsRight(steps: Step[]): Step[] {
  const newSteps = new Array<Step>(steps.length);
  for (let i = 0; i < steps.length; ++i) {
    newSteps[i] = steps[(i + steps.length - 1) % steps.length];
  }
  return newSteps;
}
