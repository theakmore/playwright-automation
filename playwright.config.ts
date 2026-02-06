import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  retries: process.env.CI ? 2 : 0,
  //If running in CI (Jenkins) → retry failed test 2 times and If running locally → retry = 0
  workers: process.env.CI ? 3 : undefined,
  //Meaning: how many parallel workers (threads) will execute tests ,
  //In CI → run with 3 workers and Locally → undefined means Playwright auto decides (usually CPU cores)

  reporter: [
    ['line'],
    ['allure-playwright'] ,
    // ["./reporters/aiFailureReporter"] //uncomment this line to enable custom AI failure reporter
  ],

  use: {
    baseURL: 'https://automationexercise.com',
    headless: process.env.CI ? true : false,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
