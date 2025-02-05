import robots from '@/app/robots';

describe('Robots tests', () => {
  it('should return the Robots established object', () => {
    const result = robots();

    expect(result).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '',
      },
      sitemap: 'https://www.duquejo.com/sitemap.xml',
    });
  });
});
