import { expect, test } from '@playwright/test';
import { toggleSidebar } from './utils';

test.describe('activity dialog sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the events', async ({ page, isMobile }) => {
    const dialogName = /Latest Activity Feed Updates/;

    if (isMobile) {
      await toggleSidebar(page);
      await expect(page.getByRole('button', { name: /Open latest activity/ })).toBeHidden();
      return;
    }

    await page.getByRole('button', { name: /Open latest activity/ }).click();

    await page.locator('[role="dialog"]').waitFor();

    const dialog = page.getByRole('dialog', { name: dialogName });

    // Parent elements
    await expect(dialog.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(dialog.getByRole('paragraph')).toBeVisible();
    await expect(dialog.getByRole('link')).toBeVisible();

    await dialog.getByRole('listitem').first().or(dialog.getByTestId('empty')).isVisible();

    await dialog.getByRole('button', { name: /Close/ }).click();

    await expect(dialog).toBeHidden();
  });
});
