import { TextField, Button, Typography } from "@mui/material";
import { ReactElement, useContext, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { AuthContext } from "../../../src/context/authContext";
import { Stack } from "@mui/system";
import Link from "next/link";

export default function ResetPassword(): ReactElement {
  const auth = useContext(AuthContext);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [sentEmail, setSentEmail] = useState(false);
  const [email, setEmail] = useState("");

  const isSubmitButtonEnabled = (): boolean => {
    return email.length > 0;
  };
  const onSubmitClick = (_e: any): void => {
    sendPasswordResetEmail(email)
      .then((success: boolean) => {
        if (success) {
          setSentEmail(true);
        }
        if (!success && error != null) {
          console.log("Password reset failed with error " + error.message);
        }
      })
      .catch((_error) => {
        console.log("Password reset failed.");
      });
  };
  if (sentEmail) {
    return (
      <Stack spacing={3} alignItems="center">
        <Typography variant="overline">Beatsequence</Typography>
        <Typography align="center" variant="subtitle1" maxWidth="320px">
          Please check the email address {email} for instructions to reset your
          password.
        </Typography>
        <Button
          variant="contained"
          disabled={!isSubmitButtonEnabled()}
          onClick={onSubmitClick}
          sx={{
            minWidth: "320px",
          }}
        >
          Resend email
        </Button>
      </Stack>
    );
  }
  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="overline">Beatsequence</Typography>
      <Typography variant="subtitle1" align="center" maxWidth="320px">
        Enter your email address and we will send you instructions to reset your
        password.
      </Typography>
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
      <Button
        variant="contained"
        disabled={!isSubmitButtonEnabled()}
        onClick={onSubmitClick}
        sx={{
          minWidth: "320px",
        }}
      >
        Continue
      </Button>
      <Link href="/account/login">Back to login page</Link>
      {sending && <Typography>Sending email to {email}...</Typography>}
      {error != null && (
        <Typography>Password reset failed: {error.message}</Typography>
      )}
    </Stack>
  );
}
