import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
);

export default hasClerk
  ? clerkMiddleware(async (auth, req) => {
      const path = req.nextUrl.pathname;
      // Admin UI + admin API — not reachable by guessing the URL alone
      if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
        await auth.protect();
      }
    })
  : function proxy() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
