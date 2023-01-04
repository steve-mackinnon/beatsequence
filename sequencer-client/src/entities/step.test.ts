import { pitchOffsetToNoteName, noteNameToPitchOffset, noteToHz } from "./step";

describe("map coarse pitch to note name", () => {
  test("0 pitch offest maps to C3", () => {
    expect(pitchOffsetToNoteName(0)).toEqual("C3");
  });
  test("12 pitch offset maps to C4", () => {
    expect(pitchOffsetToNoteName(12)).toEqual("C4");
  });
  test("-12 pitch offset maps to C2", () => {
    expect(pitchOffsetToNoteName(-12)).toEqual("C2");
  });
  test("1 pitch offset maps to C#3", () => {
    expect(pitchOffsetToNoteName(1)).toEqual("C#3");
  });
  test("13 pitch offset maps to C#4", () => {
    expect(pitchOffsetToNoteName(13)).toEqual("C#4");
  });
  test("2 pitch offset maps to D3", () => {
    expect(pitchOffsetToNoteName(2)).toEqual("D3");
  });
});

describe("map note name to pitch offset", () => {
  test("C3 maps to 0 pitch offset", () => {
    expect(noteNameToPitchOffset("C3")).toEqual(0);
  });
  test("C4 maps to 12 pitch offset", () => {
    expect(noteNameToPitchOffset("C4")).toEqual(12);
  });
  test("C2 maps to -12 pitch offset", () => {
    expect(noteNameToPitchOffset("C2")).toEqual(-12);
  });
  test("C#3 maps to 1 pitch offset", () => {
    expect(noteNameToPitchOffset("C#3")).toEqual(1);
  });
  test("C#4 maps to 13 pitch offset", () => {
    expect(noteNameToPitchOffset("C#4")).toEqual(13);
  });
  test("D3 maps to 2 pitch offset", () => {
    expect(noteNameToPitchOffset("D3")).toEqual(2);
  });
});

describe("note to Hz", () => {
  test("A4 is 440 Hz", () => {
    expect(noteToHz("A4")).toBeCloseTo(440);
  });
  test("A#4 is 466.16 Hz", () => {
    expect(noteToHz("A#4")).toBeCloseTo(466.16);
  });
  test("G1 is 49.00 Hz", () => {
    expect(noteToHz("G1")).toBeCloseTo(49);
  });
});
