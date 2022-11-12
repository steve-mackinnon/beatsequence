import { TextField, Button } from "@mui/material";
import { ReactElement, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../src/firebase";
import { Stack } from "@mui/system";

export default function CreateAccount(): ReactElement {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSubmitButtonEnabled = (): boolean => {
    return email.length > 0 && password.length > 0;
  };
  const onSubmitClick = (_e: any): void => {
    createUserWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  };
  if (loading) {
    return <h1>Loading...</h1>;
  } else if (error != null) {
    return (
      <>
        <h1>Error</h1>
        <p>{error.message}</p>
      </>
    );
  } else if (user == null) {
    return (
      <Stack spacing={3} alignItems="center">
        <h1>Beatsequence</h1>
        <h2>Create a free account</h2>
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          variant="outlined"
          value={email}
          name="Email"
          type="text"
          label="Email"
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
        />
        <Button
          variant="contained"
          disabled={!isSubmitButtonEnabled()}
          onClick={onSubmitClick}
        >
          Create Account
        </Button>
      </Stack>
    );
  } else {
    return <h1>User {user.user.uid} logged in</h1>;
  }
}
