import { expect, test } from '@playwright/test';
import { toggleSidebar } from './utils';

test.describe('pdf download dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform a pdf file download', async ({ page, isMobile }) => {
    const dialogName = /Download Curriculum Vitae/;

    if (isMobile) {
      await toggleSidebar(page);
    }

    await page.getByRole('button', { name: /Download CV/ }).click();

    await page.getByRole('dialog', { name: dialogName }).waitFor();

    const dialog = page.getByRole('dialog', { name: dialogName });

    await expect(dialog.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(dialog.getByRole('paragraph')).toBeVisible();

    const form = dialog.getByRole('form', { name: dialogName });

    const downloadPromise = page.waitForEvent('download');

    await form.getByRole('button').click();

    const download = await downloadPromise;
    await download.saveAs('/temporal/' + download.suggestedFilename());

    expect(download.suggestedFilename()).toMatch(/cv_jose_duque/);
  });
});
