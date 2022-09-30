import { atom } from "recoil";
import AudioEngine from "../audio/AudioEngine";
import SequencerEngine from "../audio/SequencerEngine";

export default class AudioEngineState {
  playing: boolean;
  tempo: number;

  constructor() {
    this.playing = false;
    this.tempo = 127;
  }
}

let audioEngine: AudioEngine | null = null;
export const sequencerEngine: SequencerEngine = new SequencerEngine();

export const globalAudioEngineState = atom<AudioEngineState>({
  key: "globalAudioEngineState",
  default: new AudioEngineState(),
  effects: [
    ({ onSet }) => {
      onSet((newValue: AudioEngineState) => {
        if (audioEngine == null) {
          audioEngine = new AudioEngine(sequencerEngine);
          sequencerEngine.setAudioEngine(audioEngine);
        }
        audioEngine.playing = newValue.playing;
      });
    },
  ],
});
