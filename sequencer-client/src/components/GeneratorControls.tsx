import React, { ReactElement } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { TrackState } from "../recoil/track";
import { Slider, InputLabel, Grid } from "@mui/material";

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
  trackState: RecoilState<TrackState>;
  trackIndex: number;
}

export function GeneratorControls(props: GeneratorControlsProps): ReactElement {
  const [trackState, setTrackState] = useRecoilState<TrackState>(
    props.trackState
  );

  const onParamChange = (event: any, id: string): void => {
    setTrackState((current: TrackState) => {
      const newState = { ...current };
      const newParam = current.generatorParams.get(id);
      if (newParam != null && newParam.kind === "continuous") {
        newParam.value = event.target.value;
        newState.generatorParams.set(id, newParam);
      }
      return newState;
    });
  };

  const decayTime = trackState.generatorParams.get("decay_time");
  if (decayTime != null && decayTime.kind === "continuous") {
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
              calculateValue(value, decayTime.info.min, decayTime.info.max)
            }
            onChange={(event: any) => onParamChange(event, decayTime.info.id)}
            value={decayTime.value}
            valueLabelDisplay="auto"
            valueLabelFormat={formatLabel}
          />
        </Grid>
      </Grid>
    );
  }
  return <></>;
}
