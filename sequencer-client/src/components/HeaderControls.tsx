import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { adjustTempo } from "../features/song/song";
import { Slider, Input, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { GlobalMenu } from "./GlobalMenu";

export function HeaderControls(): ReactElement {
  const dispatch = useAppDispatch();
  const tempo = useAppSelector((state) => state.song.tempo);

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
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      alignItems="center"
      justifyContent="flex-start"
      paddingX="15px"
      paddingY={1}
    >
      <GlobalMenu />
      <Stack direction="row" alignItems="center" width={200} spacing={2}>
        <Typography id="tempo-slider">Tempo</Typography>
        <Slider
          name="Tempo"
          id={`Tempo Slider`}
          min={10}
          max={200}
          onChange={onTempoSliderChange}
          sx={{
            maxWidth: 100,
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
            minWidth: 28,
            maxWidth: 28,
          }}
        />
      </Stack>
      <div />
    </Stack>
  );
}
