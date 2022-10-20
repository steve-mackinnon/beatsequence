import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { randomize } from "../features/steps/steps";
import { togglePlayback } from "../features/song/song";
import Button from "@mui/material/Button";

export function TransportControls(): ReactElement {
  const dispatch = useAppDispatch();
  const playing = useAppSelector((state) => state.song.playing);

  const onPlayStopClick = (event: any): void => {
    dispatch(togglePlayback({}));
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
