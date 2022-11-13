import { ReactElement } from "react";
import EmailPasswordForm from "../../../src/common/EmailPasswordForm";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Login(): ReactElement {
  return (
    <EmailPasswordForm hook={useSignInWithEmailAndPassword} action="signin" />
  );
}
