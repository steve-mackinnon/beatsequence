import React, { ReactElement } from "react";
// import "../css/TrackControls.css";
import { RecoilState, useRecoilState } from "recoil";
import { TrackParams } from "../model/TrackParams";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

interface TrackControlsProps {
  trackParams: RecoilState<TrackParams>;
  fourOnTheFloorPressed: () => void;
  twoOnTheFloorPressed: () => void;
  randomizePressed: () => void;
}

export function TrackControls(props: TrackControlsProps): ReactElement {
  const [trackParams, setTrackParams] = useRecoilState<TrackParams>(
    props.trackParams
  );

  const onMuteStateChanged = (event: any): void => {
    setTrackParams((current: TrackParams) => {
      const newTrackParams = { ...current };
      newTrackParams.muted = event.target.checked;
      return newTrackParams;
    });
  };

  return (
    <div>
      <FormControlLabel
        label="Mute"
        control={
          <Checkbox
            checked={trackParams.muted}
            onChange={onMuteStateChanged}
            id="mute"
          />
        }
      />
      <Button onClick={props.fourOnTheFloorPressed}>4x4</Button>
      <Button onClick={props.twoOnTheFloorPressed}>2x4</Button>
      <Button onClick={props.randomizePressed}>Rand</Button>
    </div>
  );
}
