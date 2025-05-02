import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Niepoprawny adres e-mail"),
    password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
});

export const RegisterSchema = z
    .object({
        email: z.string().email("Niepoprawny adres e-mail"),
        password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
        confirmPassword: z.string().min(
            6,
            "Hasło musi mieć co najmniej 6 znaków",
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Hasła muszą być takie same",
    });
