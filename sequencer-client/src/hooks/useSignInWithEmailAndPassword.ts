import { useSignInWithEmailAndPassword as firebaseSignIn } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useFirebaseApp } from "reactfire";

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
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const [signIn, , loading, error] = firebaseSignIn(auth);

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<string | undefined> => {
    const userCredential = await signIn(email, password);
    return userCredential?.user.uid;
  };
  return {
    action: createUserWithEmailAndPassword,
    loading,
    error: error?.message,
  };
}
