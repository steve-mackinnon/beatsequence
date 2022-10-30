import { SequencerTrack } from "./SequencerTrack";
import React, { ReactElement } from "react";
import { useAppSelector } from "../hooks";
import "../css/SequencerTrack.css";
import { Box } from "@mui/system";

export function TrackList(): ReactElement {
  const numTracks = useAppSelector((state) => state.tracks.length);

  const trackIndices = Array.from(Array(numTracks).keys());
  const tracks = trackIndices.map((index: number) => (
    <SequencerTrack key={`track${index}`} trackIndex={index} />
  ));
  return (
    <Box
      sx={{
        width: "100%",
        height: "78%",
        overflowY: "scroll",
      }}
    >
      {tracks}
    </Box>
  );
}
