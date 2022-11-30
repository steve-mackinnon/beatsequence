import { TextField, Button, Typography, Link as MUILink } from "@mui/material";
import { ReactElement, useContext, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { AuthContext } from "../../../context/authContext";
import { Stack, styled } from "@mui/system";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

const Spacer = styled("div")(
  ({ theme }) => `
  height: 1.5rem
  `
);

const Container = styled("form")(
  ({ theme }) => `
  padding: 1rem;
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 4rem;
  `
);

export default function ResetPassword(): ReactElement {
  const auth = useContext(AuthContext);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [sentEmail, setSentEmail] = useState(false);
  const [email, setEmail] = useState("");

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
      <Container>
        <Stack spacing={3} alignItems="center">
          <Typography align="center" variant="subtitle1" maxWidth="320px">
            Please check the email address {email} for instructions to reset
            your password.
          </Typography>
          <Button
            variant="contained"
            onClick={onSubmitClick}
            sx={{
              minWidth: "320px",
            }}
          >
            Resend email
          </Button>
        </Stack>
      </Container>
    );
  }
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email required"),
      })}
      onSubmit={(values) => {
        setEmail(values.email);
        sendPasswordResetEmail(values.email)
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
      }}
    >
      {(formik) => (
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} alignItems="center">
              <Typography fontSize={"24px"}>Forgot your password?</Typography>
              <Typography variant="subtitle1" align="center" maxWidth="320px">
                Enter your email address and we will send you instructions to
                reset your password.
              </Typography>
              <Stack alignItems="left">
                <TextField
                  variant="outlined"
                  type="text"
                  label="Email"
                  sx={{
                    minWidth: "320px",
                  }}
                  {...formik.getFieldProps("email")}
                />
                {(formik.touched.email ?? false) &&
                formik.errors.email != null ? (
                  <Typography variant="subtitle2" color="red">
                    {formik.errors.email}
                  </Typography>
                ) : (
                  <Spacer />
                )}
              </Stack>
              <Button
                variant="contained"
                disabled={!formik.isValid}
                type="submit"
                sx={{
                  minWidth: "320px",
                }}
              >
                Continue
              </Button>
              <Link to="/account/login">
                <MUILink>Back to login page</MUILink>
              </Link>
              {sending && (
                <Typography variant="subtitle2">
                  Sending email to {email}...
                </Typography>
              )}
              {error != null && (
                <Typography variant="subtitle2">
                  Password reset failed: {error.message}
                </Typography>
              )}
            </Stack>
          </form>
        </Container>
      )}
    </Formik>
  );
}
