import { SequencerStep } from "./SequencerStep";
import React, { ReactElement, ReactNode } from "react";
import "../css/SequencerTrack.css";
import { TrackControls } from "./TrackControls";
export interface TrackInfo {
  trackIndex: number;
}

const NUM_STEPS = 16;

export function SequencerTrack(props: TrackInfo): ReactElement {
  const elements: ReactNode[] = Array(NUM_STEPS)
    .fill(0)
    .map((_, index: number) => {
      return (
        <SequencerStep
          key={`step${index}`}
          stepIndex={index}
          trackId={props.trackIndex}
        />
      );
    });
  elements.push(
    <TrackControls
      key={`trackcontrols${props.trackIndex}`}
      trackIndex={props.trackIndex}
    />
  );
  return <div className="SequencerTrack">{elements}</div>;
}
