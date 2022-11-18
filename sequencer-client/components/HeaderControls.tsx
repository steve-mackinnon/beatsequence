import React, { ReactElement, useContext } from "react";
import { useAppDispatch } from "../hooks";
import { shutDownAudioEngine } from "../features/song/song";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { GlobalMenu } from "./GlobalMenu";
import { useSignOut } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/authContext";
import { ParamSlider } from "../common/ParamSlider";

export function HeaderControls(): ReactElement {
  const auth = useContext(AuthContext);
  const [signOut] = useSignOut(auth);
  const dispatch = useAppDispatch();

  const onSignOutClick = (_e: any): void => {
    dispatch(shutDownAudioEngine({}));
    signOut().catch((error) => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log("Error on sign out: " + error);
    });
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      paddingX="15px"
      height="40px"
    >
      <GlobalMenu />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width={200}
        spacing={2}
      >
        <ParamSlider
          paramInfo={{
            trackId: undefined,
            stepIndex: undefined,
            name: "tempo",
            min: 10,
            max: 200,
          }}
          label="Tempo"
        />
      </Stack>
      <Button onClick={onSignOutClick}>Sign out</Button>
    </Stack>
  );
}
