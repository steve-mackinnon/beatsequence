import "./App.css";
import { RecoilRoot } from "recoil";
import MainInterface from "./components/MainInterface";
import React, { ReactElement } from "react";

function App(): ReactElement {
  return (
    <RecoilRoot>
      <MainInterface />
    </RecoilRoot>
  );
}

export default App;
