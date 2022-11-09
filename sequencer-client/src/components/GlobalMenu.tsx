import React, { ReactElement } from "react";
import { Button, Menu, MenuItem, ListItemIcon } from "@mui/material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { randomize } from "../features/steps/steps";
import { resetState } from "../features/song/song";
import { useAppDispatch } from "../hooks";
import { Casino, RestartAlt } from "@mui/icons-material";

export function GlobalMenu(): ReactElement {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `globalMenu`,
  });
  const dispatch = useAppDispatch();

  const onRandomizeClick = (): void => {
    popupState.close();
    dispatch(randomize({ trackId: undefined, seed: Date.now().toString() }));
  };
  const onResetStateClick = (): void => {
    popupState.close();
    dispatch(resetState({}));
  };

  return (
    <>
      <Button {...bindTrigger(popupState)} variant="outlined">
        Menu
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={onRandomizeClick}>
          <ListItemIcon>
            <Casino color="action" />
          </ListItemIcon>
          Randomize all steps
        </MenuItem>
        <MenuItem onClick={onResetStateClick}>
          <ListItemIcon>
            <RestartAlt color="action" />
          </ListItemIcon>
          Reset to default
        </MenuItem>
      </Menu>
    </>
  );
}
