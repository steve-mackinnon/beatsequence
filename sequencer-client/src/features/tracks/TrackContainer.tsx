import React, { ReactElement } from "react";
import { SequencerTrack } from "./SequencerTrack";
import { TrackParamsView } from "./TrackParamsView";
import { TrackInfoView } from "./TrackInfoView";
import { Box } from "@mui/system";
import { useAppSelector } from "../../hooks";
import {
  selectTrackHasCoarsePitchParam,
  paramInfoForGeneratorType,
} from "./tracks";

export interface TrackInfo {
  trackIndex: number;
}

export function TrackContainer(props: TrackInfo): ReactElement {
  const selectedView = useAppSelector((state) => state.song.selectedView);
  const showCoarsePitchSlider = useAppSelector((state) =>
    selectTrackHasCoarsePitchParam(state, props.trackIndex)
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
      <TrackParamsView
        trackId={props.trackIndex}
        params={paramInfoForGeneratorType(props.trackIndex)}
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
        height: {
          mobile: showCoarsePitchSlider ? 500 : 250,
          tablet: showCoarsePitchSlider ? 218 : 126,
          desktop: showCoarsePitchSlider ? 115 : 64,
        },
      }}
    >
      {trackContent}
      {trackInfo}
    </Box>
  );
}
