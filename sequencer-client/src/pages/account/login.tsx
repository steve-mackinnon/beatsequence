import { ReactElement } from "react";
import { useSignInWithEmailAndPassword } from "../../hooks";
import EmailPasswordForm from "../../common/EmailPasswordForm";

export default function Login(): ReactElement {
  return (
    <EmailPasswordForm hook={useSignInWithEmailAndPassword} action="signin" />
  );
}
