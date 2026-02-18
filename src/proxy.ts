import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

// Next.js 16: middleware.ts → proxy.ts
// Node.js runtime (default from Next.js 15.5+) so Prisma is safe here if needed
const { auth } = NextAuth(authConfig);

export const proxy = auth;

export default auth;

export const config = {
  matcher: ['/admin/:path*'],
};
