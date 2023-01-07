import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFirebaseApp } from "reactfire";
import { useState, useEffect } from "react";

export interface Auth {
  uid: string | undefined;
}
export function useAuth(): Auth {
  const app = useFirebaseApp();
  const [uid, setUid] = useState<string | undefined>(
    getAuth(app).currentUser?.uid
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      setUid(user?.uid);
    });
    return unsubscribe;
  }, [app]);

  return {
    uid,
  };
}
