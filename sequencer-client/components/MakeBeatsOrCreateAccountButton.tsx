"use client";

import React from "react";
import { useUser } from "reactfire";
import Link from "next/link";
import { Button } from "@mui/material";

export default function MakeBeatsOrCreateAccountButton(): React.ReactElement {
  const { data: user } = useUser();
  const notAuthorized = user == null;
  if (notAuthorized) {
    return (
      <Link href="/account/create" passHref style={{ textDecoration: "none" }}>
        <Button size="large" variant="contained">
          Get started
        </Button>
      </Link>
    );
  }
  return (
    <Link href="/makebeats" passHref style={{ textDecoration: "none" }}>
      <Button size="large" variant="contained">
        Get Started
      </Button>
    </Link>
  );
}
