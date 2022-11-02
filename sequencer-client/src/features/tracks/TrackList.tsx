import React, { ReactElement, useRef, useEffect } from "react";
import { TrackContainer } from "./TrackContainer";
import { useAppSelector } from "../../hooks";
import "../../css/SequencerTrack.css";
import { Box } from "@mui/system";

export function TrackList(): ReactElement {
  const numTracks = useAppSelector((state) => state.tracks.length);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Automatically focus the container so that the initial touch event
    // can be used to scroll.
    if (containerRef.current == null) {
      return;
    }
    containerRef.current.focus();
  });
  const trackIndices = Array.from(Array(numTracks).keys());
  const tracks = trackIndices.map((index: number) => (
    <TrackContainer key={`track${index}`} trackIndex={index} />
  ));
  return (
    <Box
      sx={{
        width: "100%",
        height: "78%",
        overflowY: "scroll",
      }}
      ref={containerRef}
    >
      {tracks}
    </Box>
  );
}
