import { CommonParams } from "../commonParams";
import { AmplitudeEnvelope, Oscillator, Gain } from "tone";
import { Generator } from "../generator";

export interface OscParams extends CommonParams {
  osc_type: OscillatorType;
}

export class Pluck implements Generator {
  private readonly _gain: Gain;
  private readonly _ampEnv: AmplitudeEnvelope;
  private readonly _osc: Oscillator;

  constructor() {
    this._gain = new Gain(1.0).toDestination();
    this._ampEnv = new AmplitudeEnvelope({
      attack: 0.01,
      decay: 0.2,
      sustain: 0,
      release: 0.05,
    }).connect(this._gain);
    this._osc = new Oscillator(200.0, "sine").connect(this._ampEnv);
  }

  trigger(time: number, params: CommonParams, frequency?: number): void {
    if (frequency == null) {
      console.log(
        "Received invalid frequency in Pluck's trigger() method. Falling back to a default value of 200 hz"
      );
    }
    this._gain.set({
      gain: params.gain,
    });
    const freq = frequency ?? 200;
    this._ampEnv.decay = params.decayTime;
    this._osc.set({
      frequency: freq,
      type: (params as OscParams).osc_type,
    });
    this._osc.start(time).stop(time + params.decayTime);
    this._ampEnv.triggerAttackRelease(params.decayTime, time);
  }
}
