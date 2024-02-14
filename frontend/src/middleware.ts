import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  console.log(token);

  const systemURL = new URL("/authenticated", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/authenticated/:path*"],
};
