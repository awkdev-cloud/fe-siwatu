import "server-only";

import { cookies } from "next/headers";

import { ADMIN_TOKEN_COOKIE } from "@/lib/admin/auth";
import type { AdminUser } from "@/lib/admin/types";

function getApiBaseUrl(): string {
  const value = process.env.API_BASE_URL;

  if (!value) {
    throw new Error("API_BASE_URL belum dikonfigurasi.");
  }

  return value.replace(/\/+$/, "");
}

function makeAdminUrl(path: string): string {
  return `${getApiBaseUrl()}/api/admin/${path.replace(/^\/+/, "")}`;
}

export async function getAdminProfile(): Promise<AdminUser | null> {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(makeAdminUrl("profile"), {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { user?: AdminUser };
    return payload.user ?? null;
  } catch {
    return null;
  }
}

export async function adminServerFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    throw new Error("Sesi admin tidak tersedia.");
  }

  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(makeAdminUrl(path), {
    ...init,
    headers,
    cache: "no-store",
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Admin API gagal dengan status ${response.status}.`;

    throw new Error(message);
  }

  return payload as T;
}
