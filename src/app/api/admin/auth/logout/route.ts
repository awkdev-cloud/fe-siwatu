import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_TOKEN_COOKIE } from "@/lib/admin/auth";

function getLogoutUrl(): string {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL belum dikonfigurasi.");
  }

  return `${baseUrl.replace(/\/+$/, "")}/api/admin/logout`;
}

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

  if (token) {
    try {
      await fetch(getLogoutUrl(), {
        method: "POST",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Cookie lokal tetap dihapus.
    }
  }

  const response = NextResponse.json({
    message: "Logout berhasil.",
  });

  response.cookies.delete(ADMIN_TOKEN_COOKIE);
  return response;
}
