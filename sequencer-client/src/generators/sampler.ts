import { CommonParams } from "../entities/commonParams";
import { Generator } from "./generator";
import { Gain, Sampler as ToneSampler, ToneAudioNode } from "tone";

export class Sampler implements Generator {
  private readonly _gain: Gain;
  private readonly _sampler: ToneSampler;

  constructor(destination: ToneAudioNode, c3Sample: AudioBuffer) {
    this._gain = new Gain(1.0).connect(destination);
    this._sampler = new ToneSampler({
      C3: c3Sample,
    }).connect(this._gain);
  }

  trigger(startTime: number, params: CommonParams): void {
    this._gain.set({
      gain: params.gain,
    });
    this._sampler.triggerAttackRelease("C3", params.decayTime, startTime);
  }
}
