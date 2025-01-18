import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test('should navigate to the blog page', async ({ page, isMobile }) => {
  await page.goto('/blog');

  await expect(page).toHaveTitle('Blog | José Duque');

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'Discover the latest news, tips and interesting tech & lifestyle articles',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Blog/);

  await expect(page.getByRole('complementary')).toBeVisible();
  if (isMobile) {
    await expect(page.getByRole('navigation')).toBeHidden();
  } else {
    await expect(page.getByRole('navigation')).toBeVisible();
  }
});
