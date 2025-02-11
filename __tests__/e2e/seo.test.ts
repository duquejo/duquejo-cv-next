import { expect, test } from '@playwright/test';

test.describe('SEO tests', () => {
  test('Serves a robots.txt', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    const body = await response?.body();
    expect(body?.toString()).toContain('https://www.duquejo.com/sitemap.xml');
    expect(body?.toString()).toContain('User-Agent: *');
    expect(body?.toString()).toContain('Allow: /');
  });

  test('Serves a sitemap.xml', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const body = await response!.body();
    const headers = response!.headers();
    expect(body?.toString()).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(headers['content-type']).toContain('application/xml');
  });
});
