import { useState } from "react";
import { supabase } from "../supabaseClient";

export interface SendPasswordResetEmailHook {
  sending: boolean;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  error: string | undefined;
}
export function useSendPasswordResetEmail(): SendPasswordResetEmailHook {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  const resetPassword = async (email: string): Promise<boolean> => {
    setError(undefined);
    setSending(true);
    const response = await supabase.auth.resetPasswordForEmail(email);
    if (response.error != null) {
      setError(response.error.message);
      return false;
    }
    return true;
  };
  return {
    sending,
    sendPasswordResetEmail: resetPassword,
    error,
  };
}
