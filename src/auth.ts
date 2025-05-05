import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/validate?email=${token.email}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.ok) {
                console.error(
                    "[auth][error] Invalid credentials: User not found",
                );
            }

            const { user } = await response.json();
            token.role = user.role;
            return token;
        },
    },
    ...authConfig,
});
