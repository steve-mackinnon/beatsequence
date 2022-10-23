import React, { ReactElement } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Grid } from "@mui/material";
import { setDisplayName, setGeneratorParam } from "./tracks";
import { EditableLabel } from "../../common/EditableLabel";
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

export interface TrackInfoProps {
  trackId: number;
}
export function TrackInfoView(props: TrackInfoProps): ReactElement {
  const dispatch = useAppDispatch();
  const trackName = useAppSelector(
    (state) => state.tracks[props.trackId].displayName
  );

  const updateTrackName = (name: string): string => {
    dispatch(
      setDisplayName({
        trackId: props.trackId,
        name,
      })
    );
    return name;
  };
  return (
    <Grid
      container
      minWidth={100}
      maxWidth={100}
      minHeight={54}
      maxHeight={54}
      marginRight={2}
    >
      <Grid xs={12} marginLeft={-2}>
        <EditableLabel
          onEditComplete={updateTrackName}
          getValue={() => trackName}
        />
      </Grid>
      <Grid xs={12}>
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
      </Grid>
    </Grid>
  );
}
