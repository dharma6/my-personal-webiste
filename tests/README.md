# Visual Regression Tests

Visual regression tests using [Playwright](https://playwright.dev/) to catch unintended layout/style changes across pages, viewports, and themes.

## Quick Start

```bash
# Run all visual tests against saved baselines
npm run test:visual

# Update baselines after intentional visual changes
npm run test:visual:update

# Open HTML report with side-by-side diffs
npm run test:visual:report
```

## What's Tested

| Page | Tests | What's captured |
|------|-------|-----------------|
| Home (`/`) | Full page, hero section, about section | Profile, info cards, tools grid, CTA buttons |
| Book Summaries (`/book-summaries`) | Full page, card grid | Book summary cards layout |
| Investment Thesis (`/investment-thesis`) | Full page | Article list with tags and dates |
| Article Pages (`/investment-thesis/[slug]`) | 3 articles | 2025 holdings, investment thesis, 2024 holdings |
| Demos (`/demos`) | Full page | Video embed container (Vimeo replaced with placeholder) |
| Navbar | Default, scrolled, mobile menu | Glassmorphism effect, hamburger menu slide-in |
| Footer | Footer section | Logo, contact, social links |

Each test runs in **light mode** and **dark mode** across **3 viewports**:
- Desktop (1280x720)
- Tablet (768x1024)
- Mobile (393x851 - Pixel 5)

**Total: 76 screenshots, 5 skipped** (mobile menu skipped on desktop/tablet, book grid skipped on mobile).

## Workflow

### When adding a new feature
1. Make your changes
2. Run `npm run test:visual`
3. If tests fail, review the diffs in `npm run test:visual:report`
4. If the changes are intentional: `npm run test:visual:update`
5. Commit the updated screenshots in `tests/visual/__screenshots__/`

### Adding tests for a new page
Create a new spec file in `tests/visual/`:

```js
import { test, expect } from '@playwright/test';
import {
  disableAnimations,
  setDarkMode,
  setLightMode,
  waitForPageStable,
} from './fixtures/test-helpers.mjs';

test.describe('My New Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/my-new-page');
    await waitForPageStable(page);
    await disableAnimations(page);
  });

  test('full page - light mode', async ({ page }) => {
    await setLightMode(page);
    await expect(page).toHaveScreenshot('my-page-light.png', { fullPage: true });
  });

  test('full page - dark mode', async ({ page }) => {
    await setDarkMode(page);
    await expect(page).toHaveScreenshot('my-page-dark.png', { fullPage: true });
  });
});
```

Then run `npm run test:visual:update` to generate the baseline screenshots.

## Test Helpers

Shared utilities in `tests/visual/fixtures/test-helpers.mjs`:

| Helper | Purpose |
|--------|---------|
| `disableAnimations(page)` | Zeros out CSS animations/transitions, forces `fade-in-section` elements to visible |
| `setDarkMode(page)` | Sets `localStorage.theme`, toggles `dark` class, updates `color-scheme` |
| `setLightMode(page)` | Reverse of dark mode |
| `triggerNavbarScroll(page)` | Scrolls to trigger navbar glassmorphism (scrollY > 50) |
| `openMobileMenu(page)` | Clicks the hamburger menu button |
| `waitForPageStable(page)` | Waits for `networkidle` + image loading |

## Project Structure

```
tests/
  visual/
    __screenshots__/          # Baseline screenshots (committed to git)
    fixtures/
      test-helpers.mjs        # Shared test utilities
    home.spec.mjs
    book-summaries.spec.mjs
    investment-thesis.spec.mjs
    investment-thesis-article.spec.mjs
    demos.spec.mjs
    navbar.spec.mjs
    footer.spec.mjs
```

## Notes

- Tests run against a **production build** (`next build && next start`) for consistent rendering.
- The Vimeo iframe on `/demos` is intercepted and replaced with a static placeholder to avoid network flakiness.
- Screenshots are platform-specific (macOS vs Linux render text differently). If running CI on a different OS, regenerate baselines there.
