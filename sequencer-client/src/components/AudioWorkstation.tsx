import React, { ReactElement, useContext, useEffect } from "react";
import { FooterControls } from "./FooterControls";
import styles from "../styles/AudioWorkstation.module.css";
import { TrackList } from "../features/tracks/TrackList";
import { useAppDispatch } from "../hooks";
import { togglePlayback } from "../features/song/song";
import { HeaderControls } from "./HeaderControls";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/authContext";
import { Typography } from "@mui/material";
import { hotkeySuppressor } from "../hotkeySuppressor";

export default function AudioWorkstation(): ReactElement {
  const dispatch = useAppDispatch();
  const auth = useContext(AuthContext);
  const [, loading] = useAuthState(auth);

  useEffect(() => {
    return () => {
      // Ensure playback stops when the audio workstation isn't visible
      dispatch(togglePlayback(false));
    };
  });
  const keydownListener = (event: KeyboardEvent): void => {
    if (hotkeySuppressor.blockHotkeys) {
      return;
    }
    if (event.code.toLowerCase() === "space") {
      event.preventDefault();
      dispatch(togglePlayback(undefined));
    }
  };
  useEffect(() => {
    addEventListener("keydown", keydownListener, true);
    return () => {
      removeEventListener("keydown", keydownListener, true);
    };
  });
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <div className={styles.AudioWorkstation}>
      <HeaderControls />
      <TrackList />
      <FooterControls />
    </div>
  );
}
