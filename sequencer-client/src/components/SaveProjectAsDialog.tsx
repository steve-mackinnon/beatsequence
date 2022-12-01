import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { styled } from "@mui/system";
import useSaveProject, { SaveProjectInterface } from "../hooks/useSaveProject";
import { hotkeySuppressor } from "../hotkeySuppressor";

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
  const { name: projectName, saveAs }: SaveProjectInterface = useSaveProject();
  const [currentProjectName, setCurrentProjectName] = useState(projectName);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    hotkeySuppressor.blockHotkeys = true;
    if (isInitialRender && textFieldRef.current !== null) {
      textFieldRef.current?.select();
      setIsInitialRender(false);
    }

    return () => {
      hotkeySuppressor.blockHotkeys = false;
    };
  }, [isInitialRender]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentProjectName(event.target.value);
  };

  const handleSaveClick = async (): Promise<void> => {
    await saveAs(currentProjectName);
    props.dismissDialog();
  };
  return (
    <Container>
      <TextField
        value={currentProjectName}
        onChange={handleChange}
        name="Project Name"
        label="Project Name"
        inputRef={textFieldRef}
      />
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={props.dismissDialog}>Cancel</Button>
        <Button
          onClick={() => {
            void (async () => {
              await handleSaveClick();
            })();
          }}
          disabled={currentProjectName.length === 0}
        >
          Save
        </Button>
      </Stack>
    </Container>
  );
}
