import { TextField, Button, Typography } from "@mui/material";
import { ReactElement, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../src/firebase";
import { Stack, styled } from "@mui/system";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

const Spacer = styled("div")(
  ({ theme }) => `
  height: 1.5rem
  `
);

export default function CreateAccount(): ReactElement {
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Route user to homepage after account creation succeeds
  useEffect(() => {
    if (user != null && router.pathname !== "/") {
      void router.push("/");
    }
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email required"),
        password: Yup.string()
          .required("Password required")
          .min(6, "Password must be at least 6 characters long."),
      })}
      onSubmit={(values) => {
        void createUserWithEmailAndPassword(values.email, values.password);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="overline">Beatsequence</Typography>
            <Typography variant="subtitle1">
              Create your free account
            </Typography>
            <Stack spacing={1} alignItems="left">
              <TextField
                variant="outlined"
                id="email"
                type="email"
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
              <TextField
                variant="outlined"
                type="password"
                label="Password"
                sx={{
                  minWidth: "320px",
                }}
                {...formik.getFieldProps("password")}
              />
              {(formik.touched.password ?? false) &&
              formik.errors.password != null ? (
                <Typography variant="subtitle2" color="red">
                  {formik.errors.password}
                </Typography>
              ) : (
                <Spacer />
              )}
            </Stack>
            <Button
              variant="contained"
              type="submit"
              disabled={!formik.isValid}
              sx={{
                minWidth: "320px",
              }}
            >
              Create Account
            </Button>
            <Typography>
              Already have an account?{" "}
              <Link href="/account/login">Login here</Link>
            </Typography>
            {loading && <Typography>Creating account...</Typography>}
            {user != null && !user.user.emailVerified && (
              <Typography>Account created successfully.</Typography>
            )}
            {error != null && (
              <Typography>Account creation failed: {error.message}</Typography>
            )}
          </Stack>
        </form>
      )}
    </Formik>
  );
}
