import React, { ReactElement, RefObject, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { togglePlayback } from "../features/song/song";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import { Stack } from "@mui/system";

export function FooterControls(): ReactElement {
  const dispatch = useAppDispatch();
  const playing = useAppSelector((state) => state.song.playing);
  const playRef = useRef<HTMLButtonElement>(null);

  const onPlayStopClick = (event: any): void => {
    dispatch(togglePlayback({}));
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
      sx={{
        backgroundColor: "#373738",
      }}
    >
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
