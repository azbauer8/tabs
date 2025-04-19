import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
