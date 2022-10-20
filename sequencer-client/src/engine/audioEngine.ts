import { Param } from "../parameters";
import { makeKick, makeBleep, makeSnare, makeClosedHH } from "../generators";
import { SequencerEngine, sequencerEngine } from "./sequencerEngine";

export class AudioEngine {
  private _context: AudioContext | undefined = undefined;
  private readonly _sequencer: SequencerEngine;
  private _playing: boolean = false;

  constructor(sequencer: SequencerEngine) {
    this._sequencer = sequencer;
  }

  get playing(): boolean {
    return this._playing;
  }

  set playing(playing: boolean) {
    if (this._playing === playing) {
      return;
    }
    if (this._context == null) {
      this._context = new AudioContext();
      this._sequencer.setAudioEngine(this);
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
    if (this._context === undefined) {
      return;
    }
    makeBleep(
      this._context,
      this._context.destination,
      startTime,
      frequency,
      params
    );
  }

  scheduleKick(startTime: number, params: any): void {
    if (this._context === undefined) {
      return;
    }
    makeKick(this._context, this._context.destination, startTime, params);
  }

  scheduleSnare(startTime: number, params: any): void {
    if (this._context === undefined) {
      return;
    }
    makeSnare(this._context, this._context.destination, startTime, params);
  }

  scheduleClosedHH(startTime: number, params: any): void {
    if (this._context === undefined) {
      return;
    }
    makeClosedHH(this._context, this._context.destination, startTime, params);
  }

  currentTime(): number {
    if (this._context === undefined) {
      return -1;
    }
    return this._context.currentTime;
  }
}

export const audioEngine = new AudioEngine(sequencerEngine);
