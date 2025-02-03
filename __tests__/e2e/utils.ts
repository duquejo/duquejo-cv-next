import type { Page } from '@playwright/test';

export function metatag(page: Page, name: string) {
  return page.locator(`head > meta[name="${name}"]`);
}

export function openGraph(page: Page, name: string) {
  return page.locator(`head > meta[property="og:${name}"]`);
}

export function twitterCard(page: Page, name: string) {
  return page.locator(`head > meta[name="twitter:${name}"]`);
}

export async function toggleSidebar(page: Page) {
  await page.getByRole('button', { name: /^Toggle sidebar$/ }).click();
  await page.locator('[data-sidebar="sidebar"]').waitFor();
}
