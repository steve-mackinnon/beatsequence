import React, { ReactElement } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { TrackState } from "../recoil/track";
import { Button, ButtonProps, Grid } from "@mui/material";
import { styled } from "@mui/system";
import songStore from "../recoil/song";
import { GeneratorControls } from "./GeneratorControls";

interface TrackControlsProps {
  trackState: RecoilState<TrackState>;
  trackIndex: number;
  fourOnTheFloorPressed: () => void;
  twoOnTheFloorPressed: () => void;
  randomizePressed: () => void;
}

// const TrackControlsContainer = styled("div")({
//   minWidth: 100,
//   maxWidth: 100,
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "flex-start",
//   minHeight: 66,
//   maxHeight: 66,
// });
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

  const onMuteStateChanged = (_: any): void => {
    setTrackState((current: TrackState) => {
      const newTrackState = { ...current };
      newTrackState.muted = !newTrackState.muted;
      return newTrackState;
    });
  };

  return (
    <Grid container rowSpacing={1} maxHeight={80}>
      <Grid xs={3}>
        <TrackButton onClick={onMuteStateChanged}>
          {trackState.muted ? "Unmute" : "Mute"}
        </TrackButton>
      </Grid>
      <Grid xs={3}>
        <TrackButton onClick={props.fourOnTheFloorPressed}>4x4</TrackButton>
      </Grid>
      <Grid xs={3}>
        <TrackButton onClick={props.twoOnTheFloorPressed}>2x4</TrackButton>
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
