import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setDarkMode,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('Book Summaries Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/book-summaries');
    await waitForPageStable(page);
    await disableAnimations(page);
  });

  test('full page - light mode', async ({ page }) => {
    await setLightMode(page);
    await expect(page).toHaveScreenshot('books-light.png', { fullPage: true });
  });

  test('full page - dark mode', async ({ page }) => {
    await setDarkMode(page);
    await expect(page).toHaveScreenshot('books-dark.png', { fullPage: true });
  });

  test('book cards grid', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'Grid layout differs too much on mobile');
    await setLightMode(page);
    const grid = page.locator('div[aria-label="Book summary cards"]');
    await grid.scrollIntoViewIfNeeded();
    await disableAnimations(page);
    await expect(grid).toHaveScreenshot('book-cards-grid.png');
  });
});
