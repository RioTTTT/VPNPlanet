import { defineConfig } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 1 : 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['allure-playwright'],
    ['line', { printSteps: true }],
    /* ['playwright-html', {
      testFolder: 'tests',
      title: 'Playwright HTML Report',
      project: 'UI-Test',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'playwright-html-report',
      minifyAssets: true,
      startServer: true,
    }] */
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 300000,
  expect: {
    timeout: 30000,
  },
  use: {
    baseURL: 'https://personal.freevpnplanet.com/',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    launchOptions: {
      slowMo: 100,
      headless: true,
      args: [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
      ]
    },
    permissions: ['clipboard-write', 'clipboard-read'],
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'ui',
      grep: /@uitests/,
      grepInvert: /@bug/,
      use: { browserName: null! as any },
      fullyParallel: false,
      workers: 1,
    },
  ],
});
