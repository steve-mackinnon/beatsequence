import React, { ReactElement, useContext, useEffect } from "react";
import { FooterControls } from "./FooterControls";
import styles from "../styles/AudioWorkstation.module.css";
import { TrackList } from "../features/tracks/TrackList";
import { useAppDispatch } from "../hooks";
import { togglePlayback } from "../features/song/song";
import { HeaderControls } from "./HeaderControls";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { hotkeySuppressor } from "../hotkeySuppressor";

export default function AudioWorkstation(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && user == null) {
      navigate("/account/login");
    }
  }, [user, loading, navigate]);

  const keydownListener = (event: KeyboardEvent): void => {
    if (hotkeySuppressor.blockHotkeys) {
      return;
    }
    if (event.code.toLowerCase() === "space") {
      event.preventDefault();
      dispatch(togglePlayback({}));
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
