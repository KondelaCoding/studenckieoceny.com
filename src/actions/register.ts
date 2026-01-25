'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcript from 'bcryptjs';
import { addUser, getUserByEmail, init } from '@/lib/db';

init();

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Nieoczekiwany błąd' };

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcript.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: 'User with this email already exists' };

  await addUser(email, hashedPassword, name);

  return { success: 'Konto zostało stworzone!' };
};
