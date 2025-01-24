import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { START_ADVENTURE_YEAR } from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateYears() {
  return String(new Date().getFullYear() - START_ADVENTURE_YEAR);
}
