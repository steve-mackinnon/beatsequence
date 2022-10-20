import React, { ReactElement, useEffect } from "react";
import { TransportControls } from "./TransportControls";
import "../css/MainInterface.css";
import { TrackList } from "./TrackList";
import { audioEngine } from "../engine";

export default function MainInterface(): ReactElement {
  const keydownListener = (event: KeyboardEvent): void => {
    if (event.code.toLowerCase() === "space") {
      audioEngine.playing = !audioEngine.playing;
    }
  };
  useEffect(() => {
    addEventListener("keydown", keydownListener);
    return () => {
      removeEventListener("keydown", keydownListener);
    };
  });
  return (
    <div className="MainInterface">
      <TransportControls />
      <TrackList />
    </div>
  );
}
