import React, { ReactElement, useState } from "react";
import { useAppDispatch } from "../hooks";
import { randomize } from "../features/steps/steps";
import { audioEngine } from "../engine";
import Button from "@mui/material/Button";

export function TransportControls(): ReactElement {
  const dispatch = useAppDispatch();
  const [playing, setPlaying] = useState(false);

  const onPlayStopClick = (event: any): void => {
    setPlaying(!playing);
    audioEngine.playing = !playing;
  };
  const onRandomizeClick = (event: any): void => {
    dispatch(
      randomize({
        trackId: undefined,
        seed: Date.now().toString(),
      })
    );
  };

  return (
    <div>
      <Button onClick={onPlayStopClick}>{playing ? "Stop" : "Play"}</Button>
      <Button onClick={onRandomizeClick}>Rand</Button>
    </div>
  );
}
