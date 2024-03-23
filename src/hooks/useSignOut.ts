import { useContext } from "react";
import { PortProviderContext } from "../context/PortProviderContext";

export type SignOut = () => Promise<boolean>;

export function useSignOut(): SignOut {
  const portProvider = useContext(PortProviderContext);
  return async () => await portProvider.signOutAdapter.signOut();
}
