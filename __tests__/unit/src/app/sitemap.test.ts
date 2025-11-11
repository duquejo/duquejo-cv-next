import sitemap from '@/app/sitemap';

vi.mock('@/i18n/routing', () => ({
  routing: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  getPathname: ({ locale, href }: { locale: string; href: string }) => `/${locale}${href}`,
}));

vi.mock('@/actions/blog', () => ({
  getBlogPostsByLocale: async (limit: number, locale: string) => [
    {
      metadata: {
        slug: 'welcome-to-my-blog',
        slugEn: 'welcome-to-my-blog',
        slugEs: 'bienvenido-a-mi-nuevo-blog',
        publishDate: '2023-01-01T00:00:00.000Z',
      },
    },
  ],
}));

describe('Sitemap tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return an array of 3 sitemap entries with correct URLs and alternates', async () => {
    const staticPages = 4;
    const blogPosts = 1;

    const result = await sitemap();

    expect(result).toHaveLength(staticPages + blogPosts);

    result.forEach(({ alternates, lastModified, priority, url }) => {
      expect(lastModified).toBeInstanceOf(Date);
      expect(priority).toBeOneOf([1, 0.8]);

      expect(url).toBeTypeOf('string');

      expect(alternates?.languages).toHaveProperty('es');
      expect(alternates?.languages).toHaveProperty('en');
    });
  });
});
