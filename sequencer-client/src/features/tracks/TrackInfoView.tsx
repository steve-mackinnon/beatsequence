import React, { ReactElement } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Grid } from "@mui/material";
import { setDisplayName } from "./tracks";
import { EditableLabel } from "../../common/EditableLabel";

export interface TrackInfoProps {
  trackId: number;
}
export function TrackInfoView(props: TrackInfoProps): ReactElement {
  const dispatch = useAppDispatch();
  const trackName = useAppSelector(
    (state) => state.persistedReducer.tracks[props.trackId].displayName
  );

  const updateTrackName = (name: string): string => {
    dispatch(
      setDisplayName({
        trackId: props.trackId,
        name,
      })
    );
    return name;
  };
  return (
    <Grid container minWidth={100} maxWidth={100}>
      <Grid xs={8}>
        <EditableLabel
          onEditComplete={updateTrackName}
          getValue={() => trackName}
        />
      </Grid>
    </Grid>
  );
}
