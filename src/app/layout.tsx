import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Siwatu | Alas Watu Kebonan",
  description: "Website desa wisata Alas Watu Kebonan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}