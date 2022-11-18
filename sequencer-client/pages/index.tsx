import React, { ReactElement, useContext } from "react";
import Head from "next/head";
import { Button, Link as MuiLink, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { AuthContext } from "../src/context/authContext";
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
    margin: "1rem",
    gap: "2rem",
  });
  const notAuthorized = user == null && !loading;
  const MakeBeatsOrCreateAccountButton = (): ReactElement => {
    if (notAuthorized) {
      return (
        <Link href="/account/create" passHref>
          <Button
            variant="contained"
            sx={{ margin: "1rem", textDecoration: "none" }}
          >
            Create an account
          </Button>
        </Link>
      );
    }
    return (
      <Link href="/makebeats" passHref>
        <Button
          sx={{
            margin: "1rem",
            textDecoration: "none",
          }}
          variant="contained"
        >
          Enter Beatsequence
        </Button>
      </Link>
    );
  };
  const getStartedText = notAuthorized
    ? "Create an account to start cooking up some beats..."
    : "";
  return (
    <div>
      <Head>
        <title>
          Beat Sequence - audio sequencer, synthesizer and drum machine for
          electronic music production
        </title>
        <meta
          name="description"
          content="Make beats and bleeps with this powerful sequencer and synth engine in your web browser. Export audio tracks and bring them into your DAW."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <Typography variant="h1">
          The{" "}
          <span className={styles.ColorText}>
            experimental beat making tool
          </span>{" "}
          built for the browser.
        </Typography>
        <Typography variant="h2">
          Beatsequence is a step sequencer, synthesizer and drum machine built
          for electronic music production.
        </Typography>
        <Typography variant="h2">
          Built with mobile in mind - the responsive interface allows you to
          stay in the flow on any device.
        </Typography>
        <Typography variant="h2">{getStartedText}</Typography>
        <MakeBeatsOrCreateAccountButton />
        <Typography variant="h3">
          Designed and developed by electronic music producer and software
          engineer <MuiLink href="https://stevedarko.com">Steve Darko</MuiLink>.
        </Typography>
        <Typography variant="h4">
          Note: Beatsequence is currently in beta - lots of new features are
          coming!
        </Typography>
      </MainContainer>
    </div>
  );
}
