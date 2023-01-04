import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Button, Stack, IconButton } from "@mui/material";
import { Tune } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import {
  mute,
  unmute,
  toggleParamViewVisibility,
  toggleSolo,
  selectTrackIsEffectivelyMuted,
} from "../reducers/tracksSlice";
import { TrackMenu } from "./TrackMenu";

const getButtonStyle = (on: boolean, size: number): SxProps => {
  const color = on ? "rgb(219, 218, 174)" : "rgb(153, 134, 100)";
  return {
    color,
    maxWidth: `${size}px`,
    minWidth: `${size}px`,
  };
};
export interface TrackInfoProps {
  trackId: number;
}
export function TrackInfoView(props: TrackInfoProps): ReactElement {
  const dispatch = useAppDispatch();
  const isMuted = useAppSelector((state) =>
    selectTrackIsEffectivelyMuted(state, props.trackId)
  );
  const isSoloed = useAppSelector(
    (state) => state.tracks[props.trackId].soloed
  );

  const trackName = useAppSelector(
    (state) => state.tracks[props.trackId].displayName
  );
  const showParamView = useAppSelector(
    (state) => state.tracks[props.trackId].paramViewVisible
  );
  const [receivedTouchEvent, setReceivedTouchEvent] = useState(false);
  const [mobileOrientation, setMobileOrientation] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setMobileOrientation(document.body.clientWidth <= 650);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatchMute = (): void => {
    if (isMuted) {
      dispatch(unmute({ trackId: props.trackId }));
      return;
    }
    dispatch(mute({ trackId: props.trackId }));
  };
  const dispatchToggleSolo = (): void => {
    dispatch(toggleSolo({ trackId: props.trackId }));
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

  const containerStyle: SxProps = {
    flexDirection: "column",
    alignItems: "center",
  };
  const soloButton = (
    <IconButton
      sx={{ ...getButtonStyle(isSoloed, 40), fontSize: "1rem" }}
      onClick={() => dispatchToggleSolo()}
    >
      S
    </IconButton>
  );
  return (
    <Stack sx={containerStyle}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={getButtonStyle(!isMuted, 56)}
          onTouchStart={onEnableTrackButtonTouchStart}
          onClick={onEnableTrackButtonClick}
        >
          {trackName}
        </Button>
        {!mobileOrientation && soloButton}
      </Stack>
      {mobileOrientation && soloButton}
      <TrackMenu trackId={props.trackId} />
      <IconButton onClick={onParamViewToggleClick}>
        <Tune
          sx={{
            color: showParamView ? "rgb(219, 218, 174)" : "rgb(153, 134, 100)",
          }}
        />
      </IconButton>
    </Stack>
  );
}
