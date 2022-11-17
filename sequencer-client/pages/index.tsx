import React, { ReactElement, useContext } from "react";
import Head from "next/head";
import { Button, Link as MuiLink } from "@mui/material";
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
  });
  const notAuthorized = user == null && !loading;
  const MakeBeatsOrCreateAccountButton = (): ReactElement => {
    if (notAuthorized) {
      return (
        <Link href="/account/create" passHref>
          <Button variant="contained">Create an account</Button>
        </Link>
      );
    }
    return (
      <Link href="/makebeats" passHref>
        <Button variant="contained">Make beats</Button>
      </Link>
    );
  };
  const getStartedText = notAuthorized
    ? "Create an account to join the beta..."
    : "Dive into the beta...";
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
        <h1>
          The{" "}
          <span className={styles.ColorText}>
            experimental beat making tool
          </span>{" "}
          for your browser.
        </h1>
        <h2>
          Beatsequence is an audio sequencer, synthesizer and drum machine built
          for electronic music production.
        </h2>
        <h2>{getStartedText}</h2>
        <MakeBeatsOrCreateAccountButton />
        <h3>
          Designed and developed by electronic music producer and software
          engineer <MuiLink href="https://stevedarko.com">Steve Darko</MuiLink>.
        </h3>
      </MainContainer>
    </div>
  );
}
