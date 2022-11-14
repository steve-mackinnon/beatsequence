import { ReactElement } from "react";
import Image from "next/image";
import { Stack } from "@mui/system";
import logo from "../../public/beatsequence-logo-white.svg";
export default function Navbar(): ReactElement {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      padding="10px"
      sx={{
        backgroundColor: "rgb(30,30,30)",
      }}
    >
      <Image
        src={logo}
        alt="Beatsequence company logo"
        width={120}
        height={50}
      />
    </Stack>
  );
}
