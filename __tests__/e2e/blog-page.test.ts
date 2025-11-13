import { expect, test } from '@playwright/test';
import { metatag, openGraph, twitterCard } from './utils';

test.describe('Blog page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should navigate to the blog post page', async ({ page }) => {
    await expect(page).toHaveTitle('Blog | José Duque');

    await expect(metatag(page, 'description').getAttribute('content')).resolves.toBe(
      'Discover the latest news, tips and interesting tech & lifestyle articles',
    );

    const mainWrapper = page.getByRole('main');
    await expect(mainWrapper).toBeVisible();

    await expect(mainWrapper.getByRole('heading', { level: 1 })).toHaveText('Blog');
    await expect(mainWrapper.getByRole('heading', { level: 2 })).toHaveText('Latest articles');

    await expect(mainWrapper.getByRole('paragraph')).toHaveText(
      /Explore my collection of articles on web development, software architecture, technology insights and other topics I'm passionate about./,
    );
  });

  test('should navigate to the first blog post entry and go back successfully', async ({
    page,
  }) => {
    const firstBlogPost = page.getByRole('contentinfo').first();

    await firstBlogPost.click();

    await expect(page).toHaveURL(/blog\//);

    const mainHeading = await page
      .getByRole('main')
      .getByRole('heading', { level: 1 })
      .textContent();

    expect(mainHeading).not.toBe('Blog');
    expect(page).toHaveTitle(new RegExp(`${mainHeading} | José Duque`));

    await expect(metatag(page, 'description').getAttribute('content')).resolves.toBeDefined();
    await expect(metatag(page, 'author').getAttribute('content')).resolves.toBeDefined();
    await expect(openGraph(page, 'image').getAttribute('content')).resolves.toBeDefined();
    await expect(twitterCard(page, 'image').getAttribute('content')).resolves.toBeDefined();

    await page.getByRole('link', { name: /Back to blog/i }).click();

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Blog');
  });

  test('should navigate to the last blog post entry and go back successfully', async ({ page }) => {
    const lastBlogPost = page.getByRole('contentinfo').last();

    await lastBlogPost.click();

    await expect(page).toHaveURL(/blog\//);

    const mainHeading = await page
      .getByRole('main')
      .getByRole('heading', { level: 1 })
      .textContent();

    expect(mainHeading).not.toBe('Blog');
    expect(page).toHaveTitle(new RegExp(`${mainHeading} | José Duque`));

    await page.getByRole('link', { name: /Back to blog/i }).click();

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Blog');
  });
});
