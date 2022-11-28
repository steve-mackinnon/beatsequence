"use client";

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
