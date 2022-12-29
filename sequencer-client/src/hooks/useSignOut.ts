import { useSignOut as firebaseSignOut } from "react-firebase-hooks/auth";
import { useFirebaseApp } from "reactfire";
import { getAuth } from "firebase/auth";

export type SignOut = () => Promise<boolean>;

export function useSignOut(): SignOut {
  const auth = getAuth(useFirebaseApp());
  const [signOut] = firebaseSignOut(auth);
  return signOut;
}
