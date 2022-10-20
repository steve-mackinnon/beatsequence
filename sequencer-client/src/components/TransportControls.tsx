import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { randomize } from "../features/steps/steps";
import { togglePlayback, adjustTempo } from "../features/song/song";
import { Button, Slider, InputLabel } from "@mui/material";

export function TransportControls(): ReactElement {
  const dispatch = useAppDispatch();
  const playing = useAppSelector((state) => state.song.playing);
  const tempo = useAppSelector((state) => state.song.tempo);

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
  const onTempoChange = (event: any): void => {
    if (typeof event.target.value === "number") {
      dispatch(adjustTempo(event.target.value as number));
    }
  };

  return (
    <div>
      <Button onClick={onPlayStopClick}>{playing ? "Stop" : "Play"}</Button>
      <Button onClick={onRandomizeClick}>Rand</Button>
      <Slider
        name="Tempo"
        id={`Tempo Slider`}
        min={10}
        max={999}
        onChange={onTempoChange}
        value={tempo}
      />
      <InputLabel htmlFor={`Tempo`}>{tempo}</InputLabel>
    </div>
  );
}
