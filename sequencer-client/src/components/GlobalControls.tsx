import React, { ReactElement, RefObject, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { randomize } from "../features/steps/steps";
import { togglePlayback, resetState } from "../features/song/song";
import { Button, IconButton } from "@mui/material";
import { PlayArrow, Pause, Casino, RestartAlt } from "@mui/icons-material";
import { Stack } from "@mui/system";

export function GlobalControls(): ReactElement {
  const dispatch = useAppDispatch();
  const playing = useAppSelector((state) => state.song.playing);
  const playRef = useRef<HTMLButtonElement>(null);
  const randRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

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
  const onInitClick = (event: any): void => {
    dispatch(resetState({}));
  };

  const blurOnFocus = (ref: RefObject<HTMLButtonElement>): void => {
    if (ref.current != null) {
      ref.current.blur();
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      width="100%"
      sx={{
        backgroundColor: "#373738",
      }}
    >
      <IconButton
        onClick={onRandomizeClick}
        onFocus={(_) => blurOnFocus(randRef)}
        ref={randRef}
      >
        <Casino />
      </IconButton>
      <Button
        onClick={onInitClick}
        ref={resetRef}
        onFocus={(_) => blurOnFocus(resetRef)}
      >
        <RestartAlt />
      </Button>
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
