import { getUrl } from '@/app/sitemap';
import { type Href, routing } from '@/i18n/routing';
import { BlogPost, MetadataTypes } from '@/interfaces';
import { getAllSlugVariants } from '@/lib/slugs';
import type { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function createMetadata(namespace: MetadataTypes): Promise<Metadata> {
  const t = await getTranslations(namespace);
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: t.has('metadata.keywords') ? t.raw('metadata.keywords') : [],
  };
}

export async function createBlogPostMetadata(post: BlogPost, locale: Locale): Promise<Metadata> {
  const languageUrls: Record<string, string> = {};

  const slugVariants = getAllSlugVariants(post);

  const currentSlug = slugVariants[locale];
  const canonicalUrl = getUrl(`/blog/${currentSlug}` as Href, locale);

  routing.locales.forEach((loc) => {
    languageUrls[loc] = getUrl(`/blog/${slugVariants[loc]}` as Href, loc);
  });

  return {
    title: `${post.title} | José Duque`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: 'José Duque', url: '/' }],

    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languageUrls,
        'x-default': getUrl(`/blog/${slugVariants.en}` as Href, 'en'),
      },
    },
  };
}
