"use client";

import { ReactElement } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import EmailPasswordForm from "../../../common/EmailPasswordForm";

export default function Create(): ReactElement {
  return (
    <EmailPasswordForm hook={createUserWithEmailAndPassword} action="create" />
  );
}
