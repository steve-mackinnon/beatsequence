import { MakeMusicalScale, snapStepToScale } from "./musicalScale";
import { Step } from "./step";

describe("make a scale", () => {
  test("C major equals C D E F G A B", () => {
    const scale = MakeMusicalScale("C", "major");
    expect(scale.notes).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
    expect(scale.scaleType).toEqual("major");
    expect(scale.rootNote).toEqual("C");
  });
  test("A minor equals A B C D E F G", () => {
    expect(MakeMusicalScale("A", "minor").notes).toEqual([
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
    expect(MakeMusicalScale("G", "chromatic").notes).toEqual([
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
    const scale = MakeMusicalScale("C", "major");
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
    const scale = MakeMusicalScale("E", "minor");
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
