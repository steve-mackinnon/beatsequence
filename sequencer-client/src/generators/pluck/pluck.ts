export interface OscParams {
  decay_time: number;
  gain: number;
  osc_type: OscillatorType;
}

export function makeBleep(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  frequency: number,
  parameters: OscParams
): void {
  const osc = new OscillatorNode(context, {
    type: parameters.osc_type,
    frequency,
  });

  const decayTime = parameters.decay_time;
  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(0.3 * parameters.gain, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);

  osc.connect(ampEnvelope).connect(destination);
  osc.start(startTime);
  osc.stop(startTime + decayTime);
}
