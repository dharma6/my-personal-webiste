import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setDarkMode,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('Demos Page', () => {
  test.beforeEach(async ({ page }) => {
    // Replace Vimeo iframe with a static placeholder for deterministic screenshots
    await page.route('**/player.vimeo.com/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<div style="background:#1a1a2e;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-family:sans-serif;">Video Placeholder</div>',
      });
    });

    await page.goto('/demos');
    await waitForPageStable(page);
    await disableAnimations(page);
  });

  test('full page - light mode', async ({ page }) => {
    await setLightMode(page);
    await expect(page).toHaveScreenshot('demos-light.png', { fullPage: true });
  });

  test('full page - dark mode', async ({ page }) => {
    await setDarkMode(page);
    await expect(page).toHaveScreenshot('demos-dark.png', { fullPage: true });
  });
});
