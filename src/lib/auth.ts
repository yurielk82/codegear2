import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        (session.user as any).role = (user as any).role;
      }
      return session;
    },
    async signIn({ user }) {
      const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
      if (adminEmails.length > 0 && !adminEmails.includes(user.email || "")) {
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
});
