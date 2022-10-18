import React, { ReactElement, useRef, useEffect, useState } from "react";
import { useRecoilValue, RecoilState } from "recoil";
import { useAppSelector, useAppDispatch } from "../hooks";
import { sequencerEngine } from "../recoil/audioEngine";
import { TrackState } from "../recoil/track";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import {
  enable,
  disable,
  stepStateForTrackAndStep,
  setCoarsePitch,
} from "../features/steps/steps";

import "../css/SequencerStep.css";

export interface SequencerStepProps {
  stepIndex: number;
  trackId: number;
  trackState: RecoilState<TrackState>;
}
export function SequencerStep(props: SequencerStepProps): ReactElement {
  const stepState = useAppSelector((state) =>
    stepStateForTrackAndStep(props.trackId, props.stepIndex, state.steps)
  );
  const dispatch = useAppDispatch();

  const trackState = useRecoilValue<TrackState>(props.trackState);

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
  });

  const onStepEnableChange = (event: any): void => {
    if (event.target.checked as boolean) {
      dispatch(
        enable({
          trackId: props.trackId,
          stepIndex: props.stepIndex,
        })
      );
    } else {
      dispatch(
        disable({
          trackId: props.trackId,
          stepIndex: props.stepIndex,
        })
      );
    }
  };

  const onCoarsePitchChange = (event: any): void => {
    dispatch(
      setCoarsePitch({
        coarsePitch: event.target.value as number,
        trackId: props.trackId,
        stepIndex: props.stepIndex,
      })
    );
  };
  const containerClassName = "SequencerStep" + (isCurrentStep ? "-active" : "");
  const checkboxClassName =
    "SequencerStep" + (trackState.muted ? "-muted" : "");
  return (
    <div className={containerClassName}>
      <input
        type="checkbox"
        className={checkboxClassName}
        checked={stepState.enabled}
        onChange={onStepEnableChange}
      />
      <Slider
        name="Coarse Pitch"
        id={`Track ${props.trackId} Step ${props.stepIndex} Coarse Pitch`}
        min={-48}
        max={48}
        onChange={onCoarsePitchChange}
        value={stepState.coarsePitch}
      />
      <InputLabel
        htmlFor={`Track ${props.trackId} Step ${props.stepIndex} Coarse Pitch`}
      >
        {stepState.coarsePitch}
      </InputLabel>
    </div>
  );
}
