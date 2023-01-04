import React, { ReactElement } from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import styles from "../styles/Homepage.module.css";
export default function Home(): ReactElement {
  const MainContainer = styled("main")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "1.5rem",
    marginTop: "4rem",
    gap: "2rem",
  });
  const MakeBeatsOrCreateAccountButton = (): ReactElement => {
    return (
      <Link to="/makebeats" style={{ textDecoration: "none" }}>
        <Button size="large" variant="contained">
          Get Started
        </Button>
      </Link>
    );
  };
  return (
    <div>
      <MainContainer>
        <Typography variant="h1">
          The{" "}
          <span className={styles.ColorText}>
            experimental beat making tool
          </span>{" "}
          built for the browser.
        </Typography>
        <MakeBeatsOrCreateAccountButton />
        <Typography variant="h2">
          Beatsequence is a step sequencer, synthesizer and drum machine for
          electronic music production.
        </Typography>
        <Typography variant="h3">
          Designed with mobile in mind. The responsive interface allows you to
          create seamlessly on any device.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Note:</strong> Beatsequence is currently in early beta and has
          a minimal feature set. More to come...
        </Typography>
      </MainContainer>
    </div>
  );
}
