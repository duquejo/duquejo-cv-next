import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test('should navigate to the services career page', async ({ page }) => {
  await page.goto('/career/services');

  await expect(page).toHaveTitle('Services | José Duque');

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'Backend, Frontend, Full-stack or consulting services at glance',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Services/);
});
