"use client";

import React, { ReactElement } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { useFirebaseApp } from "reactfire";
import MuiAvatar from "@mui/material/Avatar";

export default function ProfileMenu(): ReactElement {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `profileMenu`,
  });
  const router = useRouter();
  const app = useFirebaseApp();

  const onSignOutClick = async (): Promise<void> => {
    const auth = getAuth(app);
    await signOut(auth);
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
