import {
  TextField,
  Button,
  Typography,
  Link as MUILink,
  Alert,
} from "@mui/material";
import { ReactElement, useContext, useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { Stack, styled } from "@mui/system";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { AuthContext } from "../context/authContext";
import styles from "../styles/Input.module.css";

const ContainerForm = styled("form")(
  ({ theme }) => `
  padding: 1rem;
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 4grem;
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
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [createOrLoginWithEmailAndPassword, user, loading, error] =
    props.hook(auth);
  const [authUser] = useAuthState(auth);

  const subtitleText =
    props.action === "create" ? "Create an account" : "Sign in";

  const gotoOtherPageText = props.action === "create" ? "or " : "or ";
  const otherPagePath =
    props.action === "create" ? "/account/login" : "/account/create";
  const otherPageAction = props.action === "create" ? "Sign in" : "Sign up";

  const inputStyle = { WebkitBoxShadow: "0 0 0 1000px rgb(39,39,39) inset" };

  // Route user to homepage after account creation or login succeed
  useEffect(() => {
    if (authUser != null) {
      void router.push("/makebeats");
    }
  }, [authUser, router]);

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
          await createOrLoginWithEmailAndPassword(
            values.email,
            values.password
          );
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
                inputProps={{ style: inputStyle }}
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
                inputProps={{ style: inputStyle }}
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
          </Stack>
        </ContainerForm>
      )}
    </Formik>
  );
}
