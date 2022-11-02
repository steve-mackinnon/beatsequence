import React, { ReactElement } from "react";
import { SequencerTrack } from "./SequencerTrack";
import { TrackParamsView } from "./TrackParamsView";
import { TrackInfoView } from "./TrackInfoView";
import { Box } from "@mui/system";
import { useAppSelector } from "../../hooks";

export interface TrackInfo {
  trackIndex: number;
}

export function TrackContainer(props: TrackInfo): ReactElement {
  const selectedView = useAppSelector(
    (state) => state.tracks[props.trackIndex].selectedView
  );

  const trackInfo = (
    <TrackInfoView
      key={`trackinfo${props.trackIndex}`}
      trackId={props.trackIndex}
    />
  );
  const trackContent =
    selectedView === "sequencer" ? (
      <SequencerTrack trackIndex={props.trackIndex} />
    ) : (
      <TrackParamsView trackId={props.trackIndex} />
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
      {trackContent}
      {trackInfo}
    </Box>
  );
}
