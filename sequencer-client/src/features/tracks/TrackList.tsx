import React, { ReactElement } from "react";
import { TrackContainer } from "./TrackContainer";
import { useAppSelector } from "../../hooks";
import { Box } from "@mui/system";

export function TrackList(): ReactElement {
  const numTracks = useAppSelector((state) => state.tracks.length);

  const trackIndices = Array.from(Array(numTracks).keys());
  const tracks = trackIndices.map((index: number) => (
    <TrackContainer key={`track${index}`} trackIndex={index} />
  ));
  return (
    <Box
      sx={{
        position: "absolute",
        top: "80px",
        left: "0px",
        bottom: "46px",
        overflowY: "scroll",
      }}
    >
      {tracks}
    </Box>
  );
}
