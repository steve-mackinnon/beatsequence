import { ReactElement } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import EmailPasswordForm from "../../common/EmailPasswordForm";

export default function Login(): ReactElement {
  return (
    <EmailPasswordForm hook={useSignInWithEmailAndPassword} action="signin" />
  );
}