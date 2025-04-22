
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const storagePath = path.resolve(__dirname, './storage/auth.json');

export default async function globalSetup() {
  // 👇 Only run login if auth.json doesn't exist
  if (fs.existsSync(storagePath)) {
    console.log('✅ Storage state already exists. Skipping login...');
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  await context.grantPermissions(['geolocation', 'notifications'], { 
    origin: 'https://liveuat.gogomotor.com' 
  });
  const page = await browser.newPage();

  console.log('🔐 Performing login to generate storage state...');

  await page.goto('https://liveuat.gogomotor.com/en');
  await page.getByRole("button", { name: "login" }).click();
  await page.getByRole('combobox').selectOption('+966');
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('531938880');
  presmission : Geolocation
  await page.getByRole('button', { name: 'Proceed' }).click();

  await page.getByRole('textbox', { name: 'OTPNumber' }).fill('9461');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForLoadState('networkidle');

  // Save session
  await page.context().storageState({ path: storagePath });

  console.log('✅ Login complete. Session saved.');

  await browser.close();
}
