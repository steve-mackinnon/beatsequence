import { SequencerStep } from "../steps/SequencerStep";
import React, { ReactElement, ReactNode } from "react";
import "../../css/SequencerTrack.css";
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
  return (
    <Grid
      width="82%"
      container
      rowSpacing={0}
      spacing={1}
      columns={{ mobile: 4, tablet: 8, desktop: 16 }}
    >
      {steps}
    </Grid>
  );
}