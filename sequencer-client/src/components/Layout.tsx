import { ReactElement } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactElement[] | ReactElement;
}

export default function Layout(props: LayoutProps): ReactElement {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
}