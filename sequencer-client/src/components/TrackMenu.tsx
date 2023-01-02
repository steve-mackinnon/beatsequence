import React, { ReactElement } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import {
  fourOnTheFloor,
  twoOnTheFloor,
  randomize,
  fillAllSteps,
} from "../reducers/stepsSlice";
import { useAppDispatch } from "../hooks";

export interface TrackMenuProps {
  trackId: number;
}
export function TrackMenu(props: TrackMenuProps): ReactElement {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `track${props.trackId}popup`,
  });
  const dispatch = useAppDispatch();

  const onFourOnTheFloorClick = (): void => {
    popupState.close();
    dispatch(fourOnTheFloor({ trackId: props.trackId }));
  };
  const onTwoOnTheFloorClick = (): void => {
    popupState.close();
    dispatch(twoOnTheFloor({ trackId: props.trackId }));
  };
  const onRandomizeClick = (): void => {
    popupState.close();
    dispatch(
      randomize({ trackId: props.trackId, seed: Date.now().toString() })
    );
  };
  const onAllStepsClick = (): void => {
    popupState.close();
    dispatch(fillAllSteps({ trackId: props.trackId }));
  };

  return (
    <>
      <IconButton {...bindTrigger(popupState)}>
        <MoreHoriz />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={onFourOnTheFloorClick}>4x4</MenuItem>
        <MenuItem onClick={onTwoOnTheFloorClick}>2x4</MenuItem>
        <MenuItem onClick={onAllStepsClick}>All steps</MenuItem>
        <MenuItem onClick={onRandomizeClick}>Randomize</MenuItem>
      </Menu>
    </>
  );
}
