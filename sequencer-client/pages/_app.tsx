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
      desktop: 1200,
    },
  },
});

export default function App({
  Component,
  pageProps,
  ...appProps
}: any): ReactElement {
  const layoutNotNeeded = [`/`].includes(appProps.router.pathname);

  const LayoutComponent = layoutNotNeeded ? React.Fragment : Layout;

  return (
    <AuthContext.Provider value={auth}>
      <LayoutComponent>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </LayoutComponent>
    </AuthContext.Provider>
  );
}
