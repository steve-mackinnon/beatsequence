import { TextField, Button, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../src/firebase";
import { Stack } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login(): ReactElement {
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSubmitButtonEnabled = (): boolean => {
    return email.length > 0 && password.length > 0 && user == null;
  };
  const onSubmitClick = (_e: any): void => {
    signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    if (user != null) {
      void router.push("/");
    }
  });
  return (
    <Stack spacing={3} alignItems="center" justifyContent="center">
      <Typography variant="overline">Beatsequence</Typography>
      <Typography variant="subtitle1">Log into your account</Typography>
      <TextField
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        variant="outlined"
        value={email}
        name="Email"
        type="text"
        label="Email"
        sx={{
          minWidth: "320px",
        }}
      />
      <TextField
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        variant="outlined"
        value={password}
        name="Password"
        type="password"
        label="Password"
        sx={{
          minWidth: "320px",
        }}
      />
      <Link href="/account/reset-password">Forgot password?</Link>
      <Button
        variant="contained"
        disabled={!isSubmitButtonEnabled()}
        onClick={onSubmitClick}
        sx={{
          minWidth: "320px",
        }}
      >
        Log In
      </Button>
      <Typography>
        First time here? <Link href="/account/create">Create an account.</Link>{" "}
      </Typography>
      {loading && <Typography>Signing in...</Typography>}
      {error != null && <Typography>Login failed: {error.message}</Typography>}
    </Stack>
  );
}
