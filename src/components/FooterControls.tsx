import React, { ReactElement, RefObject, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { togglePlayback } from "../reducers/songSlice";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause, Casino } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { randomize } from "../reducers/stepsSlice";
import { ScaleSelectionToolbarButtons } from "./ScaleSelectionToolbarButtons";

export function FooterControls(): ReactElement {
  const dispatch = useAppDispatch();
  const playing = useAppSelector((state) => state.song.playing);
  const playRef = useRef<HTMLButtonElement>(null);

  const onPlayStopClick = (_e: any): void => {
    dispatch(togglePlayback(undefined));
  };
  const onRandomizeClick = (_e: any): void => {
    dispatch(randomize({ trackId: undefined, seed: Date.now().toString() }));
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
      justifyContent="center"
      overflow="hidden"
      spacing={5}
      sx={{
        backgroundColor: "#373738",
      }}
    >
      <div />
      <ScaleSelectionToolbarButtons />
      <IconButton
        onClick={onRandomizeClick}
        aria-label={"Randomize all tracks"}
      >
        <Casino color="action" />
      </IconButton>
      <IconButton
        onClick={onPlayStopClick}
        onFocus={(_) => blurOnFocus(playRef)}
        ref={playRef}
        aria-label={"Toggle playback"}
      >
        {playing ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div />
    </Stack>
  );
}
