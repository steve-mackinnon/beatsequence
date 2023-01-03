import { Outlet } from "@remix-run/react";
import { ReactElement } from "react";

export default function Root(): ReactElement {
  return (
    <html lang="en">
      <head key="mainHead">
        <title>
          Beatsequence - experimental beat making tool for the browser
        </title>
        <meta
          name="description"
          content="Make beats in your browser with this powerful step sequencer and synthesis engine. Works seamlessly on mobile or desktop."
        />
        <meta
          name="og:title"
          property="og:title"
          content="Beatsequence - experimental beat making tool for the browser"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://beatsequence.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">
          <Outlet />
        </div>
      </body>
    </html>
  );
}
