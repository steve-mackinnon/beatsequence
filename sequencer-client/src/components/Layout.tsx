import { ReactElement } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactElement[] | ReactElement;
}

export default function Layout(props: LayoutProps): ReactElement {
  const router = useRouter();
  const showSignInLink = router.route !== "/account/login";
  const showSignUpLink = router.route !== "/account/create";
  return (
    <>
      <Navbar showSignInLink={showSignInLink} showSignUpLink={showSignUpLink} />
      <main>{props.children}</main>
    </>
  );
}
