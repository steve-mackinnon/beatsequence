import React, { ReactElement, useContext } from "react";
import Head from "next/head";
import { Button, Link as MuiLink, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Homepage.module.css";
export default function Home(): ReactElement {
  const auth = useContext(AuthContext);
  const [user, loading] = useAuthState(auth);

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
  const notAuthorized = user == null && !loading;
  const MakeBeatsOrCreateAccountButton = (): ReactElement => {
    if (notAuthorized) {
      return (
        <Link to="/account/create" style={{ textDecoration: "none" }}>
          <Button size="large" variant="contained">
            Get started
          </Button>
        </Link>
      );
    }
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
      <Head key="landingpageHead">
        <title>
          Beatsequence - experimental beat making tool for the browser
        </title>
        <meta
          name="description"
          content="Make beats in your browser with this powerful step sequencer and synthesis engine. Works seamlessly on mobile or desktop."
        />
        <meta
          name="og:title"
          property="og:title"
          content="Beatsequence - experimental beat making tool for the browser"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://beatsequence.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
        <Typography variant="h3">
          Developed by electronic music producer and software engineer{" "}
          <MuiLink href="https://stevedarko.com">Steve Darko</MuiLink>.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Note:</strong> Beatsequence is currently in early beta and has
          a minimal feature set. More features are coming!
        </Typography>
      </MainContainer>
    </div>
  );
}
