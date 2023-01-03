export enum GeneratorType {
  Kick,
  Snare,
  ClosedHH,
  SineBleep,
  SquareBleep,
}

export function generatorHasPitchControls(generator: GeneratorType): boolean {
  switch (generator) {
    case GeneratorType.ClosedHH:
    case GeneratorType.Kick:
    case GeneratorType.Snare:
      return false;
    case GeneratorType.SineBleep:
    case GeneratorType.SquareBleep:
      return true;
  }
}
