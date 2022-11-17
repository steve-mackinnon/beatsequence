import React, { ReactElement, useContext } from "react";
import Head from "next/head";
import { Button } from "@mui/material";
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
  const MakeBeatsOrCreateAccountButton = (): ReactElement => {
    if (user == null && !loading) {
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
          The <span className={styles.ColorText}>experimental beat maker</span>{" "}
          for your browser.
        </h1>
        <h2>
          Beatsequence is an audio sequencer, synthesizer and drum machine for
          electronic music production.
        </h2>
        <MakeBeatsOrCreateAccountButton />
      </MainContainer>
    </div>
  );
}
