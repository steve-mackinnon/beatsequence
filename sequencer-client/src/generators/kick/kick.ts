import { Param, getContinuousParamValue } from "../../parameters";
import { DecayTime } from "../sharedParams";

export function makeKick(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  parameters: Map<string, Param>
): void {
  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(1.2, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

  const osc = new OscillatorNode(context, {
    type: "sine",
    frequency: 60, // 60 Hz kick? sure
  });
  const decayTime = getContinuousParamValue(DecayTime, parameters);
  // Amp envelope
  osc.connect(ampEnvelope).connect(destination);
  osc.start(startTime);
  osc.stop(startTime + decayTime);
}
