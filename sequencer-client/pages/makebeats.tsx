import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { randomize } from "../features/steps/steps";
import Head from "next/head";
import AudioWorkstation from "../components/AudioWorkstation";

// Always initialize the sequencer to a randomized state
store.dispatch(
  randomize({
    trackId: undefined,
    seed: Date.now().toString(),
  })
);

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
      <Provider store={store}>
        <AudioWorkstation />
      </Provider>
    </>
  );
}

export default MakeBeats;
