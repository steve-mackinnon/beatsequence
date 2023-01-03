import { getAuth } from "firebase/auth";
import { useFirebaseApp } from "reactfire";

export interface Auth {
  uid: string | undefined;
}
export function useAuth(): Auth {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return {
    uid: auth.currentUser?.uid,
  };
}
