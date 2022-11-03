import React, { ReactElement, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Button, Stack, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import { mute, unmute, toggleParamViewVisibility } from "./tracks";
import { TrackMenu } from "./TrackMenu";

export interface TrackInfoProps {
  trackId: number;
}
export function TrackInfoView(props: TrackInfoProps): ReactElement {
  const dispatch = useAppDispatch();
  const muted = useAppSelector((state) => state.tracks[props.trackId].muted);
  const trackName = useAppSelector(
    (state) => state.tracks[props.trackId].displayName
  );
  const showParamView = useAppSelector(
    (state) => state.tracks[props.trackId].paramViewVisible
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
  const onParamViewToggleClick = (e_: any): void => {
    dispatch(toggleParamViewVisibility({ trackId: props.trackId }));
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
    <Stack flexDirection="column">
      <Button
        sx={buttonStyle}
        onTouchStart={onEnableTrackButtonTouchStart}
        onClick={onEnableTrackButtonClick}
      >
        {trackName}
      </Button>
      <TrackMenu trackId={props.trackId} />
      <IconButton onClick={onParamViewToggleClick}>
        {showParamView ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </Stack>
  );
}
