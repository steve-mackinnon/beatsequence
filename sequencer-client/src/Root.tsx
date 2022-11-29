import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { initializeApp } from "firebase/app";
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
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Outlet } from "react-router-dom";
import Layout from "./common/Layout";

const firebaseConfig = {
  apiKey: "AIzaSyCJrCkNuTumjOHhr5QU0RMPbdhNcf0QJ2s",
  authDomain: "beat-sequence.firebaseapp.com",
  projectId: "beat-sequence",
  storageBucket: "beat-sequence.appspot.com",
  messagingSenderId: "159976998115",
  appId: "1:159976998115:web:68e22e6db842809633b1d6",
  measurementId: "G-GTFRFW8HLL",
};

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

const APP_CHECK_TOKEN = "6LcWFyEjAAAAAJnCq6vcHLonsHeU0VuUHrDv6uSe";

function App(): React.ReactElement {
  const app = initializeApp(firebaseConfig);
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(APP_CHECK_TOKEN),
    isTokenAutoRefreshEnabled: true,
  });

  const database = getFirestore(app);
  const auth = getAuth(app);

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AppCheckProvider sdk={appCheck}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={database}>
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
