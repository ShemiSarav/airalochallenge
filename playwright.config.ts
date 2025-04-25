import { defineConfig } from '@playwright/test'

const MAX_RETRY = 2 // Set to 1 to retry failed tests once.

export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? MAX_RETRY : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Maximum time one test can run for. */
  timeout: 5 * 60 * 1000, // 5 minutes
  // Set the default timeout for assertions
  expect: {
    timeout: 15000,
  },

  reportSlowTests: null,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['list'],
    ['github']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    bypassCSP: true,
    launchOptions: {
      args: ['--disable-web-security'],
    },

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 30000,

    headless: !!process.env.CI,

    /* To avoid HTTPS warning with Firefox security : we ignore HTTPS errors with Web Browser */
    ignoreHTTPSErrors: true,

    navigationTimeout: 30000,

    screenshot: { fullPage: true, mode: 'only-on-failure' },

    /* Retain the trace on each failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',

    video: { mode: 'retain-on-failure', size: { height: 1080, width: 1920 } },

    viewport: { height: 1080, width: 1920 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        video: { mode: 'on', size: { height: 1080, width: 1920 } },
        viewport: { height: 1080, width: 1920 },

      },
    },
  ],
})