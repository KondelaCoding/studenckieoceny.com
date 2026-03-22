import { getToken } from 'next-auth/jwt';
import type { User } from '../types/types';

export type RequestUser = {
  id: string;
  role: User['role'];
};

export async function getRequestUser(req: Request): Promise<RequestUser | null> {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.sub || !token?.role) return null;

  return {
    id: token.sub,
    role: token.role as User['role'],
  };
}
