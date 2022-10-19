import React, { ReactElement } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { TrackState } from "../recoil/track";
import { Button, ButtonProps, Grid } from "@mui/material";
import { styled } from "@mui/system";
import songStore from "../recoil/song";
import { GeneratorControls } from "./GeneratorControls";
import { fourOnTheFloor, twoOnTheFloor } from "../features/steps/steps";
import { useAppDispatch } from "../hooks";

interface TrackControlsProps {
  trackState: RecoilState<TrackState>;
  trackIndex: number;
  randomizePressed: () => void;
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
  const [trackState, setTrackState] = useRecoilState<TrackState>(
    props.trackState
  );
  const dispatch = useAppDispatch();

  const onMuteStateChanged = (_: any): void => {
    setTrackState((current: TrackState) => {
      const newTrackState = { ...current };
      newTrackState.muted = !newTrackState.muted;
      return newTrackState;
    });
  };

  const twoOnTheFloorPressed = (_: any): void => {
    dispatch(twoOnTheFloor({ trackId: props.trackIndex }));
  };
  const fourOnTheFloorPressed = (_: any): void => {
    dispatch(fourOnTheFloor({ trackId: props.trackIndex }));
  };
  return (
    <Grid container rowSpacing={1} maxHeight={80}>
      <Grid xs={3}>
        <TrackButton onClick={onMuteStateChanged}>
          {trackState.muted ? "Unmute" : "Mute"}
        </TrackButton>
      </Grid>
      <Grid xs={3}>
        <TrackButton onClick={fourOnTheFloorPressed}>4x4</TrackButton>
      </Grid>
      <Grid xs={3}>
        <TrackButton onClick={twoOnTheFloorPressed}>2x4</TrackButton>
      </Grid>
      <Grid xs={3}>
        <TrackButton onClick={props.randomizePressed}>Rand</TrackButton>
      </Grid>
      <Grid xs={12}>
        <GeneratorControls
          key={`gencontrols${props.trackIndex}`}
          trackState={songStore.getTrackStateAtom(props.trackIndex)}
          trackIndex={props.trackIndex}
        />
      </Grid>
    </Grid>
  );
}
