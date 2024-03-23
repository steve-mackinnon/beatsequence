import { useContext, useState } from "react";
import { PortProviderContext } from "../context/PortProviderContext";
import { CreateUser } from "../ports/createUser";
import { User } from "../entities/user";

export interface CreateUserWithEmailAndPasswordHook {
  action: CreateUser["createUserWithEmailAndPassword"];
  loading: boolean;
  error: string | undefined;
}
export function useCreateUserWithEmailAndPassword(): CreateUserWithEmailAndPasswordHook {
  const portProvider = useContext(PortProviderContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    setLoading(true);
    setError(undefined);
    const user =
      await portProvider.createUserAdapter.createUserWithEmailAndPassword(
        email,
        password
      );
    if (user == null) {
      setError("Failed to create user.");
    }
    setLoading(false);
    return user;
  };

  return {
    action: createUserWithEmailAndPassword,
    loading,
    error,
  };
}
