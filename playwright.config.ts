

import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

//dotenv.config({ path: path.resolve(__dirname, './environment/.env') });

const ENV = process.env.ENV || 'test'; // default to 'test' if not provided
dotenv.config({ path: path.resolve(__dirname, `./environment/.env.${ENV}`) });

console.log(`✅ Running tests in ${ENV.toUpperCase()} environment`);
console.log('✅ BASE_URL:', process.env.BASE_URL);


export default defineConfig({
  globalSetup: './globalSetup',
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0, 
  workers: process.env.CI ? 2 : 10,
  timeout: 140000, // Global test timeout (60s)
  expect: {
    timeout: 45000, // Assertion timeout
  },
  reporter: [
    ['./custom-table-reporter.ts'],
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright'],
  ],
  use: {
    headless: true,
    storageState: './storage/auth.json',
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    locale: 'en-US',
    permissions: ['geolocation'],
    viewport: { width: 1280, height: 720 },  
    deviceScaleFactor: 1,
    geolocation: { latitude: 28.6139, longitude: 77.2090 },
    actionTimeout: 120000, // Timeout for each action (click, fill, etc.)
    navigationTimeout: 180000, // Timeout for navigation actions
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', viewport: { width: 1920, height: 1080 } }
    },
    
    // { name: 'firefox', use: { browserName: 'firefox', viewport: { width: 1920, height: 1080 } } },
    // { name: 'webkit', use: { browserName: 'webkit', viewport: { width: 1920, height: 1080 } } },
  ]
});
