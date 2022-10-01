export class KickOptions {
  decayTime: number = 0.2;
}

export function makeKick(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  options: KickOptions
): void {
  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(0.6, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);

  const osc = new OscillatorNode(context, {
    type: "sine",
    frequency: 60, // 60 Hz kick? sure
  });

  // Amp envelope
  osc.connect(ampEnvelope).connect(destination);
  osc.start(startTime);
  osc.stop(startTime + options.decayTime);
}

export class BleepOptions {
  oscType: OscillatorType = "sine";
}

export function makeBleep(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  frequency: number,
  options: BleepOptions
): void {
  const osc = new OscillatorNode(context, {
    type: options.oscType,
    frequency,
  });

  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(0.3, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

  osc.connect(ampEnvelope).connect(destination);
  osc.start(startTime);
  osc.stop(startTime + 0.1);
}
