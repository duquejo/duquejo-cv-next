import type { MetadataRoute } from 'next';
import { getPathname, routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  return [getEntry('/'), getEntry('/career/projects'), getEntry('/career/services')];
}

type Href = Parameters<typeof getPathname>[0]['href'];

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

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const host = process.env.SITE_URL || '';

  const pathname = getPathname({ locale, href: href.toString().replace(/\/$/, '') as Href });
  return host + pathname;
}
