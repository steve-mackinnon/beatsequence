import { CommonParams } from "../commonParams";

export interface KickParams extends CommonParams {
  decayTime: number;
  transientTime: number;
  gain: number;
}

export function makeKick(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  parameters: KickParams
): void {
  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(parameters.gain, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(
    0.01,
    startTime + parameters.decayTime
  );

  const osc = new OscillatorNode(context, {
    type: "sine",
    frequency: 60,
  });
  const osc2 = new OscillatorNode(context, {
    type: "triangle",
    frequency: 200,
  });
  const filter = new BiquadFilterNode(context, {
    frequency: 300.0 * (1 + parameters.transientTime),
    type: "lowpass",
    Q: 10,
  });
  // Amp envelope
  osc.connect(ampEnvelope).connect(destination);
  osc.start(startTime);
  osc.stop(startTime + parameters.decayTime);

  const amp2Envelope = new GainNode(context);
  amp2Envelope.gain.cancelScheduledValues(startTime);
  amp2Envelope.gain.setValueAtTime(0.4 * parameters.gain, startTime);
  amp2Envelope.gain.exponentialRampToValueAtTime(
    0.01,
    startTime + parameters.transientTime
  );
  osc2.connect(amp2Envelope).connect(filter).connect(destination);
  osc2.frequency.exponentialRampToValueAtTime(
    35,
    startTime + parameters.transientTime * 0.5
  );
  osc2.start(startTime);
  osc2.stop(startTime + parameters.transientTime);
}
