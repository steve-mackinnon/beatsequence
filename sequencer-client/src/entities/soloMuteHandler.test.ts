import { Track } from "./track";
import { GeneratorType } from "./generatorType";
import { shouldTrackBeMuted } from "./soloMuteHandler";

describe("no soloed tracks", () => {
  const track1 = new Track(GeneratorType.ClosedHH);
  const track2 = new Track(GeneratorType.Kick);
  const allTracks = [track1, track2];
  track1.soloed = false;
  track1.muted = false;
  track2.soloed = false;
  track2.muted = true;
  test("unmuted track remains unmuted", () => {
    expect(shouldTrackBeMuted(track1, allTracks)).toBe(false);
  });
  test("muted track remains unmuted", () => {
    expect(shouldTrackBeMuted(track2, allTracks)).toBe(true);
  });
});

describe("one soloed track", () => {
  const track1 = new Track(GeneratorType.ClosedHH);
  const track2 = new Track(GeneratorType.Kick);
  const allTracks = [track1, track2];
  track1.soloed = true;
  track1.muted = false;
  track2.soloed = false;
  track2.muted = false;
  test("soloed track is not muted", () => {
    expect(shouldTrackBeMuted(track1, allTracks)).toBe(false);
  });
  test("unsoloed track is muted", () => {
    expect(shouldTrackBeMuted(track2, allTracks)).toBe(true);
  });
});

describe("multiple soloed tracks", () => {
  const track1 = new Track(GeneratorType.ClosedHH);
  const track2 = new Track(GeneratorType.Kick);
  const track3 = new Track(GeneratorType.SineBleep);
  const allTracks = [track1, track2, track3];
  track1.soloed = true;
  track1.muted = false;
  track2.soloed = true;
  track2.muted = false;
  track3.soloed = false;
  track3.muted = false;
  test("soloed tracks are not muted", () => {
    expect(shouldTrackBeMuted(track1, allTracks)).toBe(false);
    expect(shouldTrackBeMuted(track2, allTracks)).toBe(false);
  });
  test("unsoloed track is muted", () => {
    expect(shouldTrackBeMuted(track3, allTracks)).toBe(true);
  });
});
