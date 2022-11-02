export interface ClosedHHParams {
  decayTime: number;
  gain: number;
}

export function makeClosedHH(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  parameters: ClosedHHParams
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
  ampEnvelope.gain.setValueAtTime(0.5 * parameters.gain, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(
    0.00001,
    startTime + parameters.decayTime
  );

  const lowpass = new BiquadFilterNode(context, {
    type: "lowpass",
    frequency: 14000,
  });
  const highpass = new BiquadFilterNode(context, {
    type: "highpass",
    frequency: 4400,
  });

  noise
    .connect(lowpass)
    .connect(highpass)
    .connect(ampEnvelope)
    .connect(destination);
  noise.start(startTime);
}
