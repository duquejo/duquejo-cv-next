import { expect, test } from '@playwright/test';

test.describe('activity dialog sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the events', async ({ page }) => {
    const dialogName = /Latest Activity Feed Updates/;

    await page.getByRole('button', { name: /Open latest activity/ }).click();

    await page.locator('[role="dialog"]').waitFor();

    const dialog = page.getByRole('dialog', { name: dialogName });

    // Parent elements
    await expect(dialog.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(dialog.getByRole('paragraph')).toBeVisible();
    await expect(dialog.getByRole('link')).toBeVisible();

    // Inner items
    await expect(dialog.getByRole('list')).toBeVisible();
    expect(await dialog.getByRole('listitem').count()).toBeGreaterThan(0);

    await dialog.getByRole('button', { name: /Close/ }).click();

    await expect(dialog).toBeHidden();
  });
});
