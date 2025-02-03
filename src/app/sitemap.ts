import type { MetadataRoute } from 'next';
import { getPathname, routing } from '@/i18n/routing';

const host = 'https://duquejo.com.co';

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
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
