import React, { ReactElement, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { adjustTempo, shutDownAudioEngine } from "../features/song/song";
import { Slider, Input, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { GlobalMenu } from "./GlobalMenu";
import { useSignOut } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/authContext";

export function HeaderControls(): ReactElement {
  const auth = useContext(AuthContext);
  const [signOut] = useSignOut(auth);
  const dispatch = useAppDispatch();
  const tempo = useAppSelector((state) => state.song.tempo);

  const onTempoSliderChange = (event: any): void => {
    if (typeof event.target.value === "number") {
      dispatch(adjustTempo(event.target.value as number));
    }
  };
  const onTempoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value === "") {
      return;
    }
    const tempo = Number(event.target.value);
    if (tempo < 10) {
      return;
    }
    dispatch(adjustTempo(Number(event.target.value)));
  };

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
      paddingY={1}
    >
      <GlobalMenu />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width={200}
        spacing={2}
      >
        <Typography id="tempo-slider">Tempo</Typography>
        <Slider
          name="Tempo"
          id={`Tempo Slider`}
          min={10}
          max={200}
          onChange={onTempoSliderChange}
          sx={{
            maxWidth: 100,
          }}
          value={tempo}
          size="small"
          aria-labelledby="tempo-slider"
        />
        <Input
          value={tempo}
          onChange={onTempoInputChange}
          size="small"
          aria-labelledby="tempo-slider"
          sx={{
            minWidth: 28,
            maxWidth: 28,
          }}
        />
      </Stack>
      <Button onClick={onSignOutClick}>Sign out</Button>
    </Stack>
  );
}
