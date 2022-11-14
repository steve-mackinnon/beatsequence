import { TextField, Button, Typography } from "@mui/material";
import { ReactElement, useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Stack, styled } from "@mui/system";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

const Spacer = styled("div")(
  ({ theme }) => `
  height: 1.5rem;
  `
);
const ContainerForm = styled("form")(
  ({ theme }) => `
  width: 100%;
  justify-content: center;
  display: flex;
  `
);

export interface EmailPasswordFormProps {
  hook:
    | typeof useCreateUserWithEmailAndPassword
    | typeof useSignInWithEmailAndPassword;
  action: "create" | "signin";
}
export default function EmailPasswordForm(
  props: EmailPasswordFormProps
): ReactElement {
  const router = useRouter();
  const [createOrLoginWithEmailAndPassword, user, loading, error] =
    props.hook(auth);

  const subtitleText =
    props.action === "create" ? "Create an account" : "Sign in";

  const gotoOtherPageText = props.action === "create" ? "or " : "or ";
  const otherPagePath =
    props.action === "create" ? "/account/login" : "/account/create";
  const otherPageAction = props.action === "create" ? "Sign in" : "Sign up";

  // Route user to homepage after account creation or login succeed
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
        void createOrLoginWithEmailAndPassword(values.email, values.password);
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
                <Link href={otherPagePath}>{otherPageAction}</Link>
              </Typography>
            </Stack>
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
              {props.action === "signin" && (
                <Link href="/account/reset-password">Forgot password?</Link>
              )}
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
              {props.action === "create" ? "Create Account" : "Sign in"}
            </Button>
            {loading && (
              <Typography>
                {props.action === "create"
                  ? "Creating account..."
                  : "Signing in..."}
              </Typography>
            )}
            {user != null && !user.user.emailVerified && (
              <Typography color="green">Success.</Typography>
            )}
            {error != null && (
              <Typography variant="subtitle2" color="red">
                {props.action === "create" ? "Account creation " : "Sign-in "}{" "}
                failed: {error.message}
              </Typography>
            )}
          </Stack>
        </ContainerForm>
      )}
    </Formik>
  );
}
