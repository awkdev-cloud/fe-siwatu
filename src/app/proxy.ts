import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  ADMIN_TOKEN_COOKIE,
} from "@/lib/admin/auth";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get(
    ADMIN_TOKEN_COOKIE,
  )?.value;

  const isLoginPage =
    pathname === "/admin/login";

  const isAdminRoot =
    pathname === "/admin";

  const isProtectedAdminPage =
    pathname.startsWith("/admin/") &&
    !isLoginPage;

  if (!token && isProtectedAdminPage) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url),
    );
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url),
    );
  }

  if (isAdminRoot) {
    return NextResponse.redirect(
      new URL(
        token
          ? "/admin/dashboard"
          : "/admin/login",
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
  ],
};