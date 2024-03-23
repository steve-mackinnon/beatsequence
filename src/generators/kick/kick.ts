import { CommonParams } from "../../entities/commonParams";
import { Generator } from "../generator";
import { Gain, ToneAudioNode, MembraneSynth } from "tone";

export interface KickParams extends CommonParams {
  decayTime: number;
  transientTime: number;
  gain: number;
}

export class Kick implements Generator {
  private readonly _gain: Gain;
  private readonly _membraneSynth: MembraneSynth;

  constructor(destination: ToneAudioNode) {
    this._gain = new Gain(1.0).connect(destination);
    this._membraneSynth = new MembraneSynth({
      octaves: 2,
      pitchDecay: 0.05,
      envelope: {
        attack: 0.001,
        decay: 0.2,
        release: 0.05,
        sustain: 0.0,
      },
    }).connect(this._gain);
  }

  trigger(startTime: number, params: CommonParams): void {
    this._gain.set({
      gain: params.gain,
    });
    const parameters = params as KickParams;
    this._membraneSynth.set({
      envelope: {
        decay: parameters.decayTime,
      },
      pitchDecay: parameters.transientTime * 0.15,
      octaves: 1.5 + parameters.transientTime * 1.5,
    });
    this._membraneSynth.triggerAttackRelease(
      60.0,
      parameters.decayTime,
      startTime
    );
  }
}
