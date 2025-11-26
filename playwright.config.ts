import { defineConfig, devices } from '@playwright/test';

const browserTestsIgnorePath = /tests\/unit\/.*/;

export default defineConfig({
  testDir: './tests',
  outputDir: './tests/output/',
  fullyParallel: true,
  timeout: 30 * 1000,

  // make tests more robust in CI:
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'tests/reports/xml/results.xml' }],
    ['html', { outputFolder: 'tests/reports/html' }],
  ],
  use: {
    baseURL: 'http://localhost:6006',
  },
  expect: {
    toHaveScreenshot: {
      threshold: 0.05,
    },
  },
  projects: [
    // Utility tests that run once without a browser
    {
      name: 'unit',
      testMatch: /tests\/unit\/.*\.spec\.ts/,
    },
    {
      name: 'chromium',
      testIgnore: browserTestsIgnorePath,
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      testIgnore: browserTestsIgnorePath,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: browserTestsIgnorePath,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      testIgnore: browserTestsIgnorePath,
      use: { ...devices['Pixel 7'] },
    },
  ],

  webServer: {
    // assumes npm run build has been run
    command: 'npm run serve:sb',
    port: 6006,
    reuseExistingServer: !process.env.CI,
  },
});
