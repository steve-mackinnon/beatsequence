import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import { setGeneratorParam } from "./tracks";
import { ParamSlider } from "../../common/ParamSlider";

const MIN_GAIN = 0.0;
const MAX_GAIN = 1.5;

const selectGain = (state: any, trackIndex: number): number => {
  const gain = state.tracks[trackIndex].generatorParams.gain;
  if (gain != null && typeof gain === "number") {
    return gain;
  }
  console.log(
    `Couldn't find gain param for track ${trackIndex}... Using default value.`
  );
  return 1.0;
};

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

export interface TrackParamsViewProps {
  trackId: number;
}
export function TrackParamsView(props: TrackParamsViewProps): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        paddingBottom: "10px",
        flexGrow: 1,
        paddingRight: 10,
      }}
    >
      <ParamSlider
        minValue={MIN_GAIN}
        maxValue={MAX_GAIN}
        valueDispatcher={(value) =>
          setGeneratorParam({
            trackId: props.trackId,
            paramId: "gain",
            paramValue: value,
          })
        }
        valueSelector={(state) => selectGain(state, props.trackId)}
        label="Gain"
      />
      <ParamSlider
        valueSelector={(state) => selectDecayTime(state, props.trackId)}
        valueDispatcher={(value) =>
          setGeneratorParam({
            trackId: props.trackId,
            paramId: "decay_time",
            paramValue: value,
          })
        }
        logScale={true}
        label="Decay"
        minValue={MIN_DECAY_TIME}
        maxValue={MAX_DECAY_TIME}
      />
    </Box>
  );
}
