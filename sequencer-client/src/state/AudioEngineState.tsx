import { atom } from "recoil";
import AudioEngine from "../audio/AudioEngine";

export default class AudioEngineState {
  playing: boolean;
  tempo: number;

  constructor() {
    this.playing = false;
    this.tempo = 127;
  }
}

let audioEngine: AudioEngine | null = null;

export const globalAudioEngineState = atom<AudioEngineState>({
  key: "globalAudioEngineState",
  default: new AudioEngineState(),
  effects: [
    ({ onSet }) => {
      onSet((newValue: AudioEngineState) => {
        if (audioEngine == null) {
          audioEngine = new AudioEngine();
        }
        audioEngine.playing = newValue.playing;
      });
    },
  ],
});
