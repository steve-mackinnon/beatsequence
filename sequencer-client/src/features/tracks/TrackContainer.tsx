import React, { ReactElement } from "react";
import { SequencerTrack } from "./SequencerTrack";
import { TrackParamsView } from "./TrackParamsView";
import { TrackInfoView } from "./TrackInfoView";
import { Box } from "@mui/system";
import { paramInfoForGeneratorType } from "../../entities/paramInfo";
import { Stack } from "@mui/material";
import { useAppSelector } from "../../hooks";

export interface TrackInfo {
  trackIndex: number;
}

export function TrackContainer(props: TrackInfo): ReactElement {
  const paramViewVisible = useAppSelector(
    (state) => state.tracks[props.trackIndex].paramViewVisible
  );
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
        justifyContent: "space-evenly",
        flexFlow: {
          mobile: "row",
          tablet: "row",
          desktop: "row",
        },
        paddingBottom: "10px",
        paddingLeft: "15px",
        paddingTop: "10px",
      }}
    >
      <Stack flexDirection="column">
        <SequencerTrack trackIndex={props.trackIndex} />
        {paramViewVisible && (
          <TrackParamsView
            trackId={props.trackIndex}
            params={paramInfoForGeneratorType(props.trackIndex)}
          />
        )}
      </Stack>
      {trackInfo}
    </Box>
  );
}
