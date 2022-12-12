import { CommonParams } from "../commonParams";
import { Generator } from "../generator";
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

export class Kick implements Generator {
  private readonly _gain: Gain;
  private readonly _ampLong: AmplitudeEnvelope;
  private readonly _ampShort: AmplitudeEnvelope;
  private readonly _filter: Filter;
  private readonly _filterShort: Filter;
  private readonly _oscLong: Oscillator;
  private readonly _oscShort: Oscillator;
  private readonly _freqEnvShort: FrequencyEnvelope;

  constructor() {
    this._gain = new Gain(1.0).toDestination();
    this._ampLong = new AmplitudeEnvelope({
      attack: 0.001,
      decay: 0.2,
      sustain: 0.0,
      release: 0.05,
    }).connect(this._gain);
    this._ampShort = new AmplitudeEnvelope({
      attack: 0.001,
      decay: 0.05,
      sustain: 0.0,
      release: 0.01,
      decayCurve: "exponential",
    }).connect(this._gain);
    this._filter = new Filter({
      frequency: 300 * (1 + 0.05),
      type: "lowpass",
      Q: 10,
    });
    this._filterShort = new Filter({
      frequency: "F0",
      type: "lowpass",
      Q: 12,
    });
    this._oscLong = new Oscillator({
      frequency: 60.0,
      type: "sine",
    });
    this._oscShort = new Oscillator({
      frequency: 200.0,
      type: "triangle",
    });

    this._freqEnvShort = new FrequencyEnvelope({
      baseFrequency: "F0",
      octaves: 1,
      attack: 0.001,
      decay: 0.05,
      sustain: 0.0,
      release: 0.01,
    });
    this._freqEnvShort.connect(this._oscShort.frequency);
    this._freqEnvShort.connect(this._filterShort.frequency);

    this._oscLong.connect(this._filter).connect(this._ampLong);

    this._oscShort.connect(this._filterShort).connect(this._ampShort);
  }

  trigger(startTime: number, params: CommonParams): void {
    this._gain.set({
      gain: params.gain,
    });

    const parameters = params as KickParams;
    this._ampLong.decay = parameters.decayTime;
    this._ampShort.decay = parameters.transientTime;
    this._freqEnvShort.decay = parameters.transientTime;
    this._ampShort.decay = parameters.transientTime;

    this._filterShort.set({
      frequency: 300 * (1 + parameters.transientTime),
    });
    this._ampLong.triggerAttackRelease(parameters.decayTime, startTime);
    this._ampShort.triggerAttackRelease(parameters.decayTime, startTime);
    this._oscLong.start(startTime).stop(startTime + parameters.decayTime);
    this._oscShort.start(startTime).stop(startTime + parameters.decayTime);
  }
}
