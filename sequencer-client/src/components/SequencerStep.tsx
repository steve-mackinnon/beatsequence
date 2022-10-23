import React, { ReactElement, useRef, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { sequencerEngine } from "../engine/sequencerEngine";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import {
  enable,
  disable,
  stepStateForTrackAndStep,
  setCoarsePitch,
} from "../features/steps/steps";
import { selectTrackHasCoarsePitchParam } from "../features/tracks/tracks";

import "../css/SequencerStep.css";

export interface SequencerStepProps {
  stepIndex: number;
  trackId: number;
}
export function SequencerStep(props: SequencerStepProps): ReactElement {
  const stepState = useAppSelector((state) =>
    stepStateForTrackAndStep(
      props.trackId,
      props.stepIndex,
      state.persistedReducer.steps
    )
  );
  const trackState = useAppSelector(
    (state) => state.persistedReducer.tracks[props.trackId]
  );
  const showCoarsePitchSlider = useAppSelector((state) =>
    selectTrackHasCoarsePitchParam(state, props.trackId)
  );
  const dispatch = useAppDispatch();

  const [isCurrentStep, setIsCurrentStep] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<number>();
  const maybeUpdateStyle = (): void => {
    setIsCurrentStep(sequencerEngine.getCurrentStepIndex() === props.stepIndex);
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
  const containerClassName = "SequencerStep";
  const checkboxClassName =
    "SequencerStep" +
    (trackState.muted ? "-muted" : "") +
    (isCurrentStep ? "-playing" : "");
  const components = [
    <input
      key="step-enabled-checkbox"
      type="checkbox"
      className={checkboxClassName}
      checked={stepState.enabled}
      onChange={onStepEnableChange}
      ref={inputRef}
      onFocus={(event: React.FocusEvent<HTMLInputElement, Element>) => {
        // Hack to fix bug where pressing spacebar for playback toggle
        // would toggle a step if had focus.
        if (inputRef.current != null) {
          inputRef.current.blur();
        }
      }}
    />,
  ];
  if (showCoarsePitchSlider) {
    components.push(
      <Slider
        key="coarse-pitch-slider"
        name="Coarse Pitch"
        id={`Track ${props.trackId} Step ${props.stepIndex} Coarse Pitch`}
        min={-48}
        max={48}
        onChange={onCoarsePitchChange}
        value={stepState.coarsePitch}
      />
    );
    components.push(
      <InputLabel
        key="coarse-pitch-label"
        htmlFor={`Track ${props.trackId} Step ${props.stepIndex} Coarse Pitch`}
      >
        {stepState.coarsePitch}
      </InputLabel>
    );
  }
  return <div className={containerClassName}>{components}</div>;
}
