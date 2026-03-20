import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { LoginSchema } from './schemas';
import { User } from '@/types/types';

/**
 * Full auth config with Prisma (Node.js runtime only).
 * This is NOT used by middleware - see auth.config.ts for Edge-compatible config.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          console.error('[auth][error] Invalid credentials: Validation failed');
          throw new AuthError('Nieoczekiwany błąd, spróbuj ponownie później');
        }
        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          console.error('[auth][error] Invalid credentials: Missing user or password');
          throw new AuthError('Brakujący użytkownik lub hasło');
        }

        if (user.password === null) {
          console.error('[auth][error] Invalid credentials: OAuth user');
          throw new AuthError(
            'Konto utworzone przez zewnętrznego dostawcę logowania, spróbuj zalogować się przez Google lub GitHub',
          );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          console.error('[auth][error] Invalid credentials: Password mismatch');
          throw new AuthError('Nieprawidłowe hasło');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        } as User;
      },
    }),
  ],
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
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
});
