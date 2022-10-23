import React, { ReactElement, RefObject, useRef } from "react";
import { Button, ButtonProps, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { GeneratorControls } from "./GeneratorControls";
import {
  fourOnTheFloor,
  twoOnTheFloor,
  randomize,
} from "../features/steps/steps";
import { mute, unmute } from "../features/tracks/tracks";
import { useAppSelector, useAppDispatch } from "../hooks";

interface TrackControlsProps {
  trackIndex: number;
}

const TrackButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: 40,
  minHeight: 20,
  maxHeight: 20,
  paddingLeft: 0,
  paddingRight: 0,
  marginLeft: 0,
  marginRight: 0,
}));

export function TrackControls(props: TrackControlsProps): ReactElement {
  const muted = useAppSelector(
    (state) => state.persistedReducer.tracks[props.trackIndex].muted
  );
  const dispatch = useAppDispatch();
  const twoOnTheFloorRef = useRef<HTMLButtonElement>(null);
  const fourOnTheFloorRef = useRef<HTMLButtonElement>(null);
  const randomizeRef = useRef<HTMLButtonElement>(null);
  const muteRef = useRef<HTMLButtonElement>(null);

  const onMuteStateChanged = (_: any): void => {
    if (muted) {
      dispatch(unmute({ trackId: props.trackIndex }));
    } else {
      dispatch(mute({ trackId: props.trackIndex }));
    }
  };

  const blurOnFocus = (ref: RefObject<HTMLButtonElement>): void => {
    if (ref.current != null) {
      ref.current.blur();
    }
  };
  const twoOnTheFloorPressed = (_: any): void => {
    dispatch(twoOnTheFloor({ trackId: props.trackIndex }));
  };
  const fourOnTheFloorPressed = (_: any): void => {
    dispatch(fourOnTheFloor({ trackId: props.trackIndex }));
  };
  const randomizePressed = (_: any): void => {
    dispatch(
      randomize({ trackId: props.trackIndex, seed: Date.now().toString() })
    );
  };
  return (
    <Grid container rowSpacing={1} maxHeight={80}>
      <Grid xs={3}>
        <TrackButton
          onClick={onMuteStateChanged}
          ref={muteRef}
          onFocus={(_) => blurOnFocus(muteRef)}
        >
          {muted ? "Unmute" : "Mute"}
        </TrackButton>
      </Grid>
      <Grid xs={3}>
        <TrackButton
          ref={fourOnTheFloorRef}
          onFocus={(_) => blurOnFocus(fourOnTheFloorRef)}
          onClick={fourOnTheFloorPressed}
        >
          4x4
        </TrackButton>
      </Grid>
      <Grid xs={3}>
        <TrackButton
          ref={twoOnTheFloorRef}
          onFocus={(_) => blurOnFocus(twoOnTheFloorRef)}
          onClick={twoOnTheFloorPressed}
        >
          2x4
        </TrackButton>
      </Grid>
      <Grid xs={3}>
        <TrackButton
          ref={randomizeRef}
          onFocus={(_) => blurOnFocus(randomizeRef)}
          onClick={randomizePressed}
        >
          Rand
        </TrackButton>
      </Grid>
      <Grid xs={12}>
        <GeneratorControls
          key={`gencontrols${props.trackIndex}`}
          trackIndex={props.trackIndex}
        />
      </Grid>
    </Grid>
  );
}
