import { CommonParams } from "../commonParams";
import { Gain, AmplitudeEnvelope, Filter, Noise } from "tone";

export interface ClosedHHParams extends CommonParams {
  decayTime: number;
  gain: number;
}

export function makeClosedHH(
  startTime: number,
  parameters: ClosedHHParams
): void {
  const gain = new Gain(0.5 * parameters.gain).toDestination();
  const ampEnv = new AmplitudeEnvelope({
    attack: 0.01,
    decay: parameters.decayTime,
    sustain: 0,
    release: 0.05,
    decayCurve: "exponential",
  }).connect(gain);
  const lpf = new Filter({
    frequency: 14000,
    type: "lowpass",
  }).connect(ampEnv);
  const hpf = new Filter({
    frequency: 4400,
    type: "highpass",
  });
  const noise = new Noise("pink");
  noise
    .connect(hpf)
    .connect(lpf)
    .connect(ampEnv)
    .start(startTime)
    .stop(startTime + parameters.decayTime);

  ampEnv.triggerAttackRelease(parameters.decayTime, startTime);
}
