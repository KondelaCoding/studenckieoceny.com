import NextAuth from 'next-auth';
import authConfig from './auth.config';
import axios from 'axios';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = (token.role as 'admin' | 'user') || 'user';
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // Only check DB for OAuth logins (Google, etc.)
      if (account?.provider && token.email) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/validate`,
          {
            email: token.email,
          },
        );

        let user;
        if (response.status === 200) {
          ({ user } = response.data);
        } else {
          // User not found, create them in the DB
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
            email: token.email,
            password: null, // explicitly null for OAuth
            name: profile?.name || token.name,
          });
          user = response.data;
        }

        token.role = user?.role ?? 'user';
      }
      return token;
    },
  },
  ...authConfig,
});
