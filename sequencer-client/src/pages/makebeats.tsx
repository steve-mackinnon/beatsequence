import React, { ReactElement } from "react";
import Head from "next/head";
import AudioWorkstation from "../components/AudioWorkstation";

function MakeBeats(): ReactElement {
  return (
    <>
      <Head>
        <title>
          Beatsequence - experimental beat making tool for the browser
        </title>
        <meta
          name="description"
          content="Make beats in your browser with this powerful step sequencer and synthesis engine. Works seamlessly on mobile or desktop."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="og:title"
          property="og:title"
          content="Beatsequence - experimental beat making tool for the browser"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://beatsequence.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AudioWorkstation />
    </>
  );
}

export default MakeBeats;
