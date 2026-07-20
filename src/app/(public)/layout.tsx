import type { ReactNode } from "react";

import LayoutNavbar from "@/components/public/layoutNavbar";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <LayoutNavbar>
      {children}
    </LayoutNavbar>
  );
}