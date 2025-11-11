import { getBlogPostsByLocale } from '@/actions/blog';
import { getPathname, type Href, routing } from '@/i18n/routing';
import { getAllSlugVariants } from '@/lib';
import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';

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

function getEntry(href: Href) {
  return {
    lastModified: new Date(),
    priority: 1,
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const posts = await getBlogPostsByLocale(-1, routing.defaultLocale);

  for (const post of posts) {
    const slugVariants = getAllSlugVariants(post.metadata);

    entries.push({
      url: getUrl(`/blog/${slugVariants[routing.defaultLocale]}` as Href, routing.defaultLocale),
      lastModified: new Date(post.metadata.publishDate),
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            getUrl(`/blog/${slugVariants[locale]}` as Href, locale),
          ]),
        ),
      },
    });
  }

  return entries;
}

export function getUrl(href: Href, locale: Locale) {
  const host = process.env.SITE_URL || '';

  const pathname = getPathname({ locale, href: href.toString().replace(/\/$/, '') as Href });
  return host + pathname;
}
