# UI Smoke Tests

Lightweight Playwright tests for major pages/components on desktop and mobile.

## Quick Start

```bash
npm run test:visual
```

## What Is Tested

- Render smoke checks for `/`, `/book-summaries`, `/demos`, `/investment-thesis`
- Core components are present (navbar and footer)
- Critical flow: open an investment-thesis article from list page
- Mobile flow: open mobile navigation menu

These tests intentionally avoid pixel/snapshot comparisons, so adding new pages or changing content in existing sections should not cause failures unless a core UI flow breaks.

## Coverage

- Desktop (`desktop-chromium`)
- Mobile (`mobile-chromium`)

## Notes

- Runs against production build (`npm run build && npm run start`).
- Vimeo iframe on `/demos` is mocked to a static placeholder for deterministic behavior.
