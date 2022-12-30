import { useState } from "react";
import { supabase } from "../supabaseClient";

export type SignInWithEmailAndPassword = (
  email: string,
  password: string
) => Promise<string | undefined>;
export interface SignInWithEmailAndPasswordHook {
  action: SignInWithEmailAndPassword;
  loading: boolean;
  error: string | undefined;
}

export function useSignInWithEmailAndPassword(): SignInWithEmailAndPasswordHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<string | undefined> => {
    setLoading(true);
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (response.error != null) {
      setError(response.error.message);
    }
    setLoading(false);
    return response.data.user?.id;
  };
  return {
    action: signInWithEmailAndPassword,
    loading,
    error,
  };
}
