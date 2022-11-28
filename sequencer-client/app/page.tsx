"use client";

import React, { ReactElement } from "react";
import Head from "next/head";
import { Link as MuiLink, Typography } from "@mui/material";
import { styled } from "@mui/system";
import styles from "../styles/Homepage.module.css";
import ClientProviders from "./clientProviders";
import MakeBeatsOrCreateAccountButton from "../components/MakeBeatsOrCreateAccountButton";

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
      <ClientProviders>
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
            <strong>Note:</strong> Beatsequence is currently in early beta and
            has a minimal feature set. More features are coming!
          </Typography>
        </MainContainer>
      </ClientProviders>
    </div>
  );
}
