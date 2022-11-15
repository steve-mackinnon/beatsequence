import React, { ReactElement, useContext, useEffect } from "react";
import { GlobalControls } from "./GlobalControls";
import styles from "./AudioWorkstation.module.css";
import { TrackList } from "../features/tracks/TrackList";
import { useAppDispatch } from "../hooks";
import { togglePlayback } from "../features/song/song";
import { HeaderControls } from "./HeaderControls";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/authContext";
// import { useRouter } from "next/router";
import { Typography } from "@mui/material";

export default function AudioWorkstation(): ReactElement {
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const auth = useContext(AuthContext);
  const [user, loading, authError] = useAuthState(auth);
  // useEffect(() => {
  //   if (
  //     (user == null || authError != null) &&
  //     router.pathname !== "/account/login"
  //   ) {
  //     void router.push("/account/login");
  //   } else if (router.pathname !== "/") {
  //     void router.push("/");
  //   }
  // });
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
  if (user == null || authError != null) {
    return <div>Not logged in</div>;
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <div className={styles.AudioWorkstation}>
      <HeaderControls />
      <TrackList />
      <GlobalControls />
    </div>
  );
}
