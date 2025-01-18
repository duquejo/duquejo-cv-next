import { expect, type Locator, test } from '@playwright/test';

test.describe('theme', () => {
  let html: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    html = page.locator('html');
  });

  test('should have the system defined theme by default', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(html).toHaveClass('dark');
  });

  test('should toggle the theme from system to dark', async ({ page }) => {
    await page.getByRole('button', { name: 'Change color theme' }).click();

    await page.getByRole('menu').waitFor();

    await page.getByRole('menuitem', { name: 'Dark' }).click();

    await expect(html).toHaveClass('dark');
  });

  test('should toggle the theme from system to light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });

    await page.getByRole('button', { name: 'Change color theme' }).click();

    await page.getByRole('menu').waitFor();
    await page.getByRole('menuitem', { name: 'Light' }).click();

    await expect(html).toHaveClass('light');
  });
});
