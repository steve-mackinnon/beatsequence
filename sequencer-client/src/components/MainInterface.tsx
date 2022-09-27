import React, { ReactElement } from "react";
import { SequencerTrack } from "./SequencerTrack";
import { TransportControls } from "./TransportControls";
import "../css/MainInterface.css";

export default function MainInterface(): ReactElement {
  return (
    <div className="MainInterface">
      <TransportControls />
      <SequencerTrack />;
    </div>
  );
}
