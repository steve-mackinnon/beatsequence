import React from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { NOTES, Note } from "../entities/note";
import { ScaleType, SCALE_TYPES } from "../entities/musicalScale";
import { setScaleRootNote, setScaleType } from "../reducers/songSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { styled } from "@mui/system";

export function ScaleSelectionToolbarButtons(): React.ReactElement {
  const dispatch = useAppDispatch();
  const scaleType = useAppSelector((state) => state.song.scale.type);
  const rootNote = useAppSelector((state) => state.song.scale.rootNote);
  const handleRootNoteChange = (e: SelectChangeEvent): void => {
    dispatch(setScaleRootNote(e.target.value as Note));
  };
  const handleScaleTypeChange = (e: SelectChangeEvent): void => {
    dispatch(setScaleType(e.target.value as ScaleType));
  };
  const noteItems = NOTES.map((note) => (
    <MenuItem key={note} value={note}>
      {note}
    </MenuItem>
  ));
  const scaleItems = SCALE_TYPES.map((scaleType) => (
    <MenuItem key={scaleType} value={scaleType}>
      {scaleType}
    </MenuItem>
  ));
  const Container = styled("div")({
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  });
  return (
    <Container>
      <Select
        aria-label="Select root note"
        sx={{
          height: "36px",
          minWidth: "70px",
          maxWidth: "70px",
          marginRight: "0.5rem",
        }}
        value={rootNote}
        onChange={handleRootNoteChange}
      >
        {noteItems}
      </Select>
      <Select
        aria-label="Select scale type"
        sx={{
          height: "36px",
          minWidth: "124px",
          maxWidth: "124px",
        }}
        value={scaleType}
        onChange={handleScaleTypeChange}
      >
        {scaleItems}
      </Select>
    </Container>
  );
}
