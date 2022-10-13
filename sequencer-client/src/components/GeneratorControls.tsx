import React, { ReactElement } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { TrackState } from "../recoil/track";
import { Slider, InputLabel, Grid } from "@mui/material";

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
            step={0.01}
            min={decayTime.info.min}
            max={decayTime.info.max}
            onChange={(event: any) => onParamChange(event, decayTime.info.id)}
            value={decayTime.value}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    );
  }
  return <></>;
}
