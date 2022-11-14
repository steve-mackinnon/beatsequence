import { ReactElement } from "react";
import Image from "next/image";
import { Stack } from "@mui/system";
import logo from "../../public/beatsequence-logo-white.svg";
export default function Navbar(): ReactElement {
  return (
    <Stack flexDirection="row" justifyContent="space-between" padding="12px">
      <Image
        src={logo}
        alt="Beatsequence company logo"
        width={160}
        height={50}
      />
    </Stack>
  );
}
