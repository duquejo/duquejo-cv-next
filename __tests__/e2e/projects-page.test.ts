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
    await expect(mainWrapper.getByRole('heading', { level: 1 })).toContainText(/Latest projects/);
  });

  test('should be able the project skill filters feature', async ({ page, isMobile }) => {
    const dialogName = /filters/;
    const resetFilterName = /Reset filters/;

    const button = page.getByRole('button', { name: 'Skills' });

    await expect(button).toBeVisible();
    await expect(page.getByRole('button', { name: resetFilterName })).toBeVisible();

    await button.click();

    await page.getByRole('dialog', { name: dialogName }).waitFor();

    // Inner actions
    const dialog = page.getByRole('dialog', { name: dialogName });
    const awsButton = dialog.getByRole('option', { name: 'Auth0', exact: true });

    await expect(awsButton).toBeVisible();

    await awsButton.click();

    await expect(page.getByRole('heading', { level: 2, name: /SM Digital/ })).toBeVisible();

    const innerCloseButton = dialog.getByRole('option', { name: resetFilterName });
    await innerCloseButton.scrollIntoViewIfNeeded();

    await expect(dialog.getByRole('option', { name: resetFilterName })).toBeVisible();

    if (!isMobile) {
      await expect(button.getByTestId('icon-auth0')).toBeVisible();
    } else {
      await expect(button.getByText('+1 filters')).toBeVisible();
    }
  });

  test('should show the +# filters support text when the selected filters are over these counter', async ({
    page,
    isMobile,
  }) => {
    const dialogName = /filters/;

    const button = page.getByRole('button', { name: 'Skills' });
    await button.click();

    await page.getByRole('dialog', { name: dialogName }).waitFor();

    // Inner actions
    const dialog = page.getByRole('dialog', { name: dialogName });
    // +5 elements
    await dialog.getByRole('option', { name: 'Auth0' }).click();
    await dialog.getByRole('option', { name: 'AWS', exact: true }).click();
    await dialog.getByRole('option', { name: 'Bootstrap' }).click();
    await dialog.getByRole('option', { name: 'CosmoDB' }).click();
    await dialog.getByRole('option', { name: 'CSS' }).click();
    await dialog.getByRole('option', { name: 'AWS Cognito', exact: true }).click();

    if (!isMobile) {
      await expect(button.getByText('+5 filters')).toBeVisible();
    } else {
      await expect(button.getByText('+1 filters')).toBeVisible();
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
