import React, { ReactElement, useEffect } from "react";
import { FooterControls } from "./FooterControls";
import "../css/MainInterface.css";
import { TrackList } from "../features/tracks/TrackList";
import { useAppDispatch } from "../hooks";
import { togglePlayback } from "../features/song/song";
import { HeaderControls } from "./HeaderControls";

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
      <HeaderControls />
      <TrackList />
      <FooterControls />
    </div>
  );
}
