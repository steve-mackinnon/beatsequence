export enum GeneratorType {
  Kick,
  Snare,
  ClosedHH,
  SineBleep,
  SquareBleep,
  Sampler,
}

export function generatorHasPitchControls(generator: GeneratorType): boolean {
  switch (generator) {
    case GeneratorType.ClosedHH:
    case GeneratorType.Kick:
    case GeneratorType.Snare:
      return false;
    case GeneratorType.SineBleep:
    case GeneratorType.SquareBleep:
    case GeneratorType.Sampler:
      return true;
  }
}
