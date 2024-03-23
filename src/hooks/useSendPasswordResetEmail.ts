import { useContext, useState } from "react";
import { PortProviderContext } from "../context/PortProviderContext";

export interface SendPasswordResetEmailHook {
  sending: boolean;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  error: string | undefined;
}
export function useSendPasswordResetEmail(): SendPasswordResetEmailHook {
  const portProvider = useContext(PortProviderContext);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    setSending(true);
    setError(undefined);
    const success =
      await portProvider.resetPasswordAdapter.sendPasswordResetEmail(email);
    if (!success) {
      setError("Failed to send password reset email.");
      return false;
    }
    return true;
  };
  return {
    sending,
    sendPasswordResetEmail,
    error,
  };
}
