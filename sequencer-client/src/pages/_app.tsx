import React, { ReactElement } from "react";
import Layout from "../common/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthContext } from "../context/authContext";
import { auth } from "../firebase";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "../styles/global.css";
import { store } from "../store";

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

export default function App({
  Component,
  pageProps,
  ...appProps
}: any): ReactElement {
  // Don't apply the shared layout to the /makebeats subpage, which creates it's
  // own bespoke "Layout"/header.
  // const layoutNotNeeded = [`/makebeats`].includes(appProps.router.pathname);
  // const LayoutComponent = layoutNotNeeded ? React.Fragment : Layout;

  return (
    <Provider store={store}>
      <AuthContext.Provider value={auth}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthContext.Provider>
    </Provider>
  );
}
