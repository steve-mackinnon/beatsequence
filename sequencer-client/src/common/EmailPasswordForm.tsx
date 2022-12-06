import { TextField, Button, Typography, Link as MUILink } from "@mui/material";
import { ReactElement, useContext, useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { Stack, styled } from "@mui/system";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../context/authContext";

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
    | typeof useCreateUserWithEmailAndPassword
    | typeof useSignInWithEmailAndPassword;
  action: "create" | "signin";
}
export default function EmailPasswordForm(
  props: EmailPasswordFormProps
): ReactElement {
  const auth = useContext(AuthContext);
  const [createOrLoginWithEmailAndPassword, user, loading, error] =
    props.hook(auth);
  const [authUser] = useAuthState(auth);
  const navigate = useNavigate();

  const subtitleText =
    props.action === "create" ? "Create an account" : "Sign in";

  const gotoOtherPageText = props.action === "create" ? "or " : "or ";
  const otherPagePath =
    props.action === "create" ? "/account/login" : "/account/create";
  const otherPageAction = props.action === "create" ? "Sign in" : "Sign up";

  // Route user to homepage after account creation or login succeed
  useEffect(() => {
    if (authUser != null) {
      navigate("/makebeats");
    }
  }, [authUser, navigate]);

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
                <Link to={otherPagePath}>
                  <MUILink>{otherPageAction}</MUILink>
                </Link>
              </Typography>
            </Stack>
            <Stack spacing={3} alignItems="left">
              <Stack spacing={1}>
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
                    <Typography color="red">{formik.errors.email}</Typography>
                  )}
              </Stack>
              <Stack spacing={1}>
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
                  <Link to="/account/reset-password">
                    <MUILink>Forgot password?</MUILink>
                  </Link>
                )}
                {props.action === "create" &&
                  (formik.touched.password ?? false) &&
                  formik.errors.password != null && (
                    <Typography color="red">
                      {formik.errors.password}
                    </Typography>
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
          </Stack>
        </ContainerForm>
      )}
    </Formik>
  );
}
