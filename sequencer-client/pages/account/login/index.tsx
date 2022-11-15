import { ReactElement } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";

// Disable SSR for the AudioWorkstation component since it's reliant
// on either randomized or user-saved state.
const DynamicLogin = dynamic(
  async () => await import("../../../src/common/EmailPasswordForm"),
  {
    ssr: false,
  }
);

export default function Login(): ReactElement {
  return <DynamicLogin hook={useSignInWithEmailAndPassword} action="signin" />;
}
