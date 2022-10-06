import React, { ReactElement } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { TrackState } from "../model/TrackState";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

interface TrackControlsProps {
  trackState: RecoilState<TrackState>;
  fourOnTheFloorPressed: () => void;
  twoOnTheFloorPressed: () => void;
  randomizePressed: () => void;
}

const TrackControlsContainer = styled("div")({
  minWidth: 100,
  maxWidth: 100,
  display: "flex",
  flexDirection: "row",
  minHeight: 66,
  maxHeight: 66,
});
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
    <TrackControlsContainer>
      <Button onClick={onMuteStateChanged}>
        {trackState.muted ? "Unmute" : "Mute"}
      </Button>
      <Button onClick={props.fourOnTheFloorPressed}>4x4</Button>
      <Button onClick={props.twoOnTheFloorPressed}>2x4</Button>
      <Button onClick={props.randomizePressed}>Rand</Button>
    </TrackControlsContainer>
  );
}
