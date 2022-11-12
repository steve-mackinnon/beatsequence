import { TextField, Button, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../src/firebase";
import { Stack } from "@mui/system";
import Link from "next/link";

export default function CreateAccount(): ReactElement {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSubmitButtonEnabled = (): boolean => {
    return email.length > 0 && password.length > 0 && user == null && !loading;
  };
  const onSubmitClick = (_e: any): void => {
    createUserWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);
    });
  };
  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="overline">Beatsequence</Typography>
      <Typography variant="subtitle1">Create your free account</Typography>
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
      <Button
        variant="contained"
        disabled={!isSubmitButtonEnabled()}
        onClick={onSubmitClick}
        sx={{
          minWidth: "320px",
        }}
      >
        Create Account
      </Button>
      <Typography>
        Already have an account? <Link href="/account/login">Login here</Link>
      </Typography>
      {loading && <Typography>Creating account...</Typography>}
      {user != null && !user.user.emailVerified && (
        <Typography>Account created successfully.</Typography>
      )}
      {error != null && (
        <Typography>Account creation failed: {error.message}</Typography>
      )}
    </Stack>
  );
}
