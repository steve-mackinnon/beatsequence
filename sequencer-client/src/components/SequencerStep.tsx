import React, { ReactElement, useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { StepInfo } from "../state/StepState";
import { songState } from "../state/SongState";
import { StepState } from "../audio/SequencerEngine";
import { sequencerEngine } from "../state/AudioEngineState";
import "../css/SequencerStep.css";

export function SequencerStep(props: StepInfo): ReactElement {
  const [stepState, setStepState] = useRecoilState<StepState>(
    songState.getStepState(props.trackIndex, props.stepIndex)
  );
  const [isCurrentStep, setIsCurrentStep] = useState(false);

  const requestRef = useRef<number>();
  const maybeUpdateStyle = (): void => {
    setIsCurrentStep(sequencerEngine.getCurrentStep() === props.stepIndex);
    requestRef.current = requestAnimationFrame(maybeUpdateStyle);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(maybeUpdateStyle);
    return () => {
      if (requestRef.current === undefined) {
        return;
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  requestAnimationFrame(maybeUpdateStyle);

  const onStepEnableChange = (event: any): void => {
    setStepState((current: StepState) => {
      return {
        active: event.target.checked,
        coarsePitch: current.coarsePitch,
      };
    });
  };

  const onCoarsePitchChange = (event: any): void => {
    setStepState((current: StepState) => {
      return {
        active: current.active,
        coarsePitch: event.target.value,
      };
    });
  };
  const className = "SequencerStep" + (isCurrentStep ? "-active" : "");
  return (
    <div className={className}>
      <input
        type="checkbox"
        checked={stepState.active}
        onChange={onStepEnableChange}
      />
      <input
        name="Coarse Pitch"
        type="range"
        id={`Step ${props.stepIndex.toString()} Coarse Pitch`}
        min={-48}
        max={48}
        onChange={onCoarsePitchChange}
        value={stepState.coarsePitch}
      />
      <output
        name="Coarse Pitch"
        htmlFor={`Step ${props.stepIndex.toString()} Coarse Pitch`}
      >
        {stepState.coarsePitch}
      </output>
    </div>
  );
}
