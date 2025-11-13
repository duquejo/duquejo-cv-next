import proxy, { config } from '@/proxy';

describe('Middleware tests', () => {
  it('should export the middleware function', () => {
    expect(typeof proxy).toBe('function');
  });

  it('should have the correct config', () => {
    expect(config).toBeDefined();
    expect(config.matcher).toEqual([
      '/',
      '/(es|en)/:path*',
      '/api/v1/:path*',
      '/((?!api|_next|_vercel|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
    ]);
  });
});
