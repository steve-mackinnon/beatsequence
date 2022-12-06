import React, { ReactElement, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { hotkeySuppressor } from "../hotkeySuppressor";

const Container = styled("div")({
  position: "absolute",
  width: "300px",
  height: "120px",
  left: "50%",
  top: "30%",
  transform: "translate(-50%,-50%)",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "space-between",
  backgroundColor: "rgb(45,45,45)",
  borderRadius: "1rem",
});

export interface SaveChangesBeforeClosingDialogProps {
  cancel: () => void;
  save: () => void;
  dontSave: () => void;
}
export function SaveChangesBeforeClosingDialog(
  props: SaveChangesBeforeClosingDialogProps
): ReactElement {
  useEffect(() => {
    hotkeySuppressor.blockHotkeys = true;
    return () => {
      hotkeySuppressor.blockHotkeys = false;
    };
  });
  return (
    <Container>
      <Typography alignSelf="center">Save changes before closing?</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Button
          onClick={() => {
            props.dontSave();
          }}
        >
          Don't save
        </Button>
        <Stack direction="row">
          <Button
            onClick={() => {
              props.cancel();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.save();
            }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
