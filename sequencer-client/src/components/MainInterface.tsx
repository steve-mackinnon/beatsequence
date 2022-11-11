import React, { ReactElement, useEffect } from "react";
import { GlobalControls } from "./GlobalControls";
import styles from "./MainInterface.module.css";
import { TrackList } from "../features/tracks/TrackList";
import { useAppDispatch } from "../hooks";
import { togglePlayback } from "../features/song/song";
import { HeaderControls } from "./HeaderControls";

export default function MainInterface(): ReactElement {
  const dispatch = useAppDispatch();

  const keydownListener = (event: KeyboardEvent): void => {
    event.preventDefault();
    if (event.code.toLowerCase() === "space") {
      dispatch(togglePlayback({}));
    }
  };
  useEffect(() => {
    addEventListener("keydown", keydownListener, true);
    return () => {
      removeEventListener("keydown", keydownListener, true);
    };
  });
  return (
    <div className={styles.MainInterface}>
      <HeaderControls />
      <TrackList />
      <GlobalControls />
    </div>
  );
}
