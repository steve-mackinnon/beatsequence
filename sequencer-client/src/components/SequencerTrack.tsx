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
  const steps: ReactNode[] = songStore
    .getStepsForTrack(props.trackIndex)
    .map((_, index: number) => {
      return (
        <SequencerStep
          key={`step${index}`}
          trackState={songStore.getTrackStateAtom(props.trackIndex)}
          stepInfo={{
            trackIndex: props.trackIndex,
            stepIndex: index,
          }}
        />
      );
    });
  steps.push(
    <TrackControls
      key={`trackcontrols${props.trackIndex}`}
      trackState={songStore.getTrackStateAtom(props.trackIndex)}
      twoOnTheFloorPressed={() =>
        sequencerEngine.setTwoOnTheFloorSequence(props.trackIndex)
      }
      fourOnTheFloorPressed={() =>
        sequencerEngine.setFourOnTheFloorSequence(props.trackIndex)
      }
      randomizePressed={() => sequencerEngine.randomizeTrack(props.trackIndex)}
    />
  );
  return <div className="SequencerTrack">{steps}</div>;
}
