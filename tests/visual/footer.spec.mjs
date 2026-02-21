import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setDarkMode,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageStable(page);
    await disableAnimations(page);
  });

  test('footer - light mode', async ({ page }) => {
    await setLightMode(page);
    const footer = page.locator('footer[aria-label="Site footer"]');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveScreenshot('footer-light.png');
  });

  test('footer - dark mode', async ({ page }) => {
    await setDarkMode(page);
    const footer = page.locator('footer[aria-label="Site footer"]');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveScreenshot('footer-dark.png');
  });
});
