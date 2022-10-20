import React, { ReactElement, useEffect } from "react";
import { TransportControls } from "./TransportControls";
import "../css/MainInterface.css";
import { TrackList } from "./TrackList";
import { useAppDispatch } from "../hooks";
import { togglePlayback } from "../features/song/song";

export default function MainInterface(): ReactElement {
  const dispatch = useAppDispatch();

  const keydownListener = (event: KeyboardEvent): void => {
    if (event.code.toLowerCase() === "space") {
      dispatch(togglePlayback({}));
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
