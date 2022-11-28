"use client";

import React, { ReactElement, RefObject, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { togglePlayback, resetState } from "../features/song/song";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause, Casino, Clear } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { randomize } from "../features/steps/steps";

export function FooterControls(): ReactElement {
  const dispatch = useAppDispatch();
  const playing = useAppSelector((state) => state.song.playing);
  const playRef = useRef<HTMLButtonElement>(null);

  const onPlayStopClick = (_e: any): void => {
    dispatch(togglePlayback({}));
  };
  const onRandomizeClick = (_e: any): void => {
    dispatch(randomize({ trackId: undefined, seed: Date.now().toString() }));
  };
  const onResetStateClick = (_e: any): void => {
    dispatch(resetState({}));
  };
  const blurOnFocus = (ref: RefObject<HTMLButtonElement>): void => {
    if (ref.current != null) {
      ref.current.blur();
    }
  };

  return (
    <Stack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      direction="row"
      justifyContent="space-evenly"
      overflow="hidden"
      sx={{
        backgroundColor: "#373738",
      }}
    >
      <IconButton onClick={onResetStateClick}>
        <Clear color="action" />
      </IconButton>
      <IconButton onClick={onRandomizeClick}>
        <Casino color="action" />
      </IconButton>
      <IconButton
        onClick={onPlayStopClick}
        onFocus={(_) => blurOnFocus(playRef)}
        ref={playRef}
      >
        {playing ? <Pause /> : <PlayArrow />}
      </IconButton>
    </Stack>
  );
}
