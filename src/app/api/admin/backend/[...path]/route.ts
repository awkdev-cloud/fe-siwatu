import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { ADMIN_TOKEN_COOKIE } from "@/lib/admin/auth";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

function getApiBaseUrl(): string {
  const value = process.env.API_BASE_URL;

  if (!value) {
    throw new Error("API_BASE_URL belum dikonfigurasi.");
  }

  return value.replace(/\/+$/, "");
}

function isSafeSegment(value: string): boolean {
  return /^[a-zA-Z0-9._-]+$/.test(value);
}

async function forwardRequest(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Sesi admin tidak tersedia." },
      { status: 401 },
    );
  }

  const { path } = await context.params;

  if (!path.length || !path.every(isSafeSegment)) {
    return NextResponse.json(
      { message: "Path admin tidak valid." },
      { status: 400 },
    );
  }

  const target = new URL(
    `${getApiBaseUrl()}/admin/${path.join("/")}`,
  );
  target.search = request.nextUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");

  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  let body: BodyInit | undefined;

  if (request.method !== "GET" && request.method !== "HEAD") {
    if (contentType?.includes("multipart/form-data")) {
      body = await request.formData();
    } else {
      const buffer = await request.arrayBuffer();
      body = buffer.byteLength ? buffer : undefined;

      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
  }

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "follow",
    });

    const responseBody = await upstream.arrayBuffer();
    const response = new NextResponse(responseBody, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ??
          "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });

    if (upstream.status === 401) {
      response.cookies.delete(ADMIN_TOKEN_COOKIE);
    }

    return response;
  } catch {
    return NextResponse.json(
      { message: "Backend SIWATU tidak dapat dihubungi." },
      { status: 502 },
    );
  }
}

export const GET = forwardRequest;
export const POST = forwardRequest;
export const PATCH = forwardRequest;
export const PUT = forwardRequest;
export const DELETE = forwardRequest;
