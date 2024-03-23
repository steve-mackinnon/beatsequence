import { PortProvider } from "../PortProvider";
import React from "react";

const portProvider = new PortProvider();
export const PortProviderContext = React.createContext(portProvider);
