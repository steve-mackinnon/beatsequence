import { useState } from "react";
import { supabase } from "../supabaseClient";

export type CreateUserWithEmailAndPassword = (
  email: string,
  password: string
) => Promise<string | undefined>;
export interface CreateUserWithEmailAndPasswordHook {
  action: CreateUserWithEmailAndPassword;
  loading: boolean;
  error: string | undefined;
}
export function useCreateUserWithEmailAndPassword(): CreateUserWithEmailAndPasswordHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<string | undefined> => {
    setError(undefined);
    setLoading(true);
    const response = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (response.error != null) {
      setError(response.error.message);
    }
    return response.data.user?.id;
  };

  return {
    action: createUserWithEmailAndPassword,
    loading,
    error,
  };
}
