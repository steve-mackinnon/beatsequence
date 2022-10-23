import React, { ReactElement, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Grid, TextField } from "@mui/material";
import { setDisplayName } from "./tracks";

export interface TrackInfoProps {
  trackId: number;
}
export function TrackInfoView(props: TrackInfoProps): ReactElement {
  const dispatch = useAppDispatch();
  const trackName = useAppSelector(
    (state) => state.persistedReducer.tracks[props.trackId].displayName
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const trackNameEditRef = useRef<HTMLInputElement>(null);

  const updateTrackName = (e: any): void => {
    setIsEditingName(false);
    const name = e.target.value;
    if (name == null || name === "") {
      return;
    }
    dispatch(
      setDisplayName({
        trackId: props.trackId,
        name,
      })
    );
  };
  const beginEditingTrackName = (_: any): void => {
    setIsEditingName(true);
  };

  const nameElement = isEditingName ? (
    <TextField
      onBlur={updateTrackName}
      onKeyDown={(e: any) => {
        if (e.key === "Escape") {
          setIsEditingName(false);
          return;
        }
        if (e.key === "Enter" || e.keyCode === 13) {
          updateTrackName(e);
        }
      }}
      onFocus={(e: any) => e.target.select()}
      onAbort={(_: any) => setIsEditingName(false)}
      defaultValue={trackName}
      ref={trackNameEditRef}
      autoFocus
    />
  ) : (
    <p onDoubleClick={beginEditingTrackName}>{trackName}</p>
  );
  return (
    <Grid container minWidth={100} maxWidth={100}>
      <Grid xs={8}>{nameElement}</Grid>
    </Grid>
  );
}
