import React, { ReactElement, useContext } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { useRouter } from "next/router";
import { useSignOut } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/authContext";
import MuiAvatar from "@mui/material/Avatar";

export default function ProfileMenu(): ReactElement {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `profileMenu`,
  });
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [signOut] = useSignOut(auth);

  const onSignOutClick = async (): Promise<void> => {
    const success = await signOut();
    if (!success) {
      console.log("Failed to sign out.");
      return;
    }
    popupState.close();
    await router.push("/account/login");
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