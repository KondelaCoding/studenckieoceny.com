"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Wystąpił nieoczekiwany błąd, spróbuj ponownie" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    return { error: "Nieprawidłowy adres e-mail lub hasło" };
                }
                case "OAuthCallback": {
                    return { error: "Nieoczekiwany błąd, spróbuj ponownie" };
                }
                default: {
                    return { error: "Nieoczekiwany błąd, spróbuj ponownie" };
                }
            }
        }

        throw error;
    }
};
