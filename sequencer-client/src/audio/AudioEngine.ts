import SequencerEngine from "./SequencerEngine";

export default class AudioEngine {
  private readonly _context: AudioContext;
  private readonly _sequencer: SequencerEngine;
  private _playing: boolean = false;

  constructor(sequencer: SequencerEngine) {
    this._context = new AudioContext();
    this._sequencer = sequencer;
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
          this._sequencer.startPlayback();
        })
        .catch((e: any) => {
          console.log(e);
        });
    } else {
      this._context
        .suspend()
        .then(() => {
          this._playing = false;
          this._sequencer.stopPlayback();
        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  }

  scheduleNote(startTime: number, frequency: number): void {
    const osc = new OscillatorNode(this._context, {
      type: "sine",
      frequency,
    });
    osc.connect(this._context.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  currentTime(): number {
    return this._context.currentTime;
  }
}
