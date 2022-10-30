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
        <Grid item key={index}>
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
      }}
    >
      {trackInfo}
      <Grid
        container
        rowSpacing={0}
        maxWidth={{ mobile: 245, tablet: 500, laptop: 900 }}
        columns={{ xs: 8, sm: 8, md: 16, lg: 16, xl: 16 }}
      >
        {steps}
      </Grid>
    </Box>
  );
}
