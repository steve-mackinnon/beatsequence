import { ReactElement } from "react";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import { Link } from "@remix-run/react";
import AppBar from "@mui/material/AppBar";
import ProfileMenu from "../components/ProfileMenu";
import { useAuth } from "../hooks";

interface NavbarProps {
  showSignInLink?: boolean;
  showSignUpLink?: boolean;
}

export default function Navbar(props: NavbarProps): ReactElement {
  const userLoggedIn = useAuth().uid != null;

  return (
    <AppBar
      position="static"
      sx={{
        height: "60px",
        justifyContent: "center",
      }}
    >
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft="1.5rem"
      >
        <Link
          to="/"
          style={{
            height: 30,
          }}
        >
          <img
            src="beatsequence-logo-white.png"
            alt="Beatsequence homepage"
            width={160}
            height={30}
          />
        </Link>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          padding="12px"
          alignItems="center"
        >
          {userLoggedIn && (
            <Link to="/projects" style={{ textDecoration: "none" }}>
              <Button>Projects</Button>
            </Link>
          )}
          {!userLoggedIn && (props.showSignUpLink ?? true) && (
            <Link to="/account/create" style={{ textDecoration: "none" }}>
              <Button>Sign up</Button>
            </Link>
          )}
          {!userLoggedIn && (props.showSignInLink ?? true) && (
            <Link to="/account/login" style={{ textDecoration: "none" }}>
              <Button>Sign in</Button>
            </Link>
          )}
          {userLoggedIn && <ProfileMenu />}
        </Stack>
      </Stack>
    </AppBar>
  );
}
