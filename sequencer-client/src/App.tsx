import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { randomize } from "./features/steps/steps";
import dynamic from "next/dynamic";

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
  async () => await import("./components/AudioWorkstation"),
  {
    ssr: false,
  }
);

function App(): ReactElement {
  return (
    <Provider store={store}>
      <DynamicAudioWorkstation />
    </Provider>
  );
}

export default App;
