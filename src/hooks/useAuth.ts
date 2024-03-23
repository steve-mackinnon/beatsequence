import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { useState, useEffect } from "react";

export interface Auth {
  uid: string | undefined;
}
export function useAuth(): Auth {
  const [uid, setUid] = useState<string | undefined>(
    getAuth(app).currentUser?.uid
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      setUid(user?.uid);
    });
    return unsubscribe;
  }, []);

  return {
    uid,
  };
}
