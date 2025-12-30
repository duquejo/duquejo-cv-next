import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getBlogPostBySlug } from '@/actions/blog';
import { getUrl } from '@/app/sitemap';
import { type Href, routing } from '@/i18n/routing';
import type { BlogPost, MetadataTypes } from '@/interfaces';
import { getAllSlugVariants } from '@/lib/slugs';

export async function createMetadata(namespace: MetadataTypes): Promise<Metadata> {
  const t = await getTranslations(namespace);
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: t.has('metadata.keywords') ? t.raw('metadata.keywords') : [],
  };
}

export async function createBlogPostMetadata(slug: string, lang: string): Promise<Metadata> {
  const result = await getBlogPostBySlug(slug, lang);

  if (!result) {
    const t = await getTranslations('Blog');
    return {
      title: t('metadata.title'),
      description: t('metadata.not_found_description'),
    };
  }

  return generateBlogPostVariants(result.metadata, lang);
}

export async function createBlogImageMetadata(
  slug: string,
  lang: string,
): Promise<{ title: string; subtitle: string }> {
  const result = await getBlogPostBySlug(slug, lang);

  const imageMetadata = {
    subtitle: 'Blog | José Duque',
    title: 'Blog entry',
  };

  if (result) {
    imageMetadata.title = result.metadata.title;
  }

  return imageMetadata;
}

function generateBlogPostVariants(post: BlogPost, locale: Locale): Metadata {
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
