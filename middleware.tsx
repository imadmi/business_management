import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "./lib/env.server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log('user ',user)

  if (
    (user && req.nextUrl.pathname === "/") ||
    (user && req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // // if user is not signed in and the current path is not / redirect the user to /
  // if (!user && req.nextUrl.pathname !== "/") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  await supabase.auth.getSession();

  return res;
}
