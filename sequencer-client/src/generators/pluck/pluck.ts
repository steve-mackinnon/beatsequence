import {
  Param,
  getContinuousParamValue,
  getDiscreteParamValue,
} from "../../parameters";
import { OscType, DecayTime } from "../sharedParams";

export function makeBleep(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  frequency: number,
  parameters: Map<string, Param>
): void {
  const oscType = getDiscreteParamValue(OscType, parameters);
  const osc = new OscillatorNode(context, {
    type: oscType as OscillatorType,
    frequency,
  });

  const decayTime = getContinuousParamValue(DecayTime, parameters);
  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(0.3, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);

  osc.connect(ampEnvelope).connect(destination);
  osc.start(startTime);
  osc.stop(startTime + decayTime);
}
