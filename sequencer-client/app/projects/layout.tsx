import React from "react";
import ClientProviders from "../clientProviders";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <ClientProviders>
      <section>{children}</section>
    </ClientProviders>
  );
}
