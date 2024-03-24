import React, { ReactElement, useState } from "react";
import { Slider, InputLabel } from "@mui/material";
import { ParamInfo, useParameter } from "../hooks";
import { styled } from "@mui/system";

function logarithmicMap(value: number): number {
  return Math.log(1.71828182845 * value + 1.0);
}
function calculateValue(value: number, min: number, max: number): number {
  return min + logarithmicMap(value) * (max - min);
}
function formatValueLabel(value: number, round: boolean): string {
  return value.toFixed(round ? 0 : 2);
}

export interface ParamSliderProps {
  paramInfo: ParamInfo;
  label: string;
  logScale?: boolean;
  width?: number;
}

const Container = styled("div")(
  () => `
  display: flex;
  flex-direction: row;
  width: 200px;
  gap: 15px;
  justify-content: center;
  align-items: center;
`
);

export function ParamSlider(props: ParamSliderProps): ReactElement {
  const [value, setValue] = useParameter(props.paramInfo);

  const onChange = (
    _: Event,
    value: number | number[],
    _thumbIndex: number
  ): void => {
    setValue(value as number);
  };
  return (
    <Container>
      <InputLabel
        sx={{
          display: "flex",
          flexShrink: 0,
        }}
        htmlFor={props.label}
      >
        {props.label}
      </InputLabel>
      <Slider
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
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
        value={value as number}
        valueLabelDisplay="auto"
        valueLabelFormat={(value: number) =>
          formatValueLabel(value, props.paramInfo.round ?? false)
        }
      />
    </Container>
  );
}
