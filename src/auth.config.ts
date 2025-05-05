// import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";

export default {
    providers: [Credentials({
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);
            if (!validatedFields.success) {
                console.error(
                    "[auth][error] Invalid credentials: Validation failed",
                );
                throw new Error("Invalid credentials");
            }
            const { email, password } = validatedFields.data;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/validate?email=${email}`,
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
                throw new Error("Invalid credentials");
            }

            // Extract the user object from the response
            const { user } = await response.json();

            if (!user || !user.password) {
                console.error(
                    "[auth][error] Invalid credentials: Missing user or password",
                );
                throw new Error("Invalid credentials");
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password,
            );

            if (!isPasswordValid) {
                console.error(
                    "[auth][error] Invalid credentials: Password mismatch",
                );
                throw new Error("Invalid credentials");
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
        },
    })],
    session: { strategy: "jwt" },
} as NextAuthConfig;
