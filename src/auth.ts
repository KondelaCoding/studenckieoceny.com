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
        async jwt({ token, account, profile }) {
            // Only check DB for OAuth logins (Google, etc.)
            if (account?.provider && token.email) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/validate?email=${token.email}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    },
                );

                let user;
                if (response.ok) {
                    ({ user } = await response.json());
                } else {
                    // User not found, create them in the DB
                    const createRes = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: token.email,
                                password: null, // explicitly null for OAuth
                                name: profile?.name || token.name,
                            }),
                        },
                    );
                    user = await createRes.json();
                }

                token.role = user?.role ?? "user";
            }
            return token;
        },
    },
    ...authConfig,
});
