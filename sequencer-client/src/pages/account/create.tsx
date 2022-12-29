import { ReactElement } from "react";
import { useCreateUserWithEmailAndPassword } from "../../hooks";
import EmailPasswordForm from "../../common/EmailPasswordForm";

export default function Create(): ReactElement {
  return (
    <EmailPasswordForm
      hook={useCreateUserWithEmailAndPassword}
      action="create"
    />
  );
}
