import { expect, test } from '@playwright/test';

test.describe('translation - english', () => {
  test("should load the user's preferred language", async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Hi, I'm José Duque./);

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('translation - spanish', () => {
  test.use({
    locale: 'es-CO',
    timezoneId: 'America/Bogota',
  });

  test("should load the user's preferred language", async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Hola, soy José Duque./);

    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });
});
