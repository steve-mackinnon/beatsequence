import React, { ReactElement, useRef, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { sequencerEngine } from "../engine/sequencerEngine";
import { ParamScrubText } from "../common/ParamScrubText";
import { enable, disable } from "../reducers/stepsSlice";
import { selectTrackHasCoarsePitchParam } from "../reducers/tracksSlice";
import styles from "./SequencerStep.module.css";

export interface SequencerStepProps {
  stepIndex: number;
  trackId: number;
}
export function SequencerStep(props: SequencerStepProps): ReactElement {
  const stepState = useAppSelector((state) => {
    return state.steps[props.trackId][props.stepIndex];
  });
  const trackState = useAppSelector((state) => state.tracks[props.trackId]);
  const showCoarsePitchControl = useAppSelector((state) =>
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

  const dispatchStepToggleEvent = (): void => {
    if (stepState.enabled) {
      dispatch(
        disable({
          trackId: props.trackId,
          stepIndex: props.stepIndex,
        })
      );
    } else {
      dispatch(
        enable({
          trackId: props.trackId,
          stepIndex: props.stepIndex,
        })
      );
    }
  };

  const onStepEnableChange = (event: any): void => {
    dispatchStepToggleEvent();
  };

  const inputClassNames: String[] = [styles.SequencerStep];
  if (trackState.muted) {
    inputClassNames.push(styles.muted);
  }
  if (isCurrentStep) {
    inputClassNames.push(styles.playing);
  }
  const components = [
    <input
      key="step-enabled-checkbox"
      type="checkbox"
      className={inputClassNames.join(" ")}
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
  if (showCoarsePitchControl) {
    components.push(
      <ParamScrubText
        key={`coarsePitchInput`}
        trackId={props.trackId}
        stepIndex={props.stepIndex}
        name="coarsePitch"
        min={-64}
        max={64}
        round={true}
      />
    );
  }
  return <div className={styles.SequencerStep}>{components}</div>;
}
