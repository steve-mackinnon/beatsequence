import { GeneratorType } from "./generatorType";
import { CommonParams } from "./commonParams";
import { KickParams } from "../generators";

export interface Track {
  muted: boolean;
  generatorType: GeneratorType;
  generatorParams: CommonParams;
  displayName: string;
  paramViewVisible: boolean;
  soloed: boolean;
}

export function MakeTrack(generatorType: GeneratorType): Track {
  return {
    muted: false,
    generatorType,
    generatorParams: generatorParamsForGeneratorType(generatorType),
    displayName: defaultNameForGeneratorType(generatorType),
    paramViewVisible: false,
    soloed: false,
  };
}

export const NUM_DEFAULT_TRACKS = 5;

function generatorTypeForTrackIndex(trackIndex: number): GeneratorType {
  return trackIndex;
}

function generatorParamsForGeneratorType(
  generatorType: GeneratorType
): CommonParams {
  const params: CommonParams = {
    decayTime: decayTimeForGeneratorType(generatorType),
    gain: gainForGeneratorType(generatorType),
    triggerProbability: 100.0,
  };
  if (generatorType === GeneratorType.Kick) {
    (params as KickParams).transientTime = 0.3;
  }
  return params;
}
export function defaultNameForGeneratorType(
  generatorType: GeneratorType
): string {
  switch (generatorType) {
    case GeneratorType.Kick:
      return "Kick";
    case GeneratorType.Snare:
      return "Snare";
    case GeneratorType.ClosedHH:
      return "CH";
    case GeneratorType.SineBleep:
      return "Sine Pluck";
    case GeneratorType.SquareBleep:
      return "Square Pluck";
  }
}

function decayTimeForGeneratorType(generatorType: GeneratorType): number {
  switch (generatorType) {
    case GeneratorType.Kick:
      return 0.4;
    case GeneratorType.Snare:
      return 0.2;
    case GeneratorType.ClosedHH:
      return 0.03;
    case GeneratorType.SineBleep:
      return 0.26;
    case GeneratorType.SquareBleep:
      return 0.12;
  }
}

function gainForGeneratorType(generatorType: GeneratorType): number {
  switch (generatorType) {
    case GeneratorType.Kick:
      return 1.0;
    case GeneratorType.Snare:
      return 1.2;
    case GeneratorType.ClosedHH:
      return 0.8;
    case GeneratorType.SineBleep:
      return 1.2;
    case GeneratorType.SquareBleep:
      return 1.2;
  }
}

export const DEFAULT_TRACKS: Track[] = (() => {
  const tracks = new Array<Track>();
  for (let index = 0; index < NUM_DEFAULT_TRACKS; ++index) {
    const generatorType = generatorTypeForTrackIndex(index);
    tracks.push(MakeTrack(generatorType));
  }
  return tracks;
})();
