import { ReactElement } from "react";
import { useCreateUserWithEmailAndPassword } from "../../hooks";
import EmailPasswordForm from "../../shared-components/EmailPasswordForm";

export default function Create(): ReactElement {
  return (
    <EmailPasswordForm
      hook={useCreateUserWithEmailAndPassword}
      action="create"
    />
  );
}
