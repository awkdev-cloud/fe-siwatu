import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_TOKEN_COOKIE,
} from "@/lib/admin/auth";

type LaravelLoginResponse = {
  message?: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  errors?: Record<string, string[]>;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          message: "Email dan password wajib diisi.",
        },
        {
          status: 422,
        },
      );
    }

    const apiBaseUrl = process.env.API_BASE_URL;

    if (!apiBaseUrl) {
      return NextResponse.json(
        {
          message: "API_BASE_URL belum dikonfigurasi.",
        },
        {
          status: 500,
        },
      );
    }

    const loginResponse = await fetch(
      `${apiBaseUrl.replace(/\/+$/, "")}/admin/login`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email.trim(),
          password: body.password,
        }),
      },
    );

    const payload =
      (await loginResponse.json()) as LaravelLoginResponse;

    if (!loginResponse.ok) {
      return NextResponse.json(payload, {
        status: loginResponse.status,
      });
    }

    if (!payload.token || !payload.user) {
      return NextResponse.json(
        {
          message:
            "Backend tidak mengembalikan token atau data admin.",
        },
        {
          status: 502,
        },
      );
    }

    if (payload.user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Akun tidak memiliki akses admin.",
        },
        {
          status: 403,
        },
      );
    }

    const response = NextResponse.json(
      {
        message: payload.message ?? "Login berhasil.",
        authenticated: true,
        user: payload.user,
      },
      {
        status: 200,
      },
    );

    response.cookies.set({
      name: ADMIN_TOKEN_COOKIE,
      value: payload.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        message: "Backend SIWATU tidak dapat dihubungi.",
      },
      {
        status: 502,
      },
    );
  }
}