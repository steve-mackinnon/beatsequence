import { useCreateUserWithEmailAndPassword as firebaseCreateUser } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useFirebaseApp } from "reactfire";

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
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const [createUser, , loading, error] = firebaseCreateUser(auth);

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<string | undefined> => {
    const userCredential = await createUser(email, password);
    return userCredential?.user.uid;
  };

  return {
    action: createUserWithEmailAndPassword,
    loading,
    error: error?.message,
  };
}
