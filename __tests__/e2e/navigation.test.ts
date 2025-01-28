import { expect, test } from '@playwright/test';
import { toggleSidebar } from './utils';

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to resumeé', async ({ page, isMobile }) => {
    if (isMobile) {
      await expect(page.getByRole('link', { name: /Resumeé/ })).toBeHidden();
      await toggleSidebar(page);
    }

    await page.getByRole('link', { name: /Resumeé/ }).click();

    await page.waitForURL('/');

    await expect(page).toHaveURL('/');
  });

  test('should navigate to projects', async ({ page, isMobile }) => {
    if (isMobile) {
      await expect(page.getByRole('link', { name: /Projects/ })).toBeHidden();
      await toggleSidebar(page);
    }

    await page.getByRole('link', { name: /Projects/ }).click();

    await page.waitForURL('/career/projects');

    await expect(page).toHaveURL('/career/projects');
  });

  test('should navigate to services', async ({ page, isMobile }) => {
    if (isMobile) {
      await expect(page.getByRole('link', { name: /Services/ })).toBeHidden();
      await toggleSidebar(page);
    }

    await page.getByRole('link', { name: /Services/ }).click();

    await page.waitForURL('/career/services');

    await expect(page).toHaveURL('/career/services');
  });
});
