import { CommonParams } from "../commonParams";
import { AmplitudeEnvelope, Oscillator, Gain } from "tone";

export interface OscParams extends CommonParams {
  decayTime: number;
  gain: number;
  osc_type: OscillatorType;
}

export function makeBleep(
  startTime: number,
  frequency: number,
  parameters: OscParams
): void {
  const gain = new Gain(parameters.gain).toDestination();
  const decayTime = parameters.decayTime;
  const ampEnv = new AmplitudeEnvelope({
    attack: 0.01,
    decay: decayTime,
    sustain: 0,
    release: 0.05,
  }).connect(gain);
  const osc = new Oscillator(frequency, parameters.osc_type).connect(ampEnv);
  osc
    .connect(ampEnv)
    .start(startTime)
    .stop(startTime + parameters.decayTime);

  ampEnv.triggerAttackRelease(parameters.decayTime, startTime);
}
