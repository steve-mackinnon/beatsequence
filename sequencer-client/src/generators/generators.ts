import Param, {
  ContinuousParamMetadata,
  DiscreteParamMetadata,
} from "../parameters";
import { OscType, DecayTime } from "../generators";

function getContinuousParamValue(
  paramInfo: ContinuousParamMetadata,
  params: Map<string, Param>
): number {
  const param = params.get(paramInfo.id);
  if (param === undefined) {
    return paramInfo.default;
  }
  if (param.kind === "continuous") {
    return param.value;
  }
  return paramInfo.default;
}

function getDiscreteParamValue(
  paramInfo: DiscreteParamMetadata,
  params: Map<string, Param>
): string {
  const param = params.get(paramInfo.id);
  if (param === undefined) {
    return paramInfo.default;
  }
  if (param.kind === "discrete") {
    return param.value;
  }
  return paramInfo.default;
}

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

export class BleepOptions {
  oscType: OscillatorType = "sine";
}

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

export function makeSnare(
  context: AudioContext,
  destination: AudioNode,
  startTime: number,
  parameters: Map<string, Param>
): void {
  const bufferSize = context.sampleRate * 0.1;
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

  const decayTime = getContinuousParamValue(DecayTime, parameters);
  const ampEnvelope = new GainNode(context);
  ampEnvelope.gain.cancelScheduledValues(startTime);
  ampEnvelope.gain.setValueAtTime(0.8, startTime);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);

  const lowpass = new BiquadFilterNode(context, {
    type: "lowpass",
    frequency: 8000,
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
  startTime: number,
  parameters: Map<string, Param>
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
  ampEnvelope.gain.setValueAtTime(0.6, startTime);
  const decayTime = getContinuousParamValue(DecayTime, parameters);
  ampEnvelope.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);

  const lowpass = new BiquadFilterNode(context, {
    type: "lowpass",
    frequency: 12000,
  });
  const highpass = new BiquadFilterNode(context, {
    type: "highpass",
    frequency: 2000,
  });

  noise
    .connect(lowpass)
    .connect(highpass)
    .connect(ampEnvelope)
    .connect(destination);
  noise.start(startTime);
}
