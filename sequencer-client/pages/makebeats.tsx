import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { randomize } from "../src/features/steps/steps";
import dynamic from "next/dynamic";
import Head from "next/head";

// Always initialize the sequencer to a randomized state
store.dispatch(
  randomize({
    trackId: undefined,
    seed: Date.now().toString(),
  })
);

// Disable SSR for the AudioWorkstation component since it's reliant
// on either randomized or user-saved state.
const DynamicAudioWorkstation = dynamic(
  async () => await import("../src/components/AudioWorkstation"),
  {
    ssr: false,
  }
);

function MakeBeats(): ReactElement {
  return (
    <div>
      <Head>
        <title>
          Make beats with Beatsequence - audio sequencer, synthesizer and drum
          machine for electronic music production
        </title>
        <meta
          name="description"
          content="Make beats and bleeps with this powerful sequencer and synth engine in your web browser. Export audio tracks and bring them into your DAW."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <DynamicAudioWorkstation />
      </Provider>
    </div>
  );
}

export default MakeBeats;
