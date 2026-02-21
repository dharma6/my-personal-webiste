import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setLightMode,
  openMobileMenu,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('Core Layout Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageStable(page);
    await setLightMode(page);
    await disableAnimations(page);
  });

  test('navbar renders', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
    await expect(nav.locator('a, button').first()).toBeVisible();
  });

  test('footer renders', async ({ page }) => {
    const footer = page.locator('footer[aria-label="Site footer"]');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer.locator('a').first()).toBeVisible();
  });
});

test.describe('Mobile Menu Flow', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'Only run on mobile viewport');
    await page.goto('/');
    await waitForPageStable(page);
    await setLightMode(page);
    await disableAnimations(page);
  });

  test('can open mobile menu', async ({ page }) => {
    await openMobileMenu(page);
    const mobileMenu = page.locator('ul[aria-label="Mobile navigation menu"]');
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu.getByRole('menuitem').first()).toBeVisible();
  });
});
