import "./App.css";
import MainInterface from "./components/MainInterface";
import React, { ReactElement } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { randomize } from "./features/steps/steps";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 560,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

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
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <MainInterface />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
