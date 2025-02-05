import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test('should navigate to the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Curriculum Vitae | José Duque');

  await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
    'Colombian web developer. Explore my portfolio, expertise, and comprehensive services to elevate your digital presence.',
  );

  await expect(metatag(page, 'keywords').getAttribute('content')).resolves.toBe(
    'Web developer,Backend,Frontend,Full-Stack,Node JS,React,Vue,Javascript,Typescript',
  );

  const mainWrapper = page.getByRole('main');

  await expect(mainWrapper).toBeVisible();
  await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(
    /Hi!, I'm José Duque./,
  );
});
