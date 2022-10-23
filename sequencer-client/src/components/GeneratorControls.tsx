import React, { ReactElement } from "react";
import { setGeneratorParam } from "../features/tracks/tracks";
import { ParamSlider } from "../common/ParamSlider";

export interface GeneratorControlsProps {
  trackIndex: number;
}

const selectDecayTime = (state: any, trackIndex: number): number => {
  const decayParam = state.tracks[trackIndex].generatorParams.decay_time;
  if (decayParam != null && typeof decayParam === "number") {
    return decayParam;
  }
  console.log(
    `Couldn't find decay_time param for track ${trackIndex}... Using default value.`
  );
  return 0.15;
};

const MIN_DECAY_TIME = 0.01;
const MAX_DECAY_TIME = 1.0;

export function GeneratorControls(props: GeneratorControlsProps): ReactElement {
  return (
    <ParamSlider
      valueSelector={(state) => selectDecayTime(state, props.trackIndex)}
      valueDispatcher={(value) =>
        setGeneratorParam({
          trackId: props.trackIndex,
          paramId: "decay_time",
          paramValue: value,
        })
      }
      logScale={true}
      label="Decay"
      minValue={MIN_DECAY_TIME}
      maxValue={MAX_DECAY_TIME}
    />
  );
}
