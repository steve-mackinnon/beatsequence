import { ReactElement } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";

// Disable SSR for the AudioWorkstation component since it's reliant
// on either randomized or user-saved state.
const DynamicCreateAccount = dynamic(
  async () => await import("../../../src/common/EmailPasswordForm"),
  {
    ssr: false,
  }
);

export default function Create(): ReactElement {
  return (
    <DynamicCreateAccount
      hook={useCreateUserWithEmailAndPassword}
      action="create"
    />
  );
}
