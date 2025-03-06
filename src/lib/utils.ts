import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function split(string: string) {
  if (!string) return [];
  return string.split(",").map((subject) => subject.trim());
}
