import React, { ReactElement, useRef, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { sequencerEngine } from "../../engine/sequencerEngine";
import { ParamScrubText } from "../../common/ParamScrubText";
import { enable, disable, stepStateForTrackAndStep } from "./steps";
import { selectTrackHasCoarsePitchParam } from "../tracks/tracks";
import styles from "./SequencerStep.module.css";

export interface SequencerStepProps {
  stepIndex: number;
  trackId: number;
}
export function SequencerStep(props: SequencerStepProps): ReactElement {
  const stepState = useAppSelector((state) =>
    stepStateForTrackAndStep(props.trackId, props.stepIndex, state.steps)
  );
  const trackState = useAppSelector((state) => state.tracks[props.trackId]);
  const showCoarsePitchControl = useAppSelector((state) =>
    selectTrackHasCoarsePitchParam(state, props.trackId)
  );
  const dispatch = useAppDispatch();

  const [isCurrentStep, setIsCurrentStep] = useState(false);
  const [receivedTouchEvent, setReceivedTouchEvent] = useState(false);

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

  const onTouchStart = (event: React.TouchEvent<HTMLInputElement>): void => {
    setReceivedTouchEvent(true);
    dispatchStepToggleEvent();
  };
  const onStepEnableChange = (event: any): void => {
    if (receivedTouchEvent) {
      return;
    }
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
      onMouseDown={onStepEnableChange}
      onTouchStart={onTouchStart}
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
      />
    );
  }
  return <div className={styles.SequencerStep}>{components}</div>;
}
