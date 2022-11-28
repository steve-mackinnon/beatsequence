"use client";

import React, { ReactElement, useState } from "react";
import { Stack } from "@mui/system";
import { ParamSlider } from "../common/ParamSlider";
import { Button, Modal, Typography } from "@mui/material";
import useSaveProject from "../hooks/useSaveProject";
import SaveProjectAsDialog from "./SaveProjectAsDialog";
export function HeaderControls(): ReactElement {
  const [projectName] = useSaveProject();
  const [saveAsDialogOpen, setSaveAsDialogOpen] = useState(false);
  const handleOpen = (): void => setSaveAsDialogOpen(true);
  const handleClose = (): void => setSaveAsDialogOpen(false);

  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      paddingX="15px"
    >
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
      <Typography>{projectName}</Typography>
      <Button onClick={handleOpen}>Save as</Button>
      <Modal open={saveAsDialogOpen} onClose={handleClose}>
        <SaveProjectAsDialog dismissDialog={handleClose} />
      </Modal>
    </Stack>
  );
}
