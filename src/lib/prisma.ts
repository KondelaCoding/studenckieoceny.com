import { PrismaClient } from '@/generated/prisma';

// Re-use the Prisma client across hot reloads in development.
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
