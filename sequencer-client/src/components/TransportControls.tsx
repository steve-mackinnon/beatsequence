import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { randomize } from "../features/steps/steps";
import { togglePlayback, adjustTempo } from "../features/song/song";
import { Button, Slider, Input, Typography } from "@mui/material";
import { Stack, Box } from "@mui/system";

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
  const onTempoSliderChange = (event: any): void => {
    if (typeof event.target.value === "number") {
      dispatch(adjustTempo(event.target.value as number));
    }
  };
  const onTempoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value === "") {
      return;
    }
    const tempo = Number(event.target.value);
    if (tempo < 10) {
      return;
    }
    dispatch(adjustTempo(Number(event.target.value)));
  };

  return (
    <Box
      sx={{
        width: "1183px",
        flexDirection: "row",
        display: "flex",
      }}
    >
      <Stack direction="row" spacing={2} flex={1} alignItems="center">
        <Typography id="tempo-slider">Tempo</Typography>
        <Slider
          name="Tempo"
          id={`Tempo Slider`}
          min={10}
          max={200}
          onChange={onTempoSliderChange}
          sx={{
            width: 100,
          }}
          value={tempo}
          size="small"
          aria-labelledby="tempo-slider"
        />
        <Input
          value={tempo}
          onChange={onTempoInputChange}
          size="small"
          aria-labelledby="tempo-slider"
          sx={{
            width: 30,
          }}
        />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" flex={2}>
        <Button onClick={onPlayStopClick}>{playing ? "Stop" : "Play"}</Button>
        <Button onClick={onRandomizeClick}>Rand</Button>
      </Stack>
    </Box>
  );
}
