import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_TOKEN_COOKIE } from "@/lib/admin/auth";

function getApiBaseUrl(): string {
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL belum dikonfigurasi.");
  }

  return apiBaseUrl.replace(/\/+$/, "");
}

export async function POST() {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    ADMIN_TOKEN_COOKIE,
  )?.value;

  /*
   * Coba hapus token aktif di Laravel.
   * Jika backend gagal dijangkau, sesi frontend
   * tetap harus dihapus.
   */
  if (token) {
    try {
      const backendResponse = await fetch(
        `${getApiBaseUrl()}/admin/logout`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!backendResponse.ok) {
        console.error(
          "Backend logout gagal:",
          backendResponse.status,
          await backendResponse.text(),
        );
      }
    } catch (error) {
      console.error(
        "Backend logout tidak dapat dihubungi:",
        error instanceof Error
          ? error.message
          : error,
      );
    }
  }

  const response = NextResponse.json(
    {
      message: "Logout berhasil.",
    },
    {
      status: 200,
    },
  );

  response.cookies.set({
    name: ADMIN_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}