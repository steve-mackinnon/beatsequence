import AudioEngine from "./AudioEngine";

const scheduleAheadTimeSecs: number = 0.1;
const lookaheadMs = 25.0;

export default class SequencerEngine {
  private readonly _audioEngine: AudioEngine;

  private _timerID: any = undefined;
  private _currentNote: number = 0;
  private _nextNoteTime: number = 0.0; // when the next note is due.
  private readonly _tempo: number = 127.0;
  private readonly _numSteps: number = 16;
  private _stepsEnabled: boolean[] = new Array<boolean>(this._numSteps);

  constructor(audioEngine: AudioEngine) {
    this._audioEngine = audioEngine;
  }

  startPlayback(): void {
    this._stepsEnabled.fill(false);
    this._stepsEnabled[0] = true;
    this._stepsEnabled[4] = true;
    this._stepsEnabled[8] = true;
    this._stepsEnabled[12] = true;

    this._currentNote = 0;
    this._nextNoteTime = this._audioEngine.currentTime();
    this._runNoteScheduler();
  }

  stopPlayback(): void {
    clearTimeout(this._timerID);
  }

  private _scheduleNoteForStep(stepNumber: number, time: number): void {
    if (!this._stepsEnabled[stepNumber]) {
      return;
    }
    this._audioEngine.scheduleNote(time, 420);
  }

  private _advanceStep(): void {
    const secondsPerStep = 60.0 / this._tempo / 4.0;

    this._nextNoteTime += secondsPerStep; // Add step length to last step time

    // Advance the beat number, wrap to zero when reaching 4
    this._currentNote = (this._currentNote + 1) % this._numSteps;
  }

  private _runNoteScheduler(): void {
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
