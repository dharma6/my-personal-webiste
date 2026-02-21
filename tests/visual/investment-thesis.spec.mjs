import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('Investment Thesis Critical Flow', () => {
  test('open article from list renders correctly', async ({ page }) => {
    await page.goto('/investment-thesis');
    await waitForPageStable(page);
    await setLightMode(page);
    await disableAnimations(page);

    const firstArticleLink = page
      .locator('main a[href^="/investment-thesis/"]')
      .first();
    await expect(firstArticleLink).toBeVisible();

    await firstArticleLink.click();
    await waitForPageStable(page);
    await disableAnimations(page);
    await expect(page).toHaveURL(/\/investment-thesis\/[^/]+$/);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading').first()).toBeVisible();
  });
});
