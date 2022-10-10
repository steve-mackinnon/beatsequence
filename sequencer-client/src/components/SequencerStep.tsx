import React, { ReactElement, useRef, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, RecoilState } from "recoil";
import { StepInfo } from "../state/StepState";
import { songState } from "../state/SongState";
import { StepState } from "../audio/SequencerEngine";
import { sequencerEngine } from "../state/AudioEngineState";
import { TrackState } from "../model/TrackState";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";

import "../css/SequencerStep.css";

export interface SequencerStepProps {
  stepInfo: StepInfo;
  trackState: RecoilState<TrackState>;
}
export function SequencerStep(props: SequencerStepProps): ReactElement {
  const [stepState, setStepState] = useRecoilState<StepState>(
    songState.getStepState(props.stepInfo.trackIndex, props.stepInfo.stepIndex)
  );
  const trackState = useRecoilValue<TrackState>(props.trackState);

  const [isCurrentStep, setIsCurrentStep] = useState(false);

  const requestRef = useRef<number>();
  const maybeUpdateStyle = (): void => {
    setIsCurrentStep(
      sequencerEngine.getCurrentStep() === props.stepInfo.stepIndex
    );
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
  });

  const onStepEnableChange = (event: any): void => {
    setStepState((current: StepState) => {
      const newState = { ...current };
      newState.active = event.target.checked;
      return newState;
    });
  };

  const onCoarsePitchChange = (event: any): void => {
    setStepState((current: StepState) => {
      const newState = { ...current };
      newState.coarsePitch = event.target.value;
      return newState;
    });
  };
  const containerClassName = "SequencerStep" + (isCurrentStep ? "-active" : "");
  const checkboxClassName =
    "SequencerStep" + (trackState.muted ? "-muted" : "");
  return (
    <div className={containerClassName}>
      <input
        type="checkbox"
        className={checkboxClassName}
        checked={stepState.active}
        onChange={onStepEnableChange}
      />
      <Slider
        name="Coarse Pitch"
        id={`Step ${props.stepInfo.stepIndex.toString()} Coarse Pitch`}
        min={-48}
        max={48}
        onChange={onCoarsePitchChange}
        value={stepState.coarsePitch}
      />
      <InputLabel
        htmlFor={`Step ${props.stepInfo.stepIndex.toString()} Coarse Pitch`}
      >
        {stepState.coarsePitch}
      </InputLabel>
    </div>
  );
}
