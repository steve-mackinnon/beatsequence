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

  constructor(generatorType: GeneratorType) {
    this.generatorType = generatorType;
  }
}
