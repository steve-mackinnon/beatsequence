import { SequencerStep } from "./SequencerStep";
import React, { ReactElement, ReactNode } from "react";
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
      flex={1}
      container
      rowSpacing={0}
      spacing={1}
      width={{
        mobile: "300px",
        tablet: "600px",
      }}
      columns={{ mobile: 4, tablet: 8 }}
    >
      {steps}
    </Grid>
  );
}
