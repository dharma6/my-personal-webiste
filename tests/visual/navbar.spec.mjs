import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setDarkMode,
  setLightMode,
  triggerNavbarScroll,
  openMobileMenu,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageStable(page);
    await disableAnimations(page);
  });

  test('default state - light mode', async ({ page }) => {
    await setLightMode(page);
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toHaveScreenshot('navbar-default-light.png');
  });

  test('default state - dark mode', async ({ page }) => {
    await setDarkMode(page);
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toHaveScreenshot('navbar-default-dark.png');
  });

  test('glassmorphism on scroll - light mode', async ({ page }) => {
    await setLightMode(page);
    await triggerNavbarScroll(page);
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toHaveScreenshot('navbar-scrolled-light.png');
  });

  test('glassmorphism on scroll - dark mode', async ({ page }) => {
    await setDarkMode(page);
    await triggerNavbarScroll(page);
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toHaveScreenshot('navbar-scrolled-dark.png');
  });
});

test.describe('Navbar Mobile Menu', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'Only run on mobile viewport');
    await page.goto('/');
    await waitForPageStable(page);
    await disableAnimations(page);
  });

  test('mobile menu open - light mode', async ({ page }) => {
    await setLightMode(page);
    await openMobileMenu(page);
    await expect(page).toHaveScreenshot('mobile-menu-open-light.png');
  });

  test('mobile menu open - dark mode', async ({ page }) => {
    await setDarkMode(page);
    await openMobileMenu(page);
    await expect(page).toHaveScreenshot('mobile-menu-open-dark.png');
  });
});
