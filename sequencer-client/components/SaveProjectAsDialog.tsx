"use client";

import React, { ReactElement, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { styled } from "@mui/system";
import useSaveProject from "../hooks/useSaveProject";

const Container = styled("div")({
  position: "absolute",
  width: "300px",
  height: "150px",
  top: "10%",
  left: "30%",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "space-between",
  backgroundColor: "rgb(45,45,45)",
  borderRadius: "1rem",
});

export interface SaveProjectAsDialogProps {
  dismissDialog: () => void;
}
export default function SaveProjectAsDialog(
  props: SaveProjectAsDialogProps
): ReactElement {
  const [project, saveProjectAs] = useSaveProject();
  const [currentProjectName, setCurrentProjectName] = useState(project);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentProjectName(event.target.value);
  };
  return (
    <Container>
      <TextField
        value={currentProjectName}
        onChange={handleChange}
        name="Project Name"
        label="Project Name"
      />
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={props.dismissDialog}>Cancel</Button>
        <Button
          onClick={() => {
            saveProjectAs(currentProjectName);
            props.dismissDialog();
          }}
        >
          Save
        </Button>
      </Stack>
    </Container>
  );
}
