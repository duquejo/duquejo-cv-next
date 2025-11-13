import { getBlogPostsByLocale } from '@/actions/blog';
import { getPathname, type Href, routing } from '@/i18n/routing';
import { getAllSlugVariants } from '@/lib';
import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';

/**
 * Retrieves the full URL for a given href and locale
 * @param href
 * @param locale
 * @returns
 */
export function getUrl(href: Href, locale: Locale): string {
  const host = process.env.SITE_URL || '';
  const pathname = getPathname({ locale, href: href.toString().replace(/\/$/, '') as Href });
  return host + pathname;
}

/**
 * Get a sitemap entry for a given href
 * @param href
 * @returns
 */
function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

/**
 * Get a sitemap entry for a blog post
 * @param variants
 * @param lastModified
 * @returns
 */
function getBlogEntry(variants: Record<Locale, string>, lastModified: Date) {
  return {
    url: getUrl(`/blog/${variants[routing.defaultLocale]}` as Href, routing.defaultLocale),
    lastModified,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          getUrl(`/blog/${variants[locale]}` as Href, locale),
        ]),
      ),
    },
  };
}

async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const posts = await getBlogPostsByLocale(-1, routing.defaultLocale);

  for (const post of posts) {
    const variants = getAllSlugVariants(post.metadata);
    entries.push(getBlogEntry(variants, new Date(post.metadata.publishDate)));
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    getEntry('/'),
    getEntry('/blog'),
    getEntry('/career/projects'),
    getEntry('/career/services'),
  ];

  const blogEntries = await getBlogSitemapEntries();

  return [...staticPages, ...blogEntries];
}
