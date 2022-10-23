import React, { ReactElement } from "react";
import { Slider, InputLabel, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";

function logarithmicMap(value: number): number {
  return Math.log(1.71828182845 * value + 1.0);
}
function calculateValue(value: number, min: number, max: number): number {
  return min + logarithmicMap(value) * (max - min);
}
function formatValueLabel(value: number): string {
  return value.toFixed(2);
}

export interface ParamSliderProps {
  valueSelector: (state: RootState) => number;
  valueDispatcher: (newValue: number) => void;
  minValue: number;
  maxValue: number;
  logScale?: boolean;
  label: string;
}

export function ParamSlider(props: ParamSliderProps): ReactElement {
  const value = useAppSelector(props.valueSelector);
  const dispatch = useAppDispatch();

  const onChange = (event: any): void => {
    let newValue = event.target.value;
    if (typeof newValue !== "number") {
      return;
    }
    if (newValue < props.minValue) {
      newValue = props.minValue;
    } else if (newValue > props.maxValue) {
      newValue = props.maxValue;
    }
    dispatch(props.valueDispatcher(newValue));
  };
  return (
    <Grid container paddingLeft="12px" direction="row">
      <Grid xs={3}>
        <InputLabel htmlFor={props.label}>{props.label}</InputLabel>
      </Grid>
      <Grid xs={8}>
        <Slider
          step={0.0001}
          min={props.logScale != null && props.logScale ? 0.0 : props.minValue}
          max={props.logScale != null && props.logScale ? 1.0 : props.maxValue}
          scale={(value: number) => {
            if (props.logScale != null && props.logScale) {
              return calculateValue(value, props.minValue, props.maxValue);
            }
            return value;
          }}
          onChange={onChange}
          value={value}
          valueLabelDisplay="auto"
          valueLabelFormat={formatValueLabel}
        />
      </Grid>
    </Grid>
  );
}
