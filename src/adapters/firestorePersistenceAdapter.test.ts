import {
  createProjectPayload,
  extractProjectFromPayload,
} from "./firestorePersistenceAdapter";
import { Step } from "../entities/step";
import { Track } from "../entities/track";
import { GeneratorType } from "../entities/generatorType";
import { Song } from "../entities/song";
import { Project } from "../entities/project";

test("serialize and deserialize", () => {
  const steps = new Array<Step[]>();
  // Populate steps with 2 tracks, each with 16 steps
  for (let trackIndex = 0; trackIndex < 2; ++trackIndex) {
    steps.push(new Array<Step>());
    for (let stepIndex = 0; stepIndex < 16; ++stepIndex) {
      steps[trackIndex].push({
        enabled: true,
        note: "C4",
      });
    }
  }

  const track1: Track = {
    muted: false,
    generatorType: GeneratorType.Kick,
    displayName: "Kick",
    generatorParams: {
      triggerProbability: 100,
      gain: 0.5,
      decayTime: 0.3,
    },
    paramViewVisible: true,
    soloed: false,
  };
  const track2: Track = {
    muted: true,
    generatorType: GeneratorType.SineBleep,
    displayName: "Sine",
    generatorParams: {
      triggerProbability: 60,
      gain: 0.8,
      decayTime: 0.5,
    },
    paramViewVisible: true,
    soloed: true,
  };
  const song: Song = {
    name: "My song",
    tempo: 42,
    playing: false,
    scale: {
      rootNote: "C",
      type: "Chromatic",
    },
  };
  const project: Project = {
    song,
    pattern: {
      name: "Pattern 1",
      steps,
    },
    tracks: [track1, track2],
  };
  const payload = createProjectPayload(project, "123");
  expect(payload.readers).toEqual(["123"]);
  expect(payload.writers).toEqual(["123"]);

  const extractedProject = extractProjectFromPayload(payload);
  expect(extractedProject).toEqual(project);
});

interface StepV1 {
  enabled: boolean;
  params: {
    coarsePitch: number;
  };
  stepIndex: number;
  trackId: number;
}

test("deserialize v1 format", () => {
  const steps = new Array<StepV1>();
  // Populate steps with 2 tracks, each with 16 steps
  for (let trackIndex = 0; trackIndex < 2; ++trackIndex) {
    for (let stepIndex = 0; stepIndex < 16; ++stepIndex) {
      steps.push({
        enabled: true,
        params: {
          coarsePitch: 12,
        },
        stepIndex,
        trackId: trackIndex,
      });
    }
  }
  // Old track format is missing triggerProbability
  const oldTrack: any = {
    id: 1,
    muted: false,
    generatorType: GeneratorType.Kick,
    displayName: "Kick",
    generatorParams: {
      gain: 0.5,
      decayTime: 0.3,
    },
    paramViewVisible: true,
  };

  const oldFormatSong: any = {
    name: "My song",
    song: {
      params: {
        tempo: 68,
      },
      playing: false,
    },
    tracks: [oldTrack],
    steps,
  };
  const deserialized = extractProjectFromPayload(oldFormatSong);

  // New track format has triggerProbability
  expect(deserialized.tracks[0].generatorParams.triggerProbability).toEqual(
    100
  );
  // New step format has coarsePitch
  expect(deserialized.pattern.steps[0][0].note).toEqual("C4");
  // New song format has a C chromatic scale by default
  expect(deserialized.song.scale).toEqual({
    rootNote: "C",
    type: "chromatic",
  });
});

interface StepV2 {
  enabled: boolean;
  coarsePitch: number;
}

test("deserialize v2 format", () => {
  const steps = new Array<StepV2>();
  // Populate steps with 2 tracks, each with 16 steps
  for (let trackIndex = 0; trackIndex < 2; ++trackIndex) {
    for (let stepIndex = 0; stepIndex < 16; ++stepIndex) {
      steps.push({
        enabled: true,
        coarsePitch: 13,
      });
    }
  }
  const track1: Track = {
    muted: false,
    generatorType: GeneratorType.Kick,
    displayName: "Kick",
    generatorParams: {
      triggerProbability: 100,
      gain: 0.5,
      decayTime: 0.3,
    },
    paramViewVisible: true,
    soloed: false,
  };
  const track2: Track = {
    muted: true,
    generatorType: GeneratorType.SineBleep,
    displayName: "Sine",
    generatorParams: {
      triggerProbability: 60,
      gain: 0.8,
      decayTime: 0.5,
    },
    paramViewVisible: true,
    soloed: true,
  };
  const song: any = {
    name: "My song",
    params: {
      tempo: 42,
    },
    playing: false,
  };
  const project: any = {
    song,
    steps,
    tracks: [track1, track2],
  };
  const deserialized = extractProjectFromPayload(project);

  // New step format has coarsePitch
  expect(deserialized.pattern.steps[0][0].note).toEqual("C#4");
});
