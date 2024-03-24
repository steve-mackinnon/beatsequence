import React, { ReactElement, useRef, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { sequencerEngine } from "../engine/sequencerEngine";
import { ParamScrubText } from "../shared-components/ParamScrubText";
import { enable, disable } from "../reducers/stepsSlice";
import {
  selectTrackHasCoarsePitchParam,
  selectTrackIsEffectivelyMuted,
} from "../reducers/tracksSlice";
import * as styles from "./SequencerStep.module.css";
import { noteNameToPitchOffset, pitchOffsetToNoteName } from "../entities";

export interface SequencerStepProps {
  stepIndex: number;
  trackId: number;
}
export function SequencerStep(props: SequencerStepProps): ReactElement {
  const stepState = useAppSelector((state) => {
    return state.steps[props.trackId][props.stepIndex];
  });
  const isEffectivelyMuted = useAppSelector((state) =>
    selectTrackIsEffectivelyMuted(state, props.trackId)
  );
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

  const inputClassNames: String[] = [styles.SequencerStep];
  if (isEffectivelyMuted) {
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
      onChange={() => dispatchStepToggleEvent()}
      ref={inputRef}
      onFocus={() => {
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
        min={-72}
        max={72}
        toNumber={noteNameToPitchOffset}
        valueToString={pitchOffsetToNoteName}
        round={true}
      />
    );
  }
  return <div className={styles.SequencerStep}>{components}</div>;
}
