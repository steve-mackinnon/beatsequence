import React, { ReactElement, useState } from "react";
import { IconButton, TextField, Autocomplete } from "@mui/material";
import { Scale as ScaleIcon } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { NOTES, Note } from "../entities/note";
import { ScaleType, SCALE_TYPES } from "../entities/musicalScale";
import { setScaleRootNote, setScaleType } from "../reducers/songSlice";
import { useAppDispatch } from "../hooks";
import { styled } from "@mui/system";

export interface TrackMenuProps {
  trackId: number;
}
export function ScaleSelectionModal(): ReactElement {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleRootNoteChange = (e: any, note: Note | null): void => {
    if (note == null) {
      return;
    }
    dispatch(setScaleRootNote(note));
  };
  const handleScaleTypeChange = (e: any, scaleType: ScaleType | null): void => {
    if (scaleType == null) {
      return;
    }
    dispatch(setScaleType(scaleType));
  };

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
  return (
    <>
      <IconButton onClick={handleOpen}>
        <ScaleIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Container>
          <Autocomplete
            options={NOTES}
            onChange={handleRootNoteChange}
            renderInput={(params) => (
              <TextField {...params} label="Root note" />
            )}
          />
          <Autocomplete
            options={SCALE_TYPES}
            onChange={handleScaleTypeChange}
            renderInput={(params) => <TextField {...params} label="Scale" />}
          />
        </Container>
      </Modal>
    </>
  );
}
