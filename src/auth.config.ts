import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (!validatedFields.success) {
                    console.error(
                        "[auth][error] Invalid credentials: Validation failed",
                    );
                    throw new AuthError(
                        "Nieoczekiwany błąd, spróbuj ponownie później",
                    );
                }
                const { email, password } = validatedFields.data;

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/validate?email=${email}`,
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
                    throw new AuthError("Nie znaleziono użytkownika");
                }

                // Extract the user object from the response
                const { user } = await response.json();

                if (!user) {
                    console.error(
                        "[auth][error] Invalid credentials: Missing user or password",
                    );
                    throw new AuthError("Brakujący użytkownik lub hasło");
                }

                if (user.password === null) {
                    console.error(
                        "[auth][error] Invalid credentials: OAuth user",
                    );
                    throw new AuthError(
                        "Konto utworzone przez zewnętrznego dostawcę logowania, spróbuj zalogować się przez Google lub GitHub",
                    );
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password,
                );

                if (!isPasswordValid) {
                    console.error(
                        "[auth][error] Invalid credentials: Password mismatch",
                    );
                    throw new AuthError("Nieprawidłowe hasło");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
} as NextAuthConfig;
