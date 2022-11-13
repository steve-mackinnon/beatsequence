import { ReactElement } from "react";
import EmailPasswordForm from "../../../src/common/EmailPasswordForm";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function CreateAccount(): ReactElement {
  return (
    <EmailPasswordForm
      hook={useCreateUserWithEmailAndPassword}
      action="create"
    />
  );
}
