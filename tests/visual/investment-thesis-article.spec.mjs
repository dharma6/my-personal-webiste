import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setDarkMode,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

const articleSlugs = [
  { slug: 'my-2025-holdings', name: '2025 Holdings' },
  { slug: 'investment-thesis', name: 'Investment Thesis' },
  { slug: 'my-2024-holdings', name: '2024 Holdings' },
];

for (const { slug, name } of articleSlugs) {
  test.describe(`Article: ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/investment-thesis/${slug}`);
      await waitForPageStable(page);
      await disableAnimations(page);
    });

    test(`${slug} - light mode`, async ({ page }) => {
      await setLightMode(page);
      await expect(page).toHaveScreenshot(`${slug}-light.png`, {
        fullPage: true,
      });
    });

    test(`${slug} - dark mode`, async ({ page }) => {
      await setDarkMode(page);
      await expect(page).toHaveScreenshot(`${slug}-dark.png`, {
        fullPage: true,
      });
    });
  });
}
