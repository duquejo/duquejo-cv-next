import { expect, test } from '@playwright/test';
import { toggleSidebar } from './utils';

test.describe('pdf download dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.skip('should perform a pdf file download', async ({ page, isMobile }) => {
    if (isMobile) {
      await toggleSidebar(page);
    }

    // Click the download button
    const downloadButton = page.getByRole('button', { name: /Download CV/ });
    await downloadButton.click();

    // Wait for the heading inside the popover to appear
    const formTitle = page.getByRole('heading', { name: /Download Curriculum Vitae/ });
    await formTitle.waitFor({ state: 'visible', timeout: 10000 });

    // Get the form and wait for download
    const form = page.getByRole('form');
    const downloadPromise = page.waitForEvent('download');

    // Click the submit button
    await form.getByRole('button').click();

    // Wait for and verify the download
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/cv_jose_duque/);
  });
});
