import {
  makeKick,
  makeBleep,
  makeSnare,
  makeClosedHH,
  OscParams,
  KickParams,
  SnareParams,
  ClosedHHParams,
} from "../generators";
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
      const setPlaying = (): void => {
        this._playing = true;
        this._sequencer.startPlayback();
      };
      if (this._context.state !== "running") {
        // resume() the context if it is not already running
        this._context
          .resume()
          .then(() => {
            setPlaying();
          })
          .catch((e: any) => {
            console.log(e);
          });
      } else {
        setPlaying();
      }
    } else {
      // Intentionally do not suspend() the audio context when playback
      // stops. resume() requires a noticable amount of latency before
      // playback starts and it introduces audible glitches.
      this._playing = false;
      this._sequencer.stopPlayback();
    }
  }

  async shutDown(): Promise<void> {
    if (this._context == null) {
      return;
    }
    if (this._context.state === "running") {
      return await this._context.suspend();
    }
  }

  scheduleNote(startTime: number, frequency: number, params: OscParams): void {
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

  scheduleKick(startTime: number, params: KickParams): void {
    if (this._context === undefined) {
      return;
    }
    makeKick(this._context, this._context.destination, startTime, params);
  }

  scheduleSnare(startTime: number, params: SnareParams): void {
    if (this._context === undefined) {
      return;
    }
    makeSnare(this._context, this._context.destination, startTime, params);
  }

  scheduleClosedHH(startTime: number, params: ClosedHHParams): void {
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
