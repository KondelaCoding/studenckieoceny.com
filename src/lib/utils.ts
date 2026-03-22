import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Session } from 'next-auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function split(string: string) {
  if (!string) return [];
  return string.split(',').map((subject) => subject.trim());
}

export const getRoleName = (session: Session | null) => {
  return session?.user?.role;
};
