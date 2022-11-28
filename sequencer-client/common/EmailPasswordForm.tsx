"use client";

import {
  TextField,
  Button,
  Typography,
  Link as MUILink,
  Alert,
} from "@mui/material";
import { ReactElement, useEffect } from "react";
import {
  browserLocalPersistence,
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { Stack, styled } from "@mui/system";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useUser, useFirebaseApp } from "reactfire";

const ContainerForm = styled("form")(
  ({ theme }) => `
  padding: 1rem;
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 4rem;
  `
);

export interface EmailPasswordFormProps {
  hook:
    | typeof createUserWithEmailAndPassword
    | typeof signInWithEmailAndPassword;
  action: "create" | "signin";
}
export default function EmailPasswordForm(
  props: EmailPasswordFormProps
): ReactElement {
  const { status, data: user } = useUser();
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const router = useRouter();

  const subtitleText =
    props.action === "create" ? "Create an account" : "Sign in";

  const gotoOtherPageText = props.action === "create" ? "or " : "or ";
  const otherPagePath =
    props.action === "create" ? "/account/login" : "/account/create";
  const otherPageAction = props.action === "create" ? "Sign in" : "Sign up";

  // Route user to homepage after account creation or login succeed
  useEffect(() => {
    if (user != null) {
      void router.push("/makebeats");
    }
  }, [user, router]);

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
      onSubmit={async (values) => {
        await setPersistence(auth, browserLocalPersistence).then(async () => {
          await props.hook(auth, values.email, values.password);
        });
      }}
    >
      {(formik) => (
        <ContainerForm onSubmit={formik.handleSubmit}>
          <Stack spacing={2} justifyContent="center" maxWidth="346px">
            <Stack
              sx={{
                alignItems: "baseline",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Typography fontSize={"24px"}>{subtitleText}</Typography>
              <Typography fontSize="14px">
                {gotoOtherPageText}
                <Link href={otherPagePath} passHref>
                  <MUILink>{otherPageAction}</MUILink>
                </Link>
              </Typography>
            </Stack>
            <Stack spacing={3} alignItems="left">
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
                formik.errors.email != null && (
                  <Alert severity="error">{formik.errors.email}</Alert>
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
              {props.action === "signin" && (
                <Link href="/account/reset-password" passHref>
                  <MUILink>Forgot password?</MUILink>
                </Link>
              )}
              {props.action === "create" &&
                (formik.touched.password ?? false) &&
                formik.errors.password != null && (
                  <Alert severity="error">{formik.errors.password}</Alert>
                )}
              <Button
                variant="contained"
                type="submit"
                disabled={!formik.isValid}
                sx={{
                  minWidth: "320px",
                }}
              >
                {props.action === "create" ? "Create Account" : "Sign in"}
              </Button>
              {status === "loading" && (
                <Typography>
                  {props.action === "create"
                    ? "Creating account..."
                    : "Signing in..."}
                </Typography>
              )}
              {user != null && !user.emailVerified && (
                <Typography color="green">Success.</Typography>
              )}
              {status === "error" && (
                <Typography variant="subtitle2" color="red">
                  {props.action === "create" ? "Account creation " : "Sign-in "}{" "}
                  failed
                </Typography>
              )}
            </Stack>
          </Stack>
        </ContainerForm>
      )}
    </Formik>
  );
}
