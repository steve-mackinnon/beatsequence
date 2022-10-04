import React, { ReactElement } from "react";
// import "../css/TrackControls.css";
import { RecoilState, useRecoilState } from "recoil";
import { TrackParams } from "../model/TrackParams";

interface TrackControlsProps {
  trackParams: RecoilState<TrackParams>;
  fourOnTheFloorPressed: () => void;
  twoOnTheFloorPressed: () => void;
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
      <label htmlFor="mute">Mute</label>
      <input
        type="checkbox"
        checked={trackParams.muted}
        onChange={onMuteStateChanged}
        id="mute"
      />
      <button onClick={props.fourOnTheFloorPressed}>4x4</button>
      <button onClick={props.twoOnTheFloorPressed}>2x4</button>
    </div>
  );
}
