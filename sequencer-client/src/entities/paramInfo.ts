import { KickParams } from "../generators";
import { RootState } from "../store"; // TODO: Don't depend on store here
import { GeneratorType } from "./generatorType";

export interface ParamInfo {
  name: string;
  displayName: string;
  min: number;
  max: number;
  logScale: boolean;
  valueSelector: (state: RootState, trackId: number) => number;
}

function getDecayTimeParamInfo(trackId: number): ParamInfo {
  return {
    name: "decayTime",
    displayName: "Decay",
    min: 0.0001,
    max: 2.0,
    logScale: true,
    valueSelector: (state: RootState, trackId: number) =>
      state.tracks[trackId].generatorParams.decayTime,
  };
}

function getGainParamInfo(trackId: number): ParamInfo {
  return {
    name: "gain",
    displayName: "Gain",
    min: 0.0,
    max: 2.0,
    logScale: false,
    valueSelector: (state: RootState, trackId: number) =>
      state.tracks[trackId].generatorParams.gain,
  };
}

function getTriggerProbabilityParamInfo(trackId: number): ParamInfo {
  return {
    name: "triggerProbability",
    displayName: "Chance",
    min: 0.0,
    max: 100.0,
    logScale: false,
    valueSelector: (state: RootState, trackId: number) =>
      state.tracks[trackId].generatorParams.triggerProbability,
  };
}

function getCommonParamsForTrack(trackId: number): ParamInfo[] {
  return [
    getGainParamInfo(trackId),
    getDecayTimeParamInfo(trackId),
    getTriggerProbabilityParamInfo(trackId),
  ];
}

export function paramInfoForGeneratorType(
  generatorType: GeneratorType
): ParamInfo[] {
  switch (generatorType) {
    case GeneratorType.Kick:
      return getCommonParamsForTrack(GeneratorType.Kick).concat({
        name: "transientTime",
        displayName: "Punch",
        min: 0.01,
        max: 0.4,
        logScale: false,
        valueSelector: (state: RootState, trackId: number) => {
          const kickParams = state.tracks[trackId]
            .generatorParams as KickParams;
          return kickParams.transientTime;
        },
      });
    case GeneratorType.Snare:
      return getCommonParamsForTrack(GeneratorType.Snare);
    case GeneratorType.ClosedHH:
      return getCommonParamsForTrack(GeneratorType.ClosedHH);
    case GeneratorType.SineBleep:
      return getCommonParamsForTrack(GeneratorType.SineBleep);
    case GeneratorType.SquareBleep:
      return getCommonParamsForTrack(GeneratorType.SquareBleep);
  }
}
