import { rotateStepsLeft, rotateStepsRight } from "./stepRotator";

describe("left rotation", () => {
  const steps = [
    { enabled: true, note: "C3" },
    { enabled: false, note: "C#3" },
    { enabled: false, note: "D4" },
  ];
  const rotatedSteps = rotateStepsLeft(steps);
  test("first step becomes last step", () => {
    expect(rotatedSteps[2]).toEqual(steps[0]);
  });
  test("second step becomes first step", () => {
    expect(rotatedSteps[0]).toEqual(steps[1]);
  });
  test("third step becomes second step", () => {
    expect(rotatedSteps[1]).toEqual(steps[2]);
  });
});

describe("right rotation", () => {
  const steps = [
    { enabled: true, note: "C3" },
    { enabled: false, note: "C#3" },
    { enabled: false, note: "D4" },
  ];
  const rotatedSteps = rotateStepsRight(steps);
  test("first step becomes second step", () => {
    expect(rotatedSteps[1]).toEqual(steps[0]);
  });
  test("second step becomes third step", () => {
    expect(rotatedSteps[2]).toEqual(steps[1]);
  });
  test("third step becomes first step", () => {
    expect(rotatedSteps[0]).toEqual(steps[2]);
  });
});
