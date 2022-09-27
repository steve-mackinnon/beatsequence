import { SequencerStep } from "./SequencerStep";
import { globalTrackState } from "../state/TrackState";
import React, { ReactElement, ReactNode } from "react";
import "../css/SequencerTrack.css";

export function SequencerTrack(): ReactElement {
  const steps: ReactNode[] = globalTrackState.steps.map((_, index: number) => {
    return (
      <SequencerStep key={`step${index}`} stepIndex={index} trackIndex={0} />
    );
  });
  return <div className="SequencerTrack">{steps}</div>;
}
