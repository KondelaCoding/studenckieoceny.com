'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcript from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Nieoczekiwany błąd' };

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcript.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: 'User with this email already exists' };

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  return { success: 'Konto zostało stworzone!' };
};
