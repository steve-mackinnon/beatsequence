import React, { ReactElement } from "react";
import Head from "next/head";
import { Link } from "@mui/material";

export default function Home(): ReactElement {
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
      <main>
        <Link href="/makebeats">Make some beats</Link>
        <Link href="/account/login">Log in</Link>
        <Link href="/account/create">Create account</Link>
      </main>
    </div>
  );
}
