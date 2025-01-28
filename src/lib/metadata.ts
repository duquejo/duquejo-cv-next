import { MetadataTypes } from '@/interfaces';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(namespace: MetadataTypes): Promise<Metadata> {
  const t = await getTranslations(namespace);
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}
