"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import LayoutNavbar from "@/components/public/layoutNavbar";

type RouteLayoutProps = {
  children: ReactNode;
};

export default function RouteLayout({
  children,
}: RouteLayoutProps) {
  const pathname = usePathname();

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  /*
   * Route admin tidak menggunakan navbar
   * dan footer milik website public.
   */
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <LayoutNavbar>
      {children}
    </LayoutNavbar>
  );
}