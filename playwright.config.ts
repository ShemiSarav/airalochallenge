import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/ui',
  use: {
    headless: true,
    baseURL: 'https://www.airalo.com',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
