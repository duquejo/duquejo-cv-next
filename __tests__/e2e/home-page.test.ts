import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test('should navigate to the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Resumeé | José Duque');

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'Web developer from Colombia',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Hi, I'm José Duque./);
});
