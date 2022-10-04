import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import AudioEngineState, {
  globalAudioEngineState,
  sequencerEngine,
} from "../state/AudioEngineState";

export function TransportControls(): ReactElement {
  const [audioEngineState, setAudioEngineState] =
    useRecoilState<AudioEngineState>(globalAudioEngineState);

  const onPlayStopClick = (event: any): void => {
    setAudioEngineState((current: AudioEngineState) => {
      const newState = { ...current };
      newState.playing = !current.playing;
      return newState;
    });
  };
  const onRandomizeClick = (event: any): void => {
    sequencerEngine.randomizeAllTracks();
  };

  return (
    <div>
      <button onClick={onPlayStopClick}>
        {audioEngineState.playing ? "Stop" : "Play"}
      </button>
      <button onClick={onRandomizeClick}>Rand</button>
    </div>
  );
}
