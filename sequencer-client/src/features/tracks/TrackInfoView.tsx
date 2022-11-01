import React, { ReactElement, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Box, Button } from "@mui/material";
import { SxProps } from "@mui/system";
import { mute, unmute, setCurrentView } from "./tracks";

export interface TrackInfoProps {
  trackId: number;
}
export function TrackInfoView(props: TrackInfoProps): ReactElement {
  const dispatch = useAppDispatch();
  const muted = useAppSelector((state) => state.tracks[props.trackId].muted);
  const trackName = useAppSelector(
    (state) => state.tracks[props.trackId].displayName
  );
  const selectedView = useAppSelector(
    (state) => state.tracks[props.trackId].selectedView
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

  const onViewToggleButtonClick = (e: any): void => {
    if (selectedView === "sequencer") {
      dispatch(
        setCurrentView({ trackId: props.trackId, currentView: "params" })
      );
    } else {
      dispatch(
        setCurrentView({ trackId: props.trackId, currentView: "sequencer" })
      );
    }
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
      <Button onClick={onViewToggleButtonClick}>
        {selectedView === "sequencer" ? "Params" : "Seq"}
      </Button>
    </Box>
  );
}
