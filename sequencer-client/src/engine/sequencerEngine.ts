import { TrackState } from "../features/tracks/tracks";
import { GeneratorType } from "../features/tracks/GeneratorType";
import { AudioEngine } from "./audioEngine";
import { semitoneToHz } from "./pitchUtils";

const scheduleAheadTimeSecs: number = 0.1;
const lookaheadMs = 25.0;

function randomPitch(): number {
  return Math.floor(Math.random() * (36 * 2) - 36);
}

function makeStepsForTrack(numSteps: number): StepState[] {
  const steps = new Array<StepState>(numSteps);
  for (const stepIndex of Array(numSteps).keys()) {
    const enabled = Math.random() > 0.5;
    steps[stepIndex] = {
      enabled,
      coarsePitch: randomPitch(),
    };
  }
  return steps;
}

export interface StepState {
  enabled: boolean;
  coarsePitch: number;
}

export type StepChangedCallback = () => void;

export class SequencerEngine {
  private _audioEngine: AudioEngine | null = null;

  private _timerID: any = undefined;
  private _currentStep: number = 0;
  private _nextNoteTime: number = 0.0; // when the next note is due.
  private readonly _tempo: number = 127.0;
  private readonly _numSteps: number = 16;
  private readonly _steps: StepState[][];
  private _trackStates: TrackState[];
  private readonly _stepChangedCallbacks: Array<
    Array<StepChangedCallback | null>
  >;

  readonly numTracks: number;

  constructor() {
    // Object.keys() returns 2 keys per enumeration for numeric enums,
    // which is why the / 2 is necessary here.
    this.numTracks = Object.keys(GeneratorType).length / 2;
    this._steps = new Array<StepState[]>(this.numTracks);
    this._trackStates = new Array<TrackState>(this.numTracks);
    this._stepChangedCallbacks = new Array<Array<StepChangedCallback | null>>(
      this.numTracks
    );

    for (const trackIndex of Array(this.numTracks).keys()) {
      this._steps[trackIndex] = makeStepsForTrack(this._numSteps);
      this._trackStates[trackIndex] = {
        id: trackIndex,
        muted: false,
        generatorType: GeneratorType.SineBleep,
        generatorParams: {},
      };

      this._stepChangedCallbacks[trackIndex] =
        new Array<StepChangedCallback | null>(this._numSteps);
      this._stepChangedCallbacks[trackIndex].fill(null);
    }
  }

  setAudioEngine(audioEngine: AudioEngine): void {
    this._audioEngine = audioEngine;
  }

  startPlayback(): void {
    if (this._audioEngine == null) {
      return;
    }
    this._currentStep = 0;
    this._nextNoteTime = this._audioEngine.currentTime();
    this._runNoteScheduler();
  }

  stopPlayback(): void {
    this._currentStep = 0;
    clearTimeout(this._timerID);
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

  getCurrentStep(): number {
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
      newStep.coarsePitch = randomPitch();
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

  private _scheduleNoteForStep(stepIndex: number, time: number): void {
    if (this._audioEngine == null) {
      return;
    }
    this._steps.forEach((steps: StepState[], index: number) => {
      const step = steps[stepIndex];
      const trackState = this._trackStates[index];
      if (!step.enabled || trackState.muted || this._audioEngine == null) {
        return;
      }
      switch (trackState.generatorType) {
        case GeneratorType.Kick:
          this._audioEngine.scheduleKick(time, trackState.generatorParams);
          break;
        case GeneratorType.Snare:
          this._audioEngine.scheduleSnare(time, trackState.generatorParams);
          break;
        case GeneratorType.ClosedHH:
          this._audioEngine.scheduleClosedHH(time, trackState.generatorParams);
          break;
        case GeneratorType.SineBleep:
          this._audioEngine.scheduleNote(
            time,
            semitoneToHz(step.coarsePitch),
            trackState.generatorParams
          );
          break;
        case GeneratorType.SquareBleep:
          this._audioEngine.scheduleNote(
            time,
            semitoneToHz(step.coarsePitch),
            trackState.generatorParams
          );
          break;
      }
    });
  }

  private _advanceStep(): void {
    const secondsPerStep = 60.0 / this._tempo / 4.0;

    this._nextNoteTime += secondsPerStep; // Add step length to last step time

    // Advance the beat number, wrap to zero when reaching 4
    this._currentStep = (this._currentStep + 1) % this._numSteps;
  }

  private _runNoteScheduler(): void {
    if (this._audioEngine == null) {
      return;
    }
    // While there are notes that will need to play before the next interval,
    // schedule them.
    while (
      this._nextNoteTime <
      this._audioEngine.currentTime() + scheduleAheadTimeSecs
    ) {
      this._scheduleNoteForStep(this._currentStep, this._nextNoteTime);
      this._advanceStep();
    }
    this._timerID = setTimeout(() => this._runNoteScheduler(), lookaheadMs);
  }
}

export const sequencerEngine = new SequencerEngine();