/**
 * Disables all animations for deterministic screenshots.
 * Handles CSS keyframes (fadeInUp), CSS transitions (.fade-in-section),
 * and forces all animated elements to their final visible state.
 */
export async function disableAnimations(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }
    `,
  });

  await page.evaluate(() => {
    document.querySelectorAll('.fade-in-section').forEach((el) => {
      el.classList.add('is-visible');
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Sets dark mode by matching the app's localStorage-based toggle pattern.
 */
export async function setDarkMode(page) {
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.body.classList.add('dark');
    document.documentElement.style.setProperty('color-scheme', 'dark');
  });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForTimeout(300);
}

/**
 * Sets light mode.
 */
export async function setLightMode(page) {
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark');
    document.documentElement.style.setProperty('color-scheme', 'light');
  });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.waitForTimeout(300);
}

/**
 * Scrolls to trigger the Navbar glassmorphism effect (appears at scrollY > 50).
 */
export async function triggerNavbarScroll(page) {
  await page.evaluate(() => window.scrollTo(0, 100));
  await page.waitForTimeout(200);
}

/**
 * Opens the mobile side menu.
 */
export async function openMobileMenu(page) {
  await page.click('button[aria-label="Open menu"]');
  await page.waitForTimeout(100);
}

/**
 * Waits for the page to be fully loaded and stable.
 */
export async function waitForPageStable(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
}
