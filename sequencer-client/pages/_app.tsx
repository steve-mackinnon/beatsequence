import React, { ReactElement } from "react";
import Layout from "../src/components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthContext } from "../src/context/authContext";
import { auth } from "../src/firebase";

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
      desktop: 1256,
    },
  },
  typography: {
    h1: {
      fontSize: 46,
    },
    h2: {
      fontSize: 30,
    },
    h3: {
      fontSize: 20,
    },
    h4: {
      fontSize: 16,
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
  const layoutNotNeeded = [`/makebeats`].includes(appProps.router.pathname);
  const LayoutComponent = layoutNotNeeded ? React.Fragment : Layout;

  return (
    <AuthContext.Provider value={auth}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
