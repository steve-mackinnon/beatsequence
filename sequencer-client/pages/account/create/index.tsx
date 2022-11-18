import { ReactElement } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import EmailPasswordForm from "../../../common/EmailPasswordForm";

export default function Create(): ReactElement {
  return (
    <EmailPasswordForm
      hook={useCreateUserWithEmailAndPassword}
      action="create"
    />
  );
}
