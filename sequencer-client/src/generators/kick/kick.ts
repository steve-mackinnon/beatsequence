export interface KickParams {
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
  ampEnvelope.gain.setValueAtTime(1.2 * parameters.gain, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(
    0.01,
    startTime + parameters.transientTime
  );

  const osc = new OscillatorNode(context, {
    type: "sine",
    frequency: 60, // 60 Hz kick? sure
  });
  // Amp envelope
  osc.connect(ampEnvelope).connect(destination);
  osc.start(startTime);
  osc.stop(startTime + parameters.decayTime);
}
