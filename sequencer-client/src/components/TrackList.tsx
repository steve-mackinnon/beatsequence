import { SequencerTrack } from "./SequencerTrack";
import React, { ReactElement } from "react";
import { useAppSelector } from "../hooks";
import "../css/SequencerTrack.css";

export function TrackList(): ReactElement {
  const numTracks = useAppSelector(
    (state) => state.persistedReducer.tracks.length
  );

  const trackIndices = Array.from(Array(numTracks).keys());
  const tracks = trackIndices.map((index: number) => (
    <SequencerTrack key={`track${index}`} trackIndex={index} />
  ));
  return <div className="TrackList">{tracks}</div>;
}
