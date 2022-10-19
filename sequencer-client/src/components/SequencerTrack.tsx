import { SequencerStep } from "./SequencerStep";
import songStore from "../recoil/song";
import React, { ReactElement, ReactNode } from "react";
import "../css/SequencerTrack.css";
import { TrackControls } from "./TrackControls";
import { sequencerEngine } from "../recoil/audioEngine";
export interface TrackInfo {
  trackIndex: number;
}

export function SequencerTrack(props: TrackInfo): ReactElement {
  const elements: ReactNode[] = songStore
    .getStepsForTrack(props.trackIndex)
    .map((_, index: number) => {
      return (
        <SequencerStep
          key={`step${index}`}
          trackState={songStore.getTrackStateAtom(props.trackIndex)}
          stepIndex={index}
          trackId={props.trackIndex}
        />
      );
    });
  elements.push(
    <TrackControls
      key={`trackcontrols${props.trackIndex}`}
      trackIndex={props.trackIndex}
      trackState={songStore.getTrackStateAtom(props.trackIndex)}
      randomizePressed={() => sequencerEngine.randomizeTrack(props.trackIndex)}
    />
  );
  return <div className="SequencerTrack">{elements}</div>;
}
