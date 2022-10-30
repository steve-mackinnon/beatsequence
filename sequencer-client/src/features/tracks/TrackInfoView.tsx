import React, { ReactElement, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Box, Button } from "@mui/material";
import { SxProps } from "@mui/system";
import { mute, unmute } from "./tracks";
// import { ParamSlider } from "../../common/ParamSlider";

// const MIN_GAIN = 0.0;
// const MAX_GAIN = 1.5;

// const selectGain = (state: any, trackIndex: number): number => {
//   const gain = state.tracks[trackIndex].generatorParams.gain;
//   if (gain != null && typeof gain === "number") {
//     return gain;
//   }
//   console.log(
//     `Couldn't find gain param for track ${trackIndex}... Using default value.`
//   );
//   return 1.0;
// };

// const selectDecayTime = (state: any, trackIndex: number): number => {
//   const decayParam = state.tracks[trackIndex].generatorParams.decay_time;
//   if (decayParam != null && typeof decayParam === "number") {
//     return decayParam;
//   }
//   console.log(
//     `Couldn't find decay_time param for track ${trackIndex}... Using default value.`
//   );
//   return 0.15;
// };

// const MIN_DECAY_TIME = 0.01;
// const MAX_DECAY_TIME = 1.0;

export interface TrackInfoProps {
  trackId: number;
}
export function TrackInfoView(props: TrackInfoProps): ReactElement {
  const dispatch = useAppDispatch();
  const muted = useAppSelector((state) => state.tracks[props.trackId].muted);
  const trackName = useAppSelector(
    (state) => state.tracks[props.trackId].displayName
  );
  const [receivedTouchEvent, setReceivedTouchEvent] = useState(false);

  const dispatchMute = (): void => {
    if (muted) {
      dispatch(unmute({ trackId: props.trackId }));
      return;
    }
    dispatch(mute({ trackId: props.trackId }));
  };
  const onEnableTrackButtonTouchStart = (e: any): void => {
    setReceivedTouchEvent(true);
    dispatchMute();
  };
  const onEnableTrackButtonClick = (e: any): void => {
    if (receivedTouchEvent) {
      return;
    }
    dispatchMute();
  };

  const buttonStyle: SxProps = muted
    ? {
        color: "rgb(153, 134, 100)",
        maxWidth: "56px",
        minWidth: "56px",
      }
    : {
        color: "rgb(219, 218, 174)",
        maxWidth: "56px",
        minWidth: "56px",
      };
  return (
    <Box
      flexDirection="column"
      justifyContent="left"
      minWidth={60}
      maxWidth={60}
    >
      <Button
        sx={buttonStyle}
        onTouchStart={onEnableTrackButtonTouchStart}
        onClick={onEnableTrackButtonClick}
      >
        {trackName}
      </Button>

      {/* <ParamSlider
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
      /> */}
    </Box>
  );
}
