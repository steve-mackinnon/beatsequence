import Layout from "../src/components/Layout";
import { ReactElement } from "react";
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
      tablet: 560,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export default function App({ Component, pageProps }: any): ReactElement {
  return (
    <AuthContext.Provider value={auth}>
      <Layout>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Layout>
    </AuthContext.Provider>
  );
}
