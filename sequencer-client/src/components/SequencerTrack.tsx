import { SequencerStep } from "./SequencerStep";
import { songState } from "../state/SongState";
import React, { ReactElement, ReactNode } from "react";
import "../css/SequencerTrack.css";
import { TrackControls } from "./TrackControls";
import { sequencerEngine } from "../recoil/audioEngine";
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
          trackState={songState.getTrackStateAtom(props.trackIndex)}
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
      trackState={songState.getTrackStateAtom(props.trackIndex)}
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
