import manifest from '@/app/manifest';

vi.mock('next-intl/server', () => ({
  getTranslations: () => {
    const translations: Record<string, unknown> = {
      title: 'Website',
      description: 'Website description',
    };
    return (key: string) => translations[key];
  },
}));

describe('Manifest tests', () => {
  it('should return the Manifest established object', async () => {
    const result = await manifest();

    expect(result).toEqual({
      name: 'Website',
      description: 'Website description',
      start_url: '/',
      theme_color: '#0c0a09',
      display: 'standalone',
    });
  });
});
