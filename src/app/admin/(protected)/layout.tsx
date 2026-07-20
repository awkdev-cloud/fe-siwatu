import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import AdminShell from "@/components/admin/admin-shell";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin/auth";
import { getAdminProfile } from "@/lib/admin/server-api";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    ADMIN_TOKEN_COOKIE,
  )?.value;

  /*
   * Redirect hanya apabila cookie benar-benar
   * tidak tersedia.
   */
  if (!token) {
    redirect("/admin/login");
  }

  /*
   * Profile hanya untuk menampilkan identitas
   * pada AdminShell, bukan penentu redirect.
   */
  const profile = await getAdminProfile();

  const user = profile ?? {
    id: 0,
    name: "Admin SIWATU",
    email: "",
    role: "admin" as const,
  };

  return (
    <AdminShell user={user}>
      {children}
    </AdminShell>
  );
}