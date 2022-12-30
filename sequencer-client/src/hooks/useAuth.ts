import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export interface Auth {
  uid: string | undefined;
}
export function useAuth(): Auth {
  const [uid, setUid] = useState<string | undefined>(undefined);

  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (e: AuthChangeEvent, session: Session | null) => {
        if (e === "SIGNED_IN" || e === "USER_UPDATED") {
          if (session == null) {
            throw new Error("Session info unexpectedly null.");
          }
          setUid(session.user.id);
        } else if (e === "SIGNED_OUT") {
          setUid(undefined);
        }
      }
    );
  }, []);

  return {
    uid,
  };
}
