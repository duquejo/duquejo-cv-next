import { expect, test } from '@playwright/test';
import { toggleSidebar } from './utils';

test.describe('navigation', () => {
  const links = [
    { title: 'Resumeé', url: '/' },
    { title: 'Projects', url: '/career/projects' },
    { title: 'Blog', url: '/blog' },
    { title: 'Contact', url: '/contact' },
    { title: 'Music production', url: '/hobbies/music-production' },
    { title: 'Game development', url: '/hobbies/games-development' },
    { title: 'Services', url: '/career/services' },
  ];

  test('should navigate', async ({ page, isMobile }) => {
    for (const { title, url } of links) {
      await page.goto('/');

      if (isMobile) {
        await expect(page.getByRole('link', { name: title })).toBeHidden();
        await toggleSidebar(page);
      }

      await page.getByRole('link', { name: title }).click();

      await expect(page).toHaveURL(url);
    }
  });
});
