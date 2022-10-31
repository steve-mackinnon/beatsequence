import { SequencerStep } from "./SequencerStep";
import React, { ReactElement, ReactNode } from "react";
import "../css/SequencerTrack.css";
import { TrackInfoView } from "../features/tracks/TrackInfoView";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
export interface TrackInfo {
  trackIndex: number;
}

const NUM_STEPS = 16;

export function SequencerTrack(props: TrackInfo): ReactElement {
  const steps: ReactNode[] = Array(NUM_STEPS)
    .fill(0)
    .map((_, index: number) => {
      return (
        <Grid item key={index} mobile={1} tablet={1} desktop={1}>
          <SequencerStep
            key={`step${index}`}
            stepIndex={index}
            trackId={props.trackIndex}
          />
        </Grid>
      );
    });
  const trackInfo = (
    <TrackInfoView
      key={`trackinfo${props.trackIndex}`}
      trackId={props.trackIndex}
    />
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexFlow: "row",
        paddingBottom: "10px",
      }}
    >
      {trackInfo}
      <Grid
        container
        rowSpacing={0}
        spacing={1}
        columns={{ mobile: 4, tablet: 8, desktop: 16 }}
      >
        {steps}
      </Grid>
    </Box>
  );
}
