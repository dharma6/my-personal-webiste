import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setDarkMode,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageStable(page);
    await disableAnimations(page);
  });

  test('full page - light mode', async ({ page }) => {
    await setLightMode(page);
    await expect(page).toHaveScreenshot('home-light.png', { fullPage: true });
  });

  test('full page - dark mode', async ({ page }) => {
    await setDarkMode(page);
    await expect(page).toHaveScreenshot('home-dark.png', { fullPage: true });
  });

  test('hero section - light mode', async ({ page }) => {
    await setLightMode(page);
    const header = page.locator('header').first();
    await expect(header).toHaveScreenshot('hero-light.png');
  });

  test('hero section - dark mode', async ({ page }) => {
    await setDarkMode(page);
    const header = page.locator('header').first();
    await expect(header).toHaveScreenshot('hero-dark.png');
  });

  test('about section - light mode', async ({ page }) => {
    await setLightMode(page);
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    await disableAnimations(page);
    await expect(about).toHaveScreenshot('about-light.png');
  });

  test('about section - dark mode', async ({ page }) => {
    await setDarkMode(page);
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    await disableAnimations(page);
    await expect(about).toHaveScreenshot('about-dark.png');
  });
});
