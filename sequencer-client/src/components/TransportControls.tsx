import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import AudioEngineState, {
  globalAudioEngineState,
  sequencerEngine,
} from "../state/AudioEngineState";
import Button from "@mui/material/Button";

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
      <Button onClick={onPlayStopClick}>
        {audioEngineState.playing ? "Stop" : "Play"}
      </Button>
      <Button onClick={onRandomizeClick}>Rand</Button>
    </div>
  );
}
