import { GeneratorType, TrackParams } from "../model/TrackParams";
import AudioEngine from "./AudioEngine";
import { semitoneToHz } from "./PitchUtils";

const scheduleAheadTimeSecs: number = 0.1;
const lookaheadMs = 25.0;

function randomPitch(): number {
  return Math.floor(Math.random() * (36 * 2) - 36);
}

class TrackState {
  steps: StepState[];

  constructor(numSteps: number) {
    this.steps = new Array<StepState>(numSteps);
    for (const stepIndex of Array(numSteps).keys()) {
      const active = Math.random() > 0.5;
      this.steps[stepIndex] = { active, coarsePitch: randomPitch() };
    }
  }
}

export interface StepState {
  active: boolean;
  coarsePitch: number;
}

export default class SequencerEngine {
  private _audioEngine: AudioEngine | null = null;

  private _timerID: any = undefined;
  private _currentStep: number = 0;
  private _nextNoteTime: number = 0.0; // when the next note is due.
  private readonly _tempo: number = 127.0;
  private readonly _numSteps: number = 16;
  private readonly _tracks: TrackState[];
  private _trackParams: TrackParams[];
  readonly numTracks: number;

  constructor() {
    // Object.keys() returns 2 keys per enumeration for numeric enums,
    // which is why the / 2 is necessary here.
    this.numTracks = Object.keys(GeneratorType).length / 2;
    this._tracks = new Array<TrackState>(this.numTracks);
    this._trackParams = new Array<TrackParams>(this.numTracks);
    for (const trackIndex of Array(this.numTracks).keys()) {
      this._tracks[trackIndex] = new TrackState(this._numSteps);
      this._trackParams[trackIndex] = new TrackParams(trackIndex);
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

  setTrackParams(trackIndex: number, trackParams: TrackParams): void {
    this._trackParams[trackIndex] = trackParams;
  }

  getTrackParams(trackIndex: number): TrackParams {
    return this._trackParams[trackIndex];
  }

  setStepState(trackIndex: number, stepIndex: number, state: StepState): void {
    this._tracks[trackIndex].steps[stepIndex] = state;
  }

  getStepState(trackIndex: number, stepIndex: number): StepState {
    return this._tracks[trackIndex].steps[stepIndex];
  }

  getCurrentStep(): number {
    return this._currentStep;
  }

  private _scheduleNoteForStep(stepIndex: number, time: number): void {
    if (this._audioEngine == null) {
      return;
    }
    this._tracks.forEach((track: TrackState, index: number) => {
      const step = track.steps[stepIndex];
      const trackParams = this._trackParams[index];
      if (!step.active || trackParams.muted || this._audioEngine == null) {
        return;
      }
      switch (trackParams.generatorType) {
        case GeneratorType.Kick:
          this._audioEngine.scheduleKick(time, 0.4);
          break;
        case GeneratorType.Snare:
          this._audioEngine.scheduleSnare(time);
          break;
        case GeneratorType.ClosedHH:
          this._audioEngine.scheduleClosedHH(time);
          break;
        case GeneratorType.SineBleep:
          this._audioEngine.scheduleNote(
            "sine",
            time,
            semitoneToHz(step.coarsePitch)
          );
          break;
        case GeneratorType.SquareBleep:
          this._audioEngine.scheduleNote(
            "square",
            time,
            semitoneToHz(step.coarsePitch)
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
