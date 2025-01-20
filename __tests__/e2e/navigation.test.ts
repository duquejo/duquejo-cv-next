import { expect, type Locator, test } from '@playwright/test';
import { toggleSidebar } from './utils';

test.describe('navigation', () => {
  let sidebar: Locator;

  const links = [
    { title: 'Resumeé', url: '/' },
    { title: 'Services', url: '/career/services' },
    { title: 'Projects', url: '/career/projects' },
    { title: 'My blog', url: '/blog' },
    { title: 'Contact', url: '/contact' },
    { title: 'Music production', url: '/hobbies/music-production' },
    { title: 'Game development', url: '/hobbies/games-development' },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    sidebar = page.getByRole('navigation');
  });

  test('should navigate', async ({ page, isMobile }) => {
    for (const { title, url } of links) {
      let btn = sidebar.getByRole('link', { name: title });

      if (isMobile) {
        await expect(btn).toBeHidden();
        await toggleSidebar(page);
        btn = page.getByRole('link', { name: title });
      }

      await btn.scrollIntoViewIfNeeded();
      await expect(btn).toBeVisible();
      await btn.click({ force: true });
      await expect(page).toHaveURL(url);
    }
  });
});
