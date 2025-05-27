


import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { Logger } from './utils/logger';

const storagePath = path.resolve(__dirname, './storage/auth.json');

export default async function globalSetup() {
  try {
    // 🗑 Always remove old storage to force fresh login
    if (fs.existsSync(storagePath)) {
      Logger.info('Removing old auth.json to generate new tokens...');
      fs.unlinkSync(storagePath);
      Logger.success('Old auth.json removed.');
    }

    Logger.info('Launching Chromium browser...');
    const browser = await chromium.launch({ headless: true });

    Logger.info('Creating new browser context with geolocation...');
    const context = await browser.newContext({
      locale: 'en-US',
      geolocation: { latitude: 28.6139, longitude: 77.2090 },
      permissions: ['geolocation'],
    });

    Logger.info('Granting geolocation permissions...');
    await context.grantPermissions(['geolocation'], {
      origin: 'https://uat.gogomotor.com/en',
    });

    const page = await context.newPage();
    Logger.info('Navigating to site...');
    await page.goto('https://uat.gogomotor.com/en');
    await page.waitForTimeout(10000);
    Logger.success('Page loaded: ' + page.url());

    Logger.info('Clicking login button...');
    await page.getByRole('button', { name: 'login' }).click();

    Logger.info('Selecting country code...');
    await page.getByRole('combobox').selectOption('+966');

    Logger.info('Filling mobile number...');
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('531938880');

    Logger.info('Clicking Proceed...');
    await page.getByRole('button', { name: 'Proceed' }).click();
    await page.waitForTimeout(2000);

    Logger.info('Filling OTP...');
    await page.locator('input[name="OTPNumber"]').fill('9461');
    await page.waitForTimeout(2000);

    Logger.info('Clicking Sign In...');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForTimeout(3000);

    Logger.info('Saving session state...');
    await context.storageState({ path: storagePath });
    Logger.success('Login complete. Session saved.');

    await browser.close();
    Logger.success('Browser closed. Global setup completed.');
  } catch (error) {
    Logger.error('Error during global setup: ' + error);
    process.exit(1);
  }
}
