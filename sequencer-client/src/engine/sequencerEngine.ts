import { TrackState } from "../features/tracks/tracks";
import { GeneratorType } from "../features/tracks/GeneratorType";
import { AudioEngine, audioEngine } from "./audioEngine";
import { semitoneToHz } from "./pitchUtils";
import { Kick, Generator, HiHat, Pluck, Snare } from "../generators";
import { StepState } from "../features/steps/steps";
import { Limiter, ToneAudioNode, Transport } from "tone";

function randomPitch(): number {
  return Math.floor(Math.random() * (36 * 2) - 36);
}

function makeGenerator(
  type: GeneratorType,
  destination: ToneAudioNode
): Generator {
  switch (type) {
    case GeneratorType.Kick:
      return new Kick(destination);
    case GeneratorType.ClosedHH:
      return new HiHat(destination);
    case GeneratorType.SineBleep:
    case GeneratorType.SquareBleep:
      return new Pluck(destination);
    case GeneratorType.Snare:
      return new Snare(destination);
  }
}

function makeStepsForTrack(numSteps: number, trackId: number): StepState[] {
  const steps = new Array<StepState>(numSteps);
  for (const stepIndex of Array(numSteps).keys()) {
    const enabled = Math.random() > 0.5;
    steps[stepIndex] = {
      enabled,
      params: {
        coarsePitch: randomPitch(),
      },
      stepIndex,
      trackId,
    };
  }
  return steps;
}

export type StepChangedCallback = () => void;

export class SequencerEngine {
  private _audioEngine: AudioEngine | null = null;

  private readonly _timerID: any = undefined;
  private _currentStep: number = 0;
  private _tempo: number = 127.0;

  set tempo(tempo: number) {
    this._tempo = tempo;
    Transport.bpm.value = tempo;
  }

  get tempo(): number {
    return this._tempo;
  }

  private readonly _numSteps: number = 16;
  private readonly _steps: StepState[][];
  private _trackStates: TrackState[];
  private readonly _generators: Generator[];

  private readonly _stepChangedCallbacks: Array<
    Array<StepChangedCallback | null>
  >;

  readonly numTracks: number;
  readonly _masterFX: Limiter;

  constructor() {
    // Object.keys() returns 2 keys per enumeration for numeric enums,
    // which is why the / 2 is necessary here.
    this.numTracks = Object.keys(GeneratorType).length / 2;
    this._steps = new Array<StepState[]>(this.numTracks);
    this._trackStates = new Array<TrackState>(this.numTracks);
    this._stepChangedCallbacks = new Array<Array<StepChangedCallback | null>>(
      this.numTracks
    );

    this._generators = new Array<Generator>(this.numTracks);

    this._masterFX = new Limiter(-4.0).toDestination();

    for (const trackIndex of Array(this.numTracks).keys()) {
      this._steps[trackIndex] = makeStepsForTrack(this._numSteps, trackIndex);
      this._trackStates[trackIndex] = {
        id: trackIndex,
        muted: false,
        generatorType: GeneratorType.SineBleep,
        generatorParams: {
          decayTime: 0.1,
          gain: 1.0,
          triggerProbability: 100.0,
        },
        displayName: "default",
        paramViewVisible: false,
      };

      this._stepChangedCallbacks[trackIndex] =
        new Array<StepChangedCallback | null>(this._numSteps);
      this._stepChangedCallbacks[trackIndex].fill(null);

      this._generators[trackIndex] = makeGenerator(
        trackIndex as GeneratorType,
        this._masterFX
      );
    }

    Transport.setLoopPoints("1:1:1", "17:1:1");
    Transport.loop = true;
    Transport.bpm.value = this._tempo;
    Transport.scheduleRepeat((time) => {
      this._steps.forEach((steps: StepState[], index: number) => {
        const trackState = this._trackStates[index];
        const step = steps[this._currentStep];
        if (!step.enabled || trackState.muted) {
          return;
        }
        if (
          trackState.generatorParams.triggerProbability < 100.0 &&
          Math.random() * 100.0 > trackState.generatorParams.triggerProbability
        ) {
          return;
        }
        this._generators[index].trigger(
          time,
          trackState.generatorParams,
          semitoneToHz(step.params.coarsePitch)
        );
      });
      this._currentStep += 1;
      if (this._currentStep === 16) {
        this._currentStep = 0;
      }
    }, "16n");
  }

  setAudioEngine(audioEngine: AudioEngine): void {
    this._audioEngine = audioEngine;
    this._audioEngine.registerPlaybackListener((playing: boolean) => {
      if (playing) {
        this.startPlayback();
      } else {
        this.stopPlayback();
      }
    });
  }

  startPlayback(): void {
    this._currentStep = 0;
    Transport.start();
  }

  stopPlayback(): void {
    Transport.pause();
  }

  setTrackState(trackIndex: number, trackState: TrackState): void {
    this._trackStates[trackIndex] = trackState;
  }

  getTrackState(trackIndex: number): TrackState {
    return this._trackStates[trackIndex];
  }

  setStepState(trackIndex: number, stepIndex: number, state: StepState): void {
    this._steps[trackIndex][stepIndex] = state;
  }

  getStepState(trackIndex: number, stepIndex: number): StepState {
    return this._steps[trackIndex][stepIndex];
  }

  getCurrentStepIndex(): number {
    if (this._audioEngine == null || !this._audioEngine.playing) {
      return 0;
    }
    return this._currentStep;
  }

  private _broadcastStepUpdate(trackIndex: number, stepIndex: number): void {
    const callback = this._stepChangedCallbacks[trackIndex][stepIndex];
    if (callback != null) {
      callback();
    }
  }

  randomizeTrack(trackIndex: number): void {
    this._steps[trackIndex].forEach((step: StepState, stepIndex: number) => {
      const newStep = { ...step };
      newStep.enabled = Math.random() > 0.5;
      newStep.params.coarsePitch = randomPitch();
      this._steps[trackIndex][stepIndex] = newStep;
      this._broadcastStepUpdate(trackIndex, stepIndex);
    });
  }

  randomizeAllTracks(): void {
    this._steps.forEach((_: StepState[], index: number) => {
      this.randomizeTrack(index);
    });
  }

  registerStepUpdateCallback(
    trackIndex: number,
    stepIndex: number,
    callback: StepChangedCallback | null
  ): void {
    this._stepChangedCallbacks[trackIndex][stepIndex] = callback;
  }
}

export const sequencerEngine = new SequencerEngine();
sequencerEngine.setAudioEngine(audioEngine);
