import { useContext, useState } from "react";
import { PortProviderContext } from "../context/PortProviderContext";
import { User } from "../entities/user";
import { SignIn } from "../ports";

export interface SignInWithEmailAndPasswordHook {
  action: SignIn["signInWithEmailAndPassword"];
  loading: boolean;
  error: string | undefined;
}

export function useSignInWithEmailAndPassword(): SignInWithEmailAndPasswordHook {
  const portProvider = useContext(PortProviderContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    setLoading(true);
    const user = await portProvider.signInAdapter.signInWithEmailAndPassword(
      email,
      password
    );
    if (user == null) {
      setError("Failed to sign in.");
    }
    setLoading(false);
    return user;
  };
  return {
    action: signInWithEmailAndPassword,
    loading,
    error,
  };
}
