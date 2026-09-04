import { expect, test } from '@playwright/test';
import { metatag } from './utils';

test.describe('Projects page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/career/projects');
  });

  test('should navigate to the projects career page', async ({ page }) => {
    await expect(page).toHaveTitle('Projects | José Duque');

    await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
      'Latest projects where I had been contributed',
    );

    const mainWrapper = page.getByRole('main');

    await expect(mainWrapper).toBeVisible();
    await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Projects showcase/);
  });

  test('should be able the project skill filters feature', async ({ page, isMobile }) => {
    const button = page.getByRole('button', { name: 'Skills' });
    const resetButton = page.getByRole('button', { name: 'Reset filters' });

    await expect(button).toBeVisible();
    await expect(resetButton).toBeVisible();

    await button.click();

    await page.getByLabel('Suggestions').getByText('Auth0').click();
    await page.getByRole('listbox', { name: 'Suggestions' }).press('Escape');

    await expect(page.getByRole('heading', { name: /SM Digital/, level: 2 })).toBeVisible();

    if (!isMobile) {
      await expect(page.getByTestId('icon-auth0')).toBeVisible();
    } else {
      await expect(page.getByText('+1 filters')).toBeVisible();
    }
  });

  test('should show the +# filters support text when the selected filters are over these counter', async ({
    page,
    isMobile,
  }) => {
    await page.getByRole('button', { name: 'Skills' }).click();
    page.getByRole('button', { name: 'Reset filters' });

    // +5 elements
    await page.getByLabel('Suggestions').getByText('Auth0').click();
    await page.getByLabel('Suggestions').getByText('AWS', { exact: true }).click();
    await page.getByLabel('Suggestions').getByText('Bootstrap').click();
    await page.getByLabel('Suggestions').getByText('CosmoDB').click();
    await page.getByLabel('Suggestions').getByText('CSS').click();
    await page.getByLabel('Suggestions').getByText('AWS Cognito', { exact: true }).click();

    if (!isMobile) {
      await expect(page.getByText('+5 filters')).toBeVisible();
    } else {
      await expect(page.getByText('+1 filters')).toBeVisible();
    }
  });

  test('should filter automatically if the URL has the searchParams applied', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/career/projects?query=auth0');

    const button = page.getByRole('button', { name: 'Skills' });

    await expect(page.getByRole('heading', { level: 2, name: /SM Digital/ })).toBeVisible();

    if (!isMobile) {
      await expect(button.getByTestId('icon-auth0')).toBeVisible();
    } else {
      await expect(button.getByText('+1 filters')).toBeVisible();
    }
  });
});
