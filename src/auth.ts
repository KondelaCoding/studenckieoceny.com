import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { prisma } from '@/lib/prisma';
import { User } from '@/types/types';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = (token.role as User['role']) || 'user';
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // Only check DB for OAuth logins (Google, etc.)
      if (account?.provider && token.email) {
        let user;

        user = await prisma.user.findUnique({ where: { email: token.email } });

        if (!user) {
          // User not found, create them in the DB
          user = await prisma.user.create({
            data: {
              email: token.email,
              password: null, // explicitly null for OAuth
              name: profile?.name || token.name || 'Unknown User', // unknown user should not ever be created
            },
          });

          if (!user) {
            console.error('[auth][error] Failed to create user in DB for OAuth login');
            throw new Error('Failed to create user account');
          }
        }

        token.role = (user?.role as User['role']) ?? 'user';
      }
      return token;
    },
  },
  ...authConfig,
});
