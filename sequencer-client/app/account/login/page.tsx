"use client";

import React, { ReactElement } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import EmailPasswordForm from "../../../common/EmailPasswordForm";

export default function Login(): ReactElement {
  return (
    <EmailPasswordForm hook={signInWithEmailAndPassword} action="signin" />
  );
}
