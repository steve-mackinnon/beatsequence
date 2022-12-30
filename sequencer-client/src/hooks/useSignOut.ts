import { supabase } from "../supabaseClient";

export type SignOut = () => Promise<boolean>;

export function useSignOut(): SignOut {
  const signOut = async (): Promise<boolean> => {
    const response = await supabase.auth.signOut();
    const success = response.error == null;
    return success;
  };
  return signOut;
}
