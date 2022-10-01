import { SequencerTrack } from "./SequencerTrack";
import { songState } from "../state/SongState";
import React, { ReactElement } from "react";
import "../css/SequencerTrack.css";

export function TrackList(): ReactElement {
  const trackIndices = Array.from(Array(songState.getNumTracks()).keys());
  const tracks = trackIndices.map((index: number) => (
    <SequencerTrack key={`track${index}`} trackIndex={index} />
  ));
  return <div className="TrackList">{tracks}</div>;
}
