const scheduleAheadTimeSecs: number = 0.1;
const lookaheadMs = 25.0;

export default class AudioEngine {
  private readonly _context: AudioContext;

  private _playing: boolean = false;
  private _currentNote: number = 0;
  private _nextNoteTime: number = 0.0; // when the next note is due.
  private readonly _tempo: number = 127.0;
  private readonly _numSteps: number = 16;
  private readonly _stepsEnabled: boolean[] = new Array<boolean>(
    this._numSteps
  );

  private _timerID: any = undefined;

  private _scheduleNoteForStep(stepNumber: number, time: number): void {
    if (!this._stepsEnabled[stepNumber]) {
      return;
    }
    this._playNote(time, 420);
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
      this._context.currentTime + scheduleAheadTimeSecs
    ) {
      this._scheduleNoteForStep(this._currentNote, this._nextNoteTime);
      this._advanceStep();
    }
    this._timerID = setTimeout(() => this._runNoteScheduler(), lookaheadMs);
  }

  constructor() {
    this._context = new AudioContext();

    this._stepsEnabled.fill(false);
    this._stepsEnabled[0] = true;
    this._stepsEnabled[4] = true;
    this._stepsEnabled[8] = true;
    this._stepsEnabled[12] = true;
  }

  get playing(): boolean {
    return this._playing;
  }

  set playing(playing: boolean) {
    if (this._playing === playing) {
      return;
    }
    if (playing) {
      this._context
        .resume()
        .then(() => {
          this._playing = true;
          this._currentNote = 0;
          this._nextNoteTime = this._context.currentTime;
          this._runNoteScheduler();
        })
        .catch((e: any) => {
          console.log(e);
        });
    } else {
      clearTimeout(this._timerID);
      this._context
        .suspend()
        .then(() => {
          this._playing = false;
        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  }

  private _playNote(startTime: number, frequency: number): void {
    const osc = new OscillatorNode(this._context, {
      type: "sine",
      frequency,
    });
    osc.connect(this._context.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }
}
