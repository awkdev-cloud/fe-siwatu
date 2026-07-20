"use client";

export class AdminApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.errors = errors;
  }
}

export async function adminRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const cleanPath = path.replace(/^\/+/, "");
  const headers = new Headers(init.headers);
  const isFormData =
    typeof FormData !== "undefined" && init.body instanceof FormData;

  headers.set("Accept", "application/json");

  if (init.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`/api/admin/backend/${cleanPath}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const text = await response.text();
  const payload = text
    ? (JSON.parse(text) as Record<string, unknown>)
    : {};

  if (!response.ok) {
    throw new AdminApiError(
      typeof payload.message === "string"
        ? payload.message
        : `Permintaan gagal dengan status ${response.status}.`,
      response.status,
      payload.errors as Record<string, string[]> | undefined,
    );
  }

  return payload as T;
}
