import React, { ReactElement, useState, useRef } from "react";
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
  const updateTrackName = (_: any): void => {
    if (nameEditFieldRef.current == null) {
      return;
    }
    dispatch(
      setDisplayName({
        trackId: props.trackId,
        name: nameEditFieldRef.current.value,
      })
    );
    setIsEditingName(false);
  };
  const beginEditingTrackName = (_: any): void => {
    setIsEditingName(true);
  };

  const nameEditFieldRef = useRef<HTMLInputElement>(null);
  const [isEditingName, setIsEditingName] = useState(false);

  const nameElement = isEditingName ? (
    <TextField
      ref={nameEditFieldRef}
      onBlur={updateTrackName}
      value={trackName}
    />
  ) : (
    <p onDoubleClick={beginEditingTrackName}>{trackName}</p>
  );
  return (
    <Grid container>
      <Grid xs={8}>{nameElement}</Grid>
    </Grid>
  );
}
