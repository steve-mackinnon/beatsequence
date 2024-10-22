import { start, context, getDestination } from "tone";

export type PlaybackListener = (playing: boolean) => void;
export class AudioEngine {
  private _playing: boolean = false;
  private readonly _playbackListeners: Map<number, PlaybackListener> =
    new Map();

  private _listenerCounter: number = 0;

  constructor() {
    getDestination().volume.set({
      value: -6,
    });
  }

  registerPlaybackListener(listener: PlaybackListener): number {
    this._listenerCounter++;
    this._playbackListeners.set(this._listenerCounter, listener);
    return this._listenerCounter;
  }

  unregisterPlaybackListener(id: number): boolean {
    if (this._playbackListeners.has(id)) {
      this._playbackListeners.delete(id);
      return true;
    }
    return false;
  }

  get playing(): boolean {
    return this._playing;
  }

  set playing(playing: boolean) {
    if (this._playing === playing) {
      return;
    }
    if (playing) {
      const notifyPlaybackListeners = (): void => {
        this._playing = true;
        this._playbackListeners.forEach((listener) => listener(true));
      };
      if (context.state !== "running") {
        start()
          .then(() => {
            notifyPlaybackListeners();
          })
          .catch((e: any) => {
            console.log(e);
          });
      } else {
        notifyPlaybackListeners();
      }
    } else {
      // Transport.stop();
      // Intentionally do not suspend() the audio context when playback
      // stops. resume() requires a noticable amount of latency before
      // playback starts and it introduces audible glitches.
      this._playing = false;
      this._playbackListeners.forEach((listener) => listener(false));
    }
  }

  async shutDown(): Promise<void> {
    // Transport.stop();
  }

  currentTime(): number {
    return context.currentTime;
  }
}

export const audioEngine = new AudioEngine();
