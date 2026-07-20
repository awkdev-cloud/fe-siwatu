import type { ReactNode } from "react";

import RouteLayout from "@/components/layout/route-layout";

import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="id">
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">
        <RouteLayout>
          {children}
        </RouteLayout>
      </body>
    </html>
  );
}