import React, { ReactElement } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "../hooks";
import MuiAvatar from "@mui/material/Avatar";

export default function ProfileMenu(): ReactElement {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `profileMenu`,
  });
  const navigate = useNavigate();
  const signOut = useSignOut();

  const onSignOutClick = async (): Promise<void> => {
    const success = await signOut();
    if (!success) {
      console.log("Failed to sign out.");
      return;
    }
    popupState.close();
    navigate("/account/login");
  };

  return (
    <>
      <Button {...bindTrigger(popupState)}>
        <MuiAvatar sx={{ color: "white" }}>SD</MuiAvatar>
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem
          onClick={() => {
            void onSignOutClick();
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}
