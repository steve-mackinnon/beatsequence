import AudioEngine from "./AudioEngine";
import { semitoneToHz } from "./PitchUtils";

const scheduleAheadTimeSecs: number = 0.1;
const lookaheadMs = 25.0;

function randomPitch(): number {
  return Math.floor(Math.random() * (36 * 2) - 36);
}

class TrackState {
  steps: StepState[];
  oscType: OscillatorType = "sine";
  isKick: boolean = false;

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
  private _currentNote: number = 0;
  private _nextNoteTime: number = 0.0; // when the next note is due.
  private readonly _tempo: number = 127.0;
  private readonly _numSteps: number = 16;
  private readonly _numTracks: number = 3;

  private readonly _tracks: TrackState[];
  constructor() {
    this._tracks = new Array<TrackState>(this._numTracks);
    for (const trackIndex of Array(this._numTracks).keys()) {
      this._tracks[trackIndex] = new TrackState(this._numSteps);
    }
    this._tracks[2].oscType = "square";
    this._tracks[0].isKick = true;
  }

  setAudioEngine(audioEngine: AudioEngine): void {
    this._audioEngine = audioEngine;
  }

  startPlayback(): void {
    if (this._audioEngine == null) {
      return;
    }
    this._currentNote = 0;
    this._nextNoteTime = this._audioEngine.currentTime();
    this._runNoteScheduler();
  }

  stopPlayback(): void {
    clearTimeout(this._timerID);
  }

  setStepState(trackIndex: number, stepIndex: number, state: StepState): void {
    this._tracks[trackIndex].steps[stepIndex] = state;
  }

  getStepState(trackIndex: number, stepIndex: number): StepState {
    return this._tracks[trackIndex].steps[stepIndex];
  }

  private _scheduleNoteForStep(stepIndex: number, time: number): void {
    if (this._audioEngine == null) {
      return;
    }
    for (const track of this._tracks) {
      const step = track.steps[stepIndex];
      if (!step.active) {
        continue;
      }
      if (track.isKick) {
        this._audioEngine.scheduleKick(time, 0.4);
      } else {
        this._audioEngine.scheduleNote(
          track.oscType,
          time,
          semitoneToHz(step.coarsePitch)
        );
      }
    }
  }

  private _advanceStep(): void {
    const secondsPerStep = 60.0 / this._tempo / 4.0;

    this._nextNoteTime += secondsPerStep; // Add step length to last step time

    // Advance the beat number, wrap to zero when reaching 4
    this._currentNote = (this._currentNote + 1) % this._numSteps;
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
      this._scheduleNoteForStep(this._currentNote, this._nextNoteTime);
      this._advanceStep();
    }
    this._timerID = setTimeout(() => this._runNoteScheduler(), lookaheadMs);
  }
}
