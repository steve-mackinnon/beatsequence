import { CommonParams } from "../../entities/commonParams";
import { AmplitudeEnvelope, PolySynth, Gain, Synth, ToneAudioNode } from "tone";
import { Generator } from "../generator";

export interface OscParams extends CommonParams {
  osc_type: OscillatorType;
}

export class Pluck implements Generator {
  private readonly _gain: Gain;
  private readonly _osc: PolySynth;

  constructor(destination: ToneAudioNode, oscType: OscillatorType) {
    this._gain = new Gain(1.0).connect(destination);
    this._osc = new PolySynth(Synth).connect(this._gain);
    this._osc.maxPolyphony = 10;
    this._osc.set({
      oscillator: {
        type: oscType,
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0,
        release: 0.05,
      },
    });
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
    this._osc.set({
      envelope: {
        decay: params.decayTime,
      },
    });
    this._osc.triggerAttackRelease(freq, params.decayTime, time);
  }
}
