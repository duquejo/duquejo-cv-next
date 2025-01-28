import { START_ADVENTURE_YEAR } from '@/lib';

export function calculateYears() {
  return String(new Date().getFullYear() - START_ADVENTURE_YEAR);
}
