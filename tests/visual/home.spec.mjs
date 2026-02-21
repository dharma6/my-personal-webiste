import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

const renderRoutes = [
  { path: '/', name: 'home' },
  { path: '/book-summaries', name: 'book-summaries' },
  { path: '/demos', name: 'demos' },
  { path: '/investment-thesis', name: 'investment-thesis-list' },
];

test.describe('Page Render Smoke', () => {
  for (const { path, name } of renderRoutes) {
    test(`${name} renders correctly`, async ({ page }) => {
      if (path === '/demos') {
        await page.route('**/player.vimeo.com/**', (route) => {
          route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: '<div style="background:#1a1a2e;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-family:sans-serif;">Video Placeholder</div>',
          });
        });
      }

      await page.goto(path);
      await waitForPageStable(page);
      await setLightMode(page);
      await disableAnimations(page);
      await expect(page).toHaveURL(path);
      await expect(page.locator('main').first()).toBeVisible();
      await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();

      if (path === '/') {
        await expect(page.locator('footer[aria-label="Site footer"]')).toBeVisible();
      }
    });
  }
});
