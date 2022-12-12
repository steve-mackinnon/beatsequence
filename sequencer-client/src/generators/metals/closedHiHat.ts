import { CommonParams } from "../commonParams";
import { Gain, AmplitudeEnvelope, Filter, Noise } from "tone";
import { Generator } from "../generator";

export interface ClosedHHParams extends CommonParams {
  decayTime: number;
  gain: number;
}

export class HiHat implements Generator {
  private readonly _gain: Gain;
  private readonly _ampEnv: AmplitudeEnvelope;
  private readonly _lpf: Filter;
  private readonly _hpf: Filter;
  private readonly _noise: Noise;

  constructor() {
    this._gain = new Gain(0.5).toDestination();
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
    this._noise = new Noise("pink");
    this._noise.connect(this._hpf).connect(this._lpf).connect(this._ampEnv);
  }

  trigger(time: number, params: CommonParams): void {
    this._gain.set({
      gain: params.gain,
    });
    const params_ = params as ClosedHHParams;
    this._noise.start(time, 0, params_.decayTime);
    this._ampEnv.triggerAttackRelease(params_.decayTime, time);
  }
}
