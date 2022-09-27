import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import AudioEngineState, {
  globalAudioEngineState,
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
  return (
    <div>
      <button onClick={onPlayStopClick}>
        {audioEngineState.playing ? "Stop" : "Play"}
      </button>
    </div>
  );
}
