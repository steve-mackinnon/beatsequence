import { Param } from "./Param";

export enum GeneratorType {
  Kick,
  Snare,
  ClosedHH,
  SineBleep,
  SquareBleep,
}

export class TrackState {
  muted: boolean = false;
  generatorType: GeneratorType;
  generatorParams: Map<string, Param> = new Map<string, Param>();

  constructor(generatorType: GeneratorType) {
    this.generatorType = generatorType;
  }
}
