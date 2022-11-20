import { ReactElement, useContext } from "react";
import Image from "next/image";
import { Stack } from "@mui/system";
import logo from "../public/beatsequence-logo-white.png";
import { Button } from "@mui/material";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/authContext";
import ProfileMenu from "../components/ProfileMenu";

interface NavbarProps {
  showSignInLink?: boolean;
  showSignUpLink?: boolean;
}

export default function Navbar(props: NavbarProps): ReactElement {
  const auth = useContext(AuthContext);
  const [user, loading] = useAuthState(auth);
  const userLoggedIn = !(user == null && !loading);

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
          href="/"
          passHref
          style={{
            height: 30,
          }}
        >
          <Image
            priority={true}
            src={logo}
            alt="Beatsequence homepage"
            width={160}
            height={30}
          />
        </Link>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          padding="12px"
        >
          {!userLoggedIn && (props.showSignUpLink ?? true) && (
            <Link
              href="/account/create"
              passHref
              style={{ textDecoration: "none" }}
            >
              <Button>Sign up</Button>
            </Link>
          )}
          {!userLoggedIn && (props.showSignInLink ?? true) && (
            <Link href="/account/login" style={{ textDecoration: "none" }}>
              <Button>Sign in</Button>
            </Link>
          )}
          {userLoggedIn && <ProfileMenu />}
        </Stack>
      </Stack>
    </AppBar>
  );
}
