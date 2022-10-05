import React, { ReactElement } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { TrackParams } from "../model/TrackParams";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

interface TrackControlsProps {
  trackParams: RecoilState<TrackParams>;
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
  const [trackParams, setTrackParams] = useRecoilState<TrackParams>(
    props.trackParams
  );

  const onMuteStateChanged = (_: any): void => {
    setTrackParams((current: TrackParams) => {
      const newTrackParams = { ...current };
      newTrackParams.muted = !newTrackParams.muted;
      return newTrackParams;
    });
  };

  return (
    <TrackControlsContainer>
      <Button onClick={onMuteStateChanged}>
        {trackParams.muted ? "Unmute" : "Mute"}
      </Button>
      <Button onClick={props.fourOnTheFloorPressed}>4x4</Button>
      <Button onClick={props.twoOnTheFloorPressed}>2x4</Button>
      <Button onClick={props.randomizePressed}>Rand</Button>
    </TrackControlsContainer>
  );
}
