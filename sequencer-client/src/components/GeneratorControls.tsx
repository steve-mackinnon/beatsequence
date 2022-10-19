import React, { ReactElement } from "react";
import { Slider, InputLabel, Grid } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setGeneratorParam } from "../features/tracks/tracks";

function logarithmicMap(value: number): number {
  return Math.log(1.71828182845 * value + 1.0);
}
function calculateValue(value: number, min: number, max: number): number {
  return min + logarithmicMap(value) * (max - min);
}
function formatLabel(value: number): string {
  return value.toFixed(2);
}

export interface GeneratorControlsProps {
  trackIndex: number;
}

const MIN_DECAY_TIME = 0.01;
const MAX_DECAY_TIME = 1.0;

export function GeneratorControls(props: GeneratorControlsProps): ReactElement {
  const decayTime = useAppSelector(
    (state) =>
      state.tracks[props.trackIndex].generatorParams.get("decay_time") as number
  );
  const dispatch = useAppDispatch();

  const onDecayTimeChange = (event: any): void => {
    let newValue = event.target.value;
    if (typeof newValue === "number") {
      if (newValue < MIN_DECAY_TIME) {
        newValue = MIN_DECAY_TIME;
      } else if (newValue > MAX_DECAY_TIME) {
        newValue = MAX_DECAY_TIME;
      }
      dispatch(
        setGeneratorParam({
          trackId: props.trackIndex,
          paramId: "decay_time",
          paramValue: newValue as number,
        })
      );
    }
  };

  const name = `Track ${props.trackIndex} Decay Time Slider`;

  return (
    <Grid container paddingLeft="12px" direction="row">
      <Grid xs={3}>
        <InputLabel htmlFor={`Track ${props.trackIndex} Decay Time Slider`}>
          Decay
        </InputLabel>
      </Grid>
      <Grid xs={8}>
        <Slider
          id={name}
          step={0.0001}
          min={0.0}
          max={1.0}
          scale={(value: number) =>
            calculateValue(value, MIN_DECAY_TIME, MAX_DECAY_TIME)
          }
          onChange={onDecayTimeChange}
          value={decayTime}
          valueLabelDisplay="auto"
          valueLabelFormat={formatLabel}
        />
      </Grid>
    </Grid>
  );
}
