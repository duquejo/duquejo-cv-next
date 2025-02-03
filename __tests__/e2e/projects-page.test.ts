import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test('should navigate to the projects career page', async ({ page, isMobile }) => {
  await page.goto('/career/projects');

  await expect(page).toHaveTitle('Projects | José Duque');

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'Latest projects where I had been contributed',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Latest projects/);
});
