import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test('should navigate to the music production page', async ({ page, isMobile }) => {
  await page.goto('/hobbies/music-production');

  await expect(page).toHaveTitle('Music Production | José Duque');

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'A beloved hobby which balances everything',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Music showcase/);

  await expect(page.getByRole('complementary')).toBeVisible();
  if (isMobile) {
    await expect(page.getByRole('navigation')).toBeHidden();
  } else {
    await expect(page.getByRole('navigation')).toBeVisible();
  }
});
