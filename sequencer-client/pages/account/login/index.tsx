import { TextField, Button } from "@mui/material";
import { ReactElement, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../src/firebase";
import { Stack } from "@mui/system";

export default function Login(): ReactElement {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSubmitButtonEnabled = (): boolean => {
    return email.length > 0 && password.length > 0;
  };
  const onSubmitClick = (_e: any): void => {
    signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);
    });
  };
  if (loading) {
    return <h1>Loading...</h1>;
  } else if (user == null) {
    return (
      <Stack spacing={3} alignItems="center">
        <h1>Beatsequence</h1>
        <h3>Log into your account</h3>
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
            minWidth: "300px",
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
            minWidth: "300px",
          }}
        />
        <Button
          variant="contained"
          disabled={!isSubmitButtonEnabled()}
          onClick={onSubmitClick}
          sx={{
            minWidth: "300px",
          }}
        >
          Log In
        </Button>
        {error != null && <span>Login failed: {error.message}</span>}
      </Stack>
    );
  } else {
    return <h1>User {user.user.uid} logged in</h1>;
  }
}
