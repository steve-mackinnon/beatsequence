import React, { ReactElement, RefObject, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { randomize } from "../features/steps/steps";
import { togglePlayback, resetState } from "../features/song/song";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";

export function FooterControls(): ReactElement {
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
    <Stack direction="row" justifyContent="center">
      <Button
        onClick={onPlayStopClick}
        onFocus={(_) => blurOnFocus(playRef)}
        ref={playRef}
      >
        {playing ? "Stop" : "Play"}
      </Button>
      <Button
        onClick={onRandomizeClick}
        onFocus={(_) => blurOnFocus(randRef)}
        ref={randRef}
      >
        Rand
      </Button>
      <Button
        onClick={onInitClick}
        ref={resetRef}
        onFocus={(_) => blurOnFocus(resetRef)}
      >
        Reset
      </Button>
    </Stack>
  );
}
