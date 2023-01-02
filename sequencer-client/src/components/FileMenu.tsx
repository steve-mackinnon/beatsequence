import React, { ReactElement, useState, useContext } from "react";
import { Divider, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import MoreVert from "@mui/icons-material/MoreVert";
import SaveProjectAsDialog from "./SaveProjectAsDialog";
import useSaveProject from "../hooks/useSaveProject";
import { SaveChangesBeforeClosingDialog } from "./SaveChangesBeforeClosingDialog";
import { useAppDispatch } from "../hooks";
import { newProject } from "../reducers/songSlice";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function FileMenu(): ReactElement {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `fileMenu`,
  });
  const dispatch = useAppDispatch();
  const [saveAsDialogOpen, setSaveAsDialogOpen] = useState(false);
  const { save, canSave } = useSaveProject();
  const [showSaveBeforeClosingDialog, setShowSaveBeforeClosingDialog] =
    useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCreateAccountClick = (): void => {
    navigate("/account/create");
  };
  const handleCloseSaveProjectDialog = (): void => {
    setSaveAsDialogOpen(false);
    // If the save project dialog was initiated from a new project,
    // dispatch a new project action
    if (showSaveBeforeClosingDialog) {
      dispatch(newProject({}));
      setShowSaveBeforeClosingDialog(false);
    }
    popupState.close();
  };

  const handleCloseSaveBeforceClosingDialog = (): void => {
    setShowSaveBeforeClosingDialog(false);
    popupState.close();
  };

  const handleNewProjectClick = (): void => {
    setShowSaveBeforeClosingDialog(true);
  };

  const menuItems: ReactElement[] = [];
  if (auth.currentUser == null) {
    menuItems.push(
      <MenuItem onClick={handleCreateAccountClick}>
        Create an account to save...
      </MenuItem>
    );
  } else {
    menuItems.push(
      <MenuItem onClick={handleNewProjectClick}>New project</MenuItem>
    );
    menuItems.push(<Divider />);
    menuItems.push(
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
    );
    menuItems.push(
      <MenuItem
        onClick={() => {
          setSaveAsDialogOpen(true);
        }}
      >
        Save As...
      </MenuItem>
    );
  }
  return (
    <>
      <IconButton {...bindTrigger(popupState)}>
        <MoreVert />
      </IconButton>
      <Menu {...bindMenu(popupState)}>{menuItems}</Menu>
      <Modal open={saveAsDialogOpen} onClose={handleCloseSaveProjectDialog}>
        <>
          <SaveProjectAsDialog dismissDialog={handleCloseSaveProjectDialog} />
        </>
      </Modal>
      <Modal
        open={showSaveBeforeClosingDialog}
        onClose={handleCloseSaveBeforceClosingDialog}
      >
        <>
          <SaveChangesBeforeClosingDialog
            cancel={() => {
              popupState.close();
              setShowSaveBeforeClosingDialog(false);
            }}
            save={() => {
              popupState.close();
              if (canSave) {
                void save();
                dispatch(newProject({}));
                setShowSaveBeforeClosingDialog(false);
              } else {
                setSaveAsDialogOpen(true);
              }
            }}
            dontSave={() => {
              popupState.close();
              dispatch(newProject({}));
              setShowSaveBeforeClosingDialog(false);
            }}
          />
        </>
      </Modal>
    </>
  );
}
