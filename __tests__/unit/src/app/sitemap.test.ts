import sitemap from '@/app/sitemap';

describe('Sitemap tests', () => {
  vi.mock('@/i18n/routing', () => ({
    routing: {
      defaultLocale: 'en',
      locales: ['en', 'es'],
    },
    getPathname: ({ locale, href }: { locale: string; href: string }) => `/${locale}${href}`,
  }));

  it('should return an array of 3 sitemap entries with correct URLs and alternates', () => {
    const result = sitemap();

    expect(result).toHaveLength(3);

    result.forEach(({ alternates, lastModified, priority, url }) => {
      expect(lastModified).toBeInstanceOf(Date);
      expect(priority).toBe(1);

      expect(url).toBeTypeOf('string');

      expect(alternates?.languages).toHaveProperty('es');
      expect(alternates?.languages).toHaveProperty('en');
    });
  });
});
