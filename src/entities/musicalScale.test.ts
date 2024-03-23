import { snapStepToScale, GetNotesForScale } from "./musicalScale";

describe("make a scale", () => {
  test("C major equals C D E F G A B", () => {
    expect(GetNotesForScale({ rootNote: "C", type: "Major" })).toEqual([
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "B",
    ]);
  });
  test("A minor equals A B C D E F G", () => {
    expect(GetNotesForScale({ rootNote: "A", type: "Minor" })).toEqual([
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
    ]);
  });
  test("G chromatic equals G G# A A# B C C# D D# E F F#", () => {
    expect(GetNotesForScale({ rootNote: "G", type: "Chromatic" })).toEqual([
      "G",
      "G#",
      "A",
      "A#",
      "B",
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
    ]);
  });
});

describe("snap step to a scale", () => {
  test("snap to C major", () => {
    const scale = GetNotesForScale({ rootNote: "C", type: "Major" });
    expect(
      snapStepToScale(
        {
          enabled: true,
          note: "C#4",
        },
        scale
      )
    ).toEqual({
      enabled: true,
      note: "C4",
    });
    expect(snapStepToScale({ enabled: true, note: "D#4" }, scale)).toEqual({
      enabled: true,
      note: "D4",
    });
    expect(snapStepToScale({ enabled: true, note: "D4" }, scale)).toEqual({
      enabled: true,
      note: "D4",
    });
  });
  test("snap to E minor", () => {
    const scale = GetNotesForScale({ rootNote: "E", type: "Minor" });
    expect(snapStepToScale({ enabled: true, note: "F4" }, scale)).toEqual({
      enabled: true,
      note: "E4",
    });
    expect(snapStepToScale({ enabled: true, note: "D#4" }, scale)).toEqual({
      enabled: true,
      note: "E4",
    });
  });
});
