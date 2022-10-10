import { atom } from "recoil";
import AudioEngine from "../../audio/AudioEngine";
import SequencerEngine from "../../audio/SequencerEngine";

let audioEngine: AudioEngine | null = null;
export const sequencerEngine: SequencerEngine = new SequencerEngine();

export interface AudioEngineState {
  playing: boolean;
  tempo: number;
}

const defaultState: AudioEngineState = {
  playing: false,
  tempo: 127,
};

const audioEngineAtom = atom<AudioEngineState>({
  key: "globalAudioEngineState",
  default: defaultState,
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

export default audioEngineAtom;
