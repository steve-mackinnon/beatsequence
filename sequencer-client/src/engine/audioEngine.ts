import { Param } from "../parameters";
import { makeKick, makeBleep, makeSnare, makeClosedHH } from "../generators";
import { SequencerEngine } from "./sequencerEngine";

export class AudioEngine {
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

  scheduleNote(
    startTime: number,
    frequency: number,
    params: Map<string, Param>
  ): void {
    makeBleep(
      this._context,
      this._context.destination,
      startTime,
      frequency,
      params
    );
  }

  scheduleKick(startTime: number, params: any): void {
    makeKick(this._context, this._context.destination, startTime, params);
  }

  scheduleSnare(startTime: number, params: any): void {
    makeSnare(this._context, this._context.destination, startTime, params);
  }

  scheduleClosedHH(startTime: number, params: any): void {
    makeClosedHH(this._context, this._context.destination, startTime, params);
  }

  currentTime(): number {
    return this._context.currentTime;
  }
}
