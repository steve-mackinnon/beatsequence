import { CommonParams } from "../../entities/commonParams";
import { Gain, AmplitudeEnvelope, Filter, Noise, ToneAudioNode } from "tone";
import { Generator } from "../generator";

export class HiHat implements Generator {
  private readonly _gain: Gain;
  private readonly _ampEnv: AmplitudeEnvelope;
  private readonly _lpf: Filter;
  private readonly _hpf: Filter;
  private readonly _noise: Noise;

  constructor(destination: ToneAudioNode) {
    this._gain = new Gain(0.5).connect(destination);
    this._ampEnv = new AmplitudeEnvelope({
      attack: 0.01,
      decay: 0.1,
      sustain: 0,
      release: 0.05,
      decayCurve: "exponential",
    }).connect(this._gain);
    this._lpf = new Filter({
      frequency: 14000,
      type: "lowpass",
    });
    this._hpf = new Filter({
      frequency: 4400,
      type: "highpass",
    });
    this._noise = new Noise("white");
    this._noise.connect(this._hpf).connect(this._lpf).connect(this._ampEnv);
  }

  trigger(time: number, params: CommonParams): void {
    this._gain.set({
      gain: params.gain,
    });
    this._ampEnv.decay = params.decayTime;
    this._noise.start(time, 0, params.decayTime);
    this._ampEnv.triggerAttackRelease(params.decayTime, time);
  }
}
