import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Niepoprawny adres e-mail'),
  password: z.string(),
});

export const RegisterSchema = z
  .object({
    email: z.string().email('Niepoprawny adres e-mail'),
    name: z
      .string()
      .min(5, 'Nazwa użytkownika musi mieć co najmniej 5 znaków')
      .max(20, 'Nazwa użytkownika może mieć maksymalnie 20 znaków'),
    password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
    confirmPassword: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła muszą być takie same',
  });

export const AddTeacherSchema = z.object({
  name: z.string().min(2, 'Podaj prawidłowe imię'),
  subjects: z.string().min(2, 'Podaj prawidłowe przedmioty'),
  primaryUniversity: z.object({
    id: z.string(),
    name: z.string(),
  }),
  secondaryUniversity: z.object({
    id: z.string(),
    name: z.string(),
  }),
});
