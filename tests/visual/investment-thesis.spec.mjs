import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setDarkMode,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('Investment Thesis List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/investment-thesis');
    await waitForPageStable(page);
    await disableAnimations(page);
  });

  test('full page - light mode', async ({ page }) => {
    await setLightMode(page);
    await expect(page).toHaveScreenshot('thesis-list-light.png', {
      fullPage: true,
    });
  });

  test('full page - dark mode', async ({ page }) => {
    await setDarkMode(page);
    await expect(page).toHaveScreenshot('thesis-list-dark.png', {
      fullPage: true,
    });
  });
});
