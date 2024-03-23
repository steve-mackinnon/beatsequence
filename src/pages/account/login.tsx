import { ReactElement } from "react";
import { useSignInWithEmailAndPassword } from "../../hooks";
import EmailPasswordForm from "../../shared-components/EmailPasswordForm";

export default function Login(): ReactElement {
  return (
    <EmailPasswordForm hook={useSignInWithEmailAndPassword} action="signin" />
  );
}
