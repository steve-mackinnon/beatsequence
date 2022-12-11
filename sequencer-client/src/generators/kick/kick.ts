import { CommonParams } from "../commonParams";
import {
  Gain,
  AmplitudeEnvelope,
  Filter,
  Oscillator,
  FrequencyEnvelope,
} from "tone";

export interface KickParams extends CommonParams {
  decayTime: number;
  transientTime: number;
  gain: number;
}

export function makeKick(startTime: number, parameters: KickParams): void {
  const gain = new Gain(parameters.gain).toDestination();
  const ampLong = new AmplitudeEnvelope({
    attack: 0.001,
    decay: parameters.decayTime,
    sustain: 0.0,
    release: 0.05,
  }).connect(gain);
  const ampShort = new AmplitudeEnvelope({
    attack: 0.001,
    decay: parameters.transientTime + 0.5,
    sustain: 0.0,
    release: 0.01,
    decayCurve: "exponential",
  }).connect(gain);
  const filter = new Filter({
    frequency: 300 * (1 + parameters.transientTime),
    type: "lowpass",
    Q: 10,
  });
  const filterShort = new Filter({
    frequency: "F0",
    type: "lowpass",
    Q: 12,
  });
  const oscLong = new Oscillator({
    frequency: 60.0,
    type: "sine",
  });
  const oscShort = new Oscillator({
    frequency: 200.0,
    type: "triangle",
  });

  const frequencyShort = new FrequencyEnvelope({
    baseFrequency: "F0",
    octaves: 1,
    attack: 0.001,
    decay: parameters.transientTime,
    sustain: 0.0,
    release: 0.01,
  });
  frequencyShort.connect(oscShort.frequency);
  frequencyShort.connect(filterShort.frequency);

  oscLong
    .connect(filter)
    .connect(ampLong)
    .start(startTime)
    .stop(startTime + parameters.decayTime);

  oscShort
    .connect(filterShort)
    .connect(ampShort)
    .start(startTime)
    .stop(startTime + parameters.decayTime);
  ampLong.triggerAttackRelease(parameters.decayTime, startTime);
  ampShort.triggerAttackRelease(parameters.decayTime, startTime);
}
