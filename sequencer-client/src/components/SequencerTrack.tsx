import { SequencerStep } from "./SequencerStep";
import { songState } from "../state/SongState";
import React, { ReactElement, ReactNode } from "react";
import "../css/SequencerTrack.css";

export interface TrackInfo {
  trackIndex: number;
}

export function SequencerTrack(props: TrackInfo): ReactElement {
  const steps: ReactNode[] = songState
    .getStepsForTrack(props.trackIndex)
    .map((_, index: number) => {
      return (
        <SequencerStep
          key={`step${index}`}
          stepIndex={index}
          trackIndex={props.trackIndex}
        />
      );
    });
  return <div className="SequencerTrack">{steps}</div>;
}
