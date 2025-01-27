import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { START_ADVENTURE_YEAR } from '@/lib/constants';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MetadataTypes } from '@/interfaces';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateYears() {
  return String(new Date().getFullYear() - START_ADVENTURE_YEAR);
}

export async function generateMetadata(namespace: MetadataTypes): Promise<Metadata> {
  const t = await getTranslations(namespace);
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}
