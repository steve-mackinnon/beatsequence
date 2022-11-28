"use client";

import React, { ReactElement, useEffect } from "react";
import { FooterControls } from "./FooterControls";
import styles from "../styles/AudioWorkstation.module.css";
import { TrackList } from "../features/tracks/TrackList";
import { useAppDispatch } from "../hooks";
import { togglePlayback } from "../features/song/song";
import { HeaderControls } from "./HeaderControls";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { useUser } from "reactfire";

export default function AudioWorkstation(): ReactElement {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, data: user } = useUser();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && user == null && router.pathname !== "/account/login") {
      void router.push("/account/login");
    }
  }, [user, loading, router]);

  const keydownListener = (event: KeyboardEvent): void => {
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
