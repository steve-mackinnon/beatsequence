import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import CreateAccount from "./pages/account/create";
import Login from "./pages/account/login";
import ResetPassword from "./pages/account/reset-password";
import Projects from "./pages/projects";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AudioWorkstation from "./components/AudioWorkstation";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/account">
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/reset-password" element={<ResetPassword />} />
        <Route path="/account/create" element={<CreateAccount />} />
      </Route>
      <Route path="/makebeats" element={<AudioWorkstation />} />
      <Route path="/projects" element={<Projects />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
