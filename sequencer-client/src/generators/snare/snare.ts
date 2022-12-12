import { CommonParams } from "../commonParams";
import { Gain, AmplitudeEnvelope, Filter, Noise } from "tone";
import { Generator } from "../generator";

export class Snare implements Generator {
  private readonly _gain: Gain;
  private readonly _ampEnv: AmplitudeEnvelope;
  private readonly _lpf: Filter;
  private readonly _hpf: Filter;
  private readonly _noiseOsc: Noise;

  constructor() {
    this._gain = new Gain(1.0).toDestination();
    this._ampEnv = new AmplitudeEnvelope({
      decay: 0.1,
      attack: 0.01,
      release: 0.07,
      sustain: 0.0,
      decayCurve: "exponential",
    }).connect(this._gain);
    this._lpf = new Filter({
      frequency: 10000,
      type: "lowpass",
    });
    this._hpf = new Filter({
      frequency: 7000,
      type: "highpass",
      Q: 12,
    });
    this._noiseOsc = new Noise({
      type: "white",
    });
    this._noiseOsc.connect(this._hpf).connect(this._lpf).connect(this._ampEnv);
  }

  trigger(time: number, params: CommonParams): void {
    this._gain.set({
      gain: params.gain,
    });

    this._ampEnv.decay = params.decayTime;
    this._ampEnv.release = params.decayTime * 0.1;

    this._noiseOsc.start(time, 0, params.decayTime);
    this._ampEnv.triggerAttackRelease(params.decayTime, time);
  }
}
