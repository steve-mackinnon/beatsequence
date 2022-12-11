import { CommonParams } from "../commonParams";
import { Gain, AmplitudeEnvelope, Filter, Noise } from "tone";

export interface SnareParams extends CommonParams {
  decayTime: number;
  gain: number;
}

export function makeSnare(startTime: number, parameters: SnareParams): void {
  const gain = new Gain(parameters.gain).toDestination();
  const ampEnv = new AmplitudeEnvelope({
    decay: parameters.decayTime,
    attack: 0.01,
    release: 0.07,
    sustain: 0.0,
    decayCurve: "exponential",
  }).connect(gain);
  const lpf = new Filter({
    frequency: 10000,
    type: "lowpass",
  });
  const hpf = new Filter({
    frequency: 7000,
    type: "highpass",
    Q: 12,
  });
  const noise = new Noise({
    type: "white",
  });
  noise
    .connect(hpf)
    .connect(lpf)
    .connect(ampEnv)
    .start(startTime)
    .stop(startTime + parameters.decayTime);
  ampEnv.triggerAttackRelease(parameters.decayTime, startTime);
}
