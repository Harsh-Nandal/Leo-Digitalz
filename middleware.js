import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("adminToken");

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Allow login page
  if (isLoginPage) return NextResponse.next();

  // Protect admin routes
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};