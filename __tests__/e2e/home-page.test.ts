import { expect, test } from '@playwright/test';
import { generateStandardTitle } from '@/lib/utils';
import { metatag } from './utils';

test('should navigate to the home page', async ({ page, isMobile }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(generateStandardTitle('Resumeé'));

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'Web developer from Colombia',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Hi, I'm José Duque./);

  await expect(page.getByRole('complementary')).toBeVisible();
  if (isMobile) {
    await expect(page.getByRole('navigation')).toBeHidden();
  } else {
    await expect(page.getByRole('navigation')).toBeVisible();
  }
});
