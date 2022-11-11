import React, { ReactElement } from "react";
import Head from "next/head";
import App from "../src/App";

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
        <App />
      </main>
    </div>
  );
}
