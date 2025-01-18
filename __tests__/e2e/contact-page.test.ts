import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test('should navigate to the contact page', async ({ page, isMobile }) => {
  await page.goto('/contact');

  await expect(page).toHaveTitle('Contact | José Duque');

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'Get in touch with me for any inquiries or support. I am here to help you',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Contact/);

  await expect(page.getByRole('complementary')).toBeVisible();
  if (isMobile) {
    await expect(page.getByRole('navigation')).toBeHidden();
  } else {
    await expect(page.getByRole('navigation')).toBeVisible();
  }
});
