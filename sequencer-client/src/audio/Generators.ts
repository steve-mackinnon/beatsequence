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
  ampEnvelope.gain.setValueAtTime(1.2, startTime);
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

export function makeSnare(
  context: AudioContext,
  destination: AudioNode,
  startTime: number
): void {
  const bufferSize = context.sampleRate * 0.15;
  const noiseBuffer = new AudioBuffer({
    length: bufferSize,
    sampleRate: context.sampleRate,
  });
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = new AudioBufferSourceNode(context, {
    buffer: noiseBuffer,
  });
  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(1.2, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

  const lowpass = new BiquadFilterNode(context, {
    type: "lowpass",
    frequency: 4000,
  });
  const highpass = new BiquadFilterNode(context, {
    type: "highpass",
    frequency: 90,
  });

  noise
    .connect(lowpass)
    .connect(highpass)
    .connect(ampEnvelope)
    .connect(destination);
  noise.start(startTime);
}

export function makeClosedHH(
  context: AudioContext,
  destination: AudioNode,
  startTime: number
): void {
  const bufferSize = context.sampleRate * 0.07;
  const noiseBuffer = new AudioBuffer({
    length: bufferSize,
    sampleRate: context.sampleRate,
  });
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = new AudioBufferSourceNode(context, {
    buffer: noiseBuffer,
  });
  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(1.0, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + 0.07);

  const lowpass = new BiquadFilterNode(context, {
    type: "lowpass",
    frequency: 12000,
  });
  const highpass = new BiquadFilterNode(context, {
    type: "highpass",
    frequency: 1000,
  });

  noise
    .connect(lowpass)
    .connect(highpass)
    .connect(ampEnvelope)
    .connect(destination);
  noise.start(startTime);
}
