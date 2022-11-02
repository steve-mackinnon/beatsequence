import React, { ReactElement } from "react";
import { Tabs, Tab } from "@mui/material";
import { Stairs, Tune } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setCurrentView } from "../features/song/song";

export function ViewSelector(): ReactElement {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector((state) => {
    if (state.song.selectedView === "sequencer") {
      return 0;
    }
    return 1;
  });
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    dispatch(
      setCurrentView({ currentView: newValue === 0 ? "sequencer" : "params" })
    );
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleChange}
      aria-label="icon tabs example"
    >
      <Tab icon={<Stairs />} aria-label="sequencer" />
      <Tab icon={<Tune />} aria-label="track controls" />
    </Tabs>
  );
}
