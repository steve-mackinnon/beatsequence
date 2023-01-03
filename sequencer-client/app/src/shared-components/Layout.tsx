import { ReactElement } from "react";
import Navbar from "./Navbar";
import { useLocation } from "@remix-run/react";

interface LayoutProps {
  children: ReactElement[] | ReactElement;
}

export default function Layout(props: LayoutProps): ReactElement {
  const location = useLocation();
  const showSignInLink = location.pathname !== "/account/login";
  const showSignUpLink = location.pathname !== "/account/create";
  return (
    <>
      <Navbar showSignInLink={showSignInLink} showSignUpLink={showSignUpLink} />
      <main>{props.children}</main>
    </>
  );
}
