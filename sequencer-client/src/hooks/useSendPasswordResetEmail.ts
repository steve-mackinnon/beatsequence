import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useSendPasswordResetEmail as firbaseUseSendPasswordResetEmail } from "react-firebase-hooks/auth";

export interface SendPasswordResetEmailHook {
  sending: boolean;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  error: string | undefined;
}
export function useSendPasswordResetEmail(): SendPasswordResetEmailHook {
  const auth = useContext(AuthContext);
  const [sendPasswordResetEmail, sending, error] =
    firbaseUseSendPasswordResetEmail(auth);
  return {
    sending,
    sendPasswordResetEmail,
    error: error?.message,
  };
}
