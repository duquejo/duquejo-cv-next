import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test('should navigate to the games development page', async ({ page, isMobile }) => {
  await page.goto('/hobbies/games-development');

  await expect(page).toHaveTitle('Games development | José Duque');

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'Some of them are part of the practice that greatly enriches my career',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Games showcase/);

  await expect(page.getByRole('complementary')).toBeVisible();
  if (isMobile) {
    await expect(page.getByRole('navigation')).toBeHidden();
  } else {
    await expect(page.getByRole('navigation')).toBeVisible();
  }
});
