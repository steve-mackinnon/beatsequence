import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/global.css";
import { store } from "./store";
import {
  FirebaseAppProvider,
  AppCheckProvider,
  FirestoreProvider,
  AuthProvider,
} from "reactfire";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Outlet } from "react-router-dom";
import Layout from "./common/Layout";
import { app, db, auth, appCheck } from "./firebase";

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
      tablet: 650,
      laptop: 1024,
      desktop: 1284,
    },
  },
  typography: {
    h1: {
      fontSize: 42,
    },
    h2: {
      fontSize: 28,
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 14,
    },
  },
});

function App(): React.ReactElement {
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AppCheckProvider sdk={appCheck}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={db}>
            <Provider store={store}>
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Layout>
                  <Outlet />
                </Layout>
              </ThemeProvider>
            </Provider>
          </FirestoreProvider>
        </AuthProvider>
      </AppCheckProvider>
    </FirebaseAppProvider>
  );
}

export default App;