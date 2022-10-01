import React, { ReactElement } from "react";
import { TransportControls } from "./TransportControls";
import "../css/MainInterface.css";
import { TrackList } from "./TrackList";

export default function MainInterface(): ReactElement {
  return (
    <div className="MainInterface">
      <TransportControls />
      <TrackList />
    </div>
  );
}
