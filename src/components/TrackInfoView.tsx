import { ReactElement, useState } from "react";
import { Button, Stack, IconButton } from "@mui/material";
import { Tune, ArrowLeft, ArrowRight } from "@mui/icons-material";
import { SxProps, styled } from "@mui/system";
import {
  mute,
  unmute,
  toggleParamViewVisibility,
  toggleSolo,
  selectTrackIsEffectivelyMuted,
} from "../reducers/tracksSlice";
import { rotateLeft, rotateRight } from "../reducers/stepsSlice";
import { useAppDispatch, useAppSelector, useMobileMode } from "../hooks";
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
  const mobileMode = useMobileMode();

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
  const onRotateLeftClick = (_: any): void => {
    dispatch(rotateLeft({ trackId: props.trackId }));
  };
  const onRotateRightClick = (_: any): void => {
    dispatch(rotateRight({ trackId: props.trackId }));
  };
  const onEnableTrackButtonTouchStart = (_: any): void => {
    setReceivedTouchEvent(true);
    dispatchMute();
  };
  const onEnableTrackButtonClick = (_: any): void => {
    if (receivedTouchEvent) {
      return;
    }
    dispatchMute();
  };
  const onParamViewToggleClick = (_: any): void => {
    dispatch(toggleParamViewVisibility({ trackId: props.trackId }));
  };

  const containerStyle: SxProps = {
    flexDirection: "column",
    alignItems: "center",
  };
  const SmallIconButton = styled(IconButton)({
    width: "50px",
    height: "26px",
  });
  const soloButton = (
    <SmallIconButton
      aria-label="Toggle track solo"
      sx={{
        ...getButtonStyle(isSoloed, mobileMode ? 50 : 30),
        fontSize: "1rem",
        width: "30px",
      }}
      onClick={() => dispatchToggleSolo()}
    >
      S
    </SmallIconButton>
  );
  const horizontalRowStyle: SxProps = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Stack sx={containerStyle}>
      <Stack sx={horizontalRowStyle}>
        <Button
          aria-label="Toggle track enabled"
          sx={getButtonStyle(!isMuted, 56)}
          onTouchStart={onEnableTrackButtonTouchStart}
          onClick={onEnableTrackButtonClick}
        >
          {trackName}
        </Button>
        {!mobileMode && soloButton}
      </Stack>
      {mobileMode && soloButton}
      <Stack sx={horizontalRowStyle}>
        <SmallIconButton
          aria-label="Shift sequence left"
          onClick={onRotateLeftClick}
          sx={{ color: "rgb(219, 218, 174)" }}
        >
          <ArrowLeft />
        </SmallIconButton>
        <SmallIconButton
          aria-label="Shift sequence right"
          onClick={onRotateRightClick}
          sx={{ color: "rgb(219, 218, 174)" }}
        >
          <ArrowRight />
        </SmallIconButton>
      </Stack>
      <TrackMenu trackId={props.trackId} />
      <SmallIconButton
        aria-label="Show additional controls"
        onClick={onParamViewToggleClick}
      >
        <Tune
          sx={{
            color: showParamView ? "rgb(219, 218, 174)" : "rgb(153, 134, 100)",
          }}
        />
      </SmallIconButton>
    </Stack>
  );
}
