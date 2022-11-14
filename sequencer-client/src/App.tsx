import MainInterface from "./components/MainInterface";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { randomize } from "./features/steps/steps";
import { AuthContext } from "./context/authContext";
import { auth } from "./firebase";

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
      <AuthContext.Provider value={auth}>
        <MainInterface />
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
