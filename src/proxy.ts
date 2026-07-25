import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY,
);

export default hasClerk
  ? clerkMiddleware(async (auth, req) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
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
