import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-compatible auth config (no Prisma, no bcrypt).
 * Used by middleware which runs in Edge runtime with 1MB size limit.
 * Actual credential validation happens in auth.ts which runs in Node.js runtime.
 */
export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // Credentials provider placeholder for Edge runtime
    // Actual validation is in auth.ts
    Credentials({
      async authorize() {
        // This won't be called in middleware - actual auth happens in auth.ts
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
