import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Edge-compatible: uses authConfig (no Prisma) so Edge runtime can run it
export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  matcher: ["/admin/:path*"],
};
