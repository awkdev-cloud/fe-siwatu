import type { Metadata } from "next";
import "./globals.css";
import LayoutNavbar from "@/components/public/layoutNavbar";

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
      <body>
        <LayoutNavbar>{children}</LayoutNavbar>
      </body>
    </html>
  );
}