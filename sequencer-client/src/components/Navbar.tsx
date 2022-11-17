import { ReactElement, useContext } from "react";
import Image from "next/image";
import { Stack } from "@mui/system";
import logo from "../../public/beatsequence-logo-white.svg";
import { Button } from "@mui/material";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/authContext";

interface NavbarProps {
  showSignInLink?: boolean;
  showSignUpLink?: boolean;
}

export default function Navbar(props: NavbarProps): ReactElement {
  const auth = useContext(AuthContext);
  const [user, loading] = useAuthState(auth);
  const notLoggedIn = user == null && !loading;

  return (
    <header>
      <AppBar position="static">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding="12px"
        >
          <Link href="/" passHref>
            <Image
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
            {notLoggedIn && (
              <Link href="/account/create" passHref>
                <Button>Sign up</Button>
              </Link>
            )}
            {notLoggedIn && (
              <Link href="/account/signin">
                <Button>Sign in</Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </AppBar>
    </header>
  );
}
