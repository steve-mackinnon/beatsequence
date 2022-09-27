import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import { Step, StepInfo } from "../state/StepState";
import { globalTrackState } from "../state/TrackState";
import "../css/SequencerStep.css";

export function SequencerStep(props: StepInfo): ReactElement {
  const [stepState, setStepState] = useRecoilState<Step>(
    globalTrackState.steps[props.stepIndex]
  );

  const onStepEnableChange = (event: any): void => {
    setStepState((current: Step) => {
      return {
        active: event.target.checked,
        coarsePitch: current.coarsePitch,
      };
    });
  };

  const onCoarsePitchChange = (event: any): void => {
    setStepState((current: Step) => {
      return {
        active: current.active,
        coarsePitch: event.target.value,
      };
    });
  };

  return (
    <div className="SequencerStep">
      <input
        type="checkbox"
        checked={stepState.active}
        onChange={onStepEnableChange}
      />
      <input
        type="range"
        min={-64}
        max={64}
        onChange={onCoarsePitchChange}
        value={stepState.coarsePitch}
      />
    </div>
  );
}
