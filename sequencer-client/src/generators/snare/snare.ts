import { CommonParams } from "../commonParams";
import {
  Gain,
  AmplitudeEnvelope,
  Filter,
  Noise,
  FrequencyEnvelope,
} from "tone";
import { Generator } from "../generator";

export class Snare implements Generator {
  private readonly _gain: Gain;
  private readonly _ampEnv: AmplitudeEnvelope;
  private readonly _lpf: Filter;
  private readonly _hpf: Filter;
  private readonly _noiseOsc: Noise;
  private readonly _noiseHigh: Noise;
  private readonly _lpfHigh: Filter;
  private readonly _ampEnvHigh: AmplitudeEnvelope;
  private readonly _freqEnvHigh: FrequencyEnvelope;

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
      frequency: 700,
      type: "lowpass",
      Q: 18,
    });
    this._hpf = new Filter({
      frequency: 40,
      type: "highpass",
      Q: 12,
    });
    this._noiseOsc = new Noise({
      type: "brown",
    });
    this._noiseHigh = new Noise({
      type: "pink",
    });
    this._lpfHigh = new Filter({
      frequency: 16000,
      type: "lowpass",
      Q: 8,
    });
    this._freqEnvHigh = new FrequencyEnvelope({
      attack: 0.001,
      decay: 0.2,
      release: 0.001,
      sustain: 0.0,
      baseFrequency: 5000,
      octaves: 2,
    });
    this._ampEnvHigh = new AmplitudeEnvelope({
      decay: 0.05,
      attack: 0.01,
      release: 0.001,
      sustain: 0.0,
      decayCurve: "exponential",
    }).connect(this._gain);

    this._freqEnvHigh.connect(this._lpfHigh.frequency);

    this._noiseOsc.connect(this._hpf).connect(this._lpf).connect(this._ampEnv);
    this._noiseHigh
      .connect(this._hpf)
      .connect(this._lpfHigh)
      .connect(this._ampEnvHigh);
  }

  trigger(time: number, params: CommonParams): void {
    this._gain.set({
      gain: params.gain,
    });

    this._ampEnv.decay = params.decayTime;
    this._ampEnvHigh.decay = params.decayTime * 0.75;
    this._ampEnv.release = params.decayTime * 0.1;

    this._noiseOsc.start(time, 0, params.decayTime);
    this._ampEnv.triggerAttackRelease(params.decayTime, time);
    this._noiseHigh.start(time, 0, params.decayTime);
    this._ampEnvHigh.triggerAttackRelease(params.decayTime, time);
    this._freqEnvHigh.triggerAttackRelease(params.decayTime, time);
  }
}
