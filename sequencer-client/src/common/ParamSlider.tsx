import React, { ReactElement, useState } from "react";
import { Slider, InputLabel, Grid } from "@mui/material";
import { ParamInfo, useParameter } from "../hooks";

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
  paramInfo: ParamInfo;
  label: string;
  logScale?: boolean;
  sliderWidth?: number;
}

export function ParamSlider(props: ParamSliderProps): ReactElement {
  const [value, setValue] = useParameter(props.paramInfo);
  const [receivedTouchEvent, setReceivedTouchEvent] = useState(false);

  const onChange = (
    event: Event,
    value: number | number[],
    _thumbIndex: number
  ): void => {
    if (event instanceof TouchEvent) {
      setReceivedTouchEvent(true);
    } else if (event instanceof MouseEvent && receivedTouchEvent) {
      // Hack to work around a MUI Slider bug in some mobile browsers where a
      // mouse event is received after touch moved events that resets the
      // slider to the initial value before the interaction began.
      return;
    }
    setValue(value as number);
  };
  return (
    <Grid container direction="row" columnSpacing={2} width={200}>
      <Grid mobile={3} tablet={3} desktop={3}>
        <InputLabel htmlFor={props.label}>{props.label}</InputLabel>
      </Grid>
      <Grid mobile={8} tablet={8} desktop={8}>
        <Slider
          size="small"
          step={0.0001}
          min={
            props.logScale != null && props.logScale ? 0.0 : props.paramInfo.min
          }
          max={
            props.logScale != null && props.logScale ? 1.0 : props.paramInfo.max
          }
          scale={(value: number) => {
            if (props.logScale != null && props.logScale) {
              return calculateValue(
                value,
                props.paramInfo.min,
                props.paramInfo.max
              );
            }
            return value;
          }}
          onChange={onChange}
          value={value}
          valueLabelDisplay="auto"
          valueLabelFormat={formatValueLabel}
          sx={{
            maxWidth:
              props.sliderWidth != null ? `${props.sliderWidth}px` : "120px",
          }}
        />
      </Grid>
    </Grid>
  );
}
