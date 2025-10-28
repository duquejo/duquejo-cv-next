import { MetadataTypes } from '@/interfaces';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function createMetadata(namespace: MetadataTypes): Promise<Metadata> {
  const t = await getTranslations(namespace);
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: t.has('metadata.keywords') ? t.raw('metadata.keywords') : [],
  };
}
