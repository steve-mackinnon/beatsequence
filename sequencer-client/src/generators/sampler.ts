import { CommonParams } from "../entities/commonParams";
import { Generator } from "./generator";
import { Gain, Sampler as ToneSampler, ToneAudioNode } from "tone";

export class Sampler implements Generator {
  private readonly _gain: Gain;
  private readonly _sampler: ToneSampler;

  constructor(destination: ToneAudioNode) {
    this._gain = new Gain(1.0).connect(destination);
    this._sampler = new ToneSampler().connect(this._gain);
  }

  trigger(startTime: number, params: CommonParams): void {
    this._gain.set({
      gain: params.gain,
    });
    this._sampler.triggerAttackRelease(60.0, params.decayTime, startTime);
  }
}
