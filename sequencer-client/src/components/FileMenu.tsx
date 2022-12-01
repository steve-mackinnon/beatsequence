import React, { ReactElement, useState } from "react";
import { IconButton, Menu, MenuItem, Modal } from "@mui/material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import MoreVert from "@mui/icons-material/MoreVert";
import SaveProjectAsDialog from "./SaveProjectAsDialog";
import useSaveProject from "../hooks/useSaveProject";
import { useAppDispatch } from "../hooks";
import { newProject } from "../features/song/song";

export default function FileMenu(): ReactElement {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `fileMenu`,
  });
  const [saveAsDialogOpen, setSaveAsDialogOpen] = useState(false);
  const { save, canSave } = useSaveProject();
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    setSaveAsDialogOpen(false);
    popupState.close();
  };

  const handleNewProjectClick = (): void => {
    dispatch(newProject({}));
    popupState.close();
  };
  return (
    <>
      <IconButton {...bindTrigger(popupState)}>
        <MoreVert />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={handleNewProjectClick}>New project</MenuItem>
        <MenuItem
          disabled={!canSave}
          onClick={() => {
            void (async () => {
              await save();
              popupState.close();
            })();
          }}
        >
          Save
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSaveAsDialogOpen(true);
          }}
        >
          Save As...
        </MenuItem>
      </Menu>
      <Modal open={saveAsDialogOpen} onClose={handleClose}>
        <SaveProjectAsDialog dismissDialog={handleClose} />
      </Modal>
    </>
  );
}
