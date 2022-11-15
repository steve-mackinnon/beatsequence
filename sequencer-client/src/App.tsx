import MainInterface from "./components/MainInterface";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { randomize } from "./features/steps/steps";

// Always initialize the sequencer to a randomized state
store.dispatch(
  randomize({
    trackId: undefined,
    seed: Date.now().toString(),
  })
);

function App(): ReactElement {
  return (
    <Provider store={store}>
      <MainInterface />
    </Provider>
  );
}

export default App;
