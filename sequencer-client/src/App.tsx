import "./App.css";
import { RecoilRoot } from "recoil";
import MainInterface from "./components/MainInterface";
import React, { ReactElement } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App(): ReactElement {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RecoilRoot>
          <MainInterface />
        </RecoilRoot>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
