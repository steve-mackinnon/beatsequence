import React, { ReactElement } from "react";
// import "../css/TrackControls.css";
import { RecoilState, useRecoilState } from "recoil";
import { TrackParams } from "../model/TrackParams";

interface TrackControlsProps {
  trackParams: RecoilState<TrackParams>;
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
      <input
        type="checkbox"
        checked={trackParams.muted}
        onChange={onMuteStateChanged}
        id="mute"
      />
      <label htmlFor="mute">Mute</label>
    </div>
  );
}
