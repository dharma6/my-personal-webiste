import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',

  webServer: {
    command: 'npm run build && npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Pixel 5'],
      },
    },
  ],

  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { open: 'never' }], ['list']],
});
