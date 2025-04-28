import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { permission } from 'process';

const storagePath = path.resolve(__dirname, './storage/auth.json');

export default async function globalSetup() {
  if (fs.existsSync(storagePath)) {
    console.log('✅ Storage state already exists. Skipping login...');
    return;
  }

  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext({
    geolocation: { latitude: 28.6139, longitude: 77.2090 }, 
    permissions: ['geolocation'],
   
  });

  // ✅ Grant geolocation permissions for the site
  await context.grantPermissions(['geolocation'], {
    origin: 'https://liveuat.gogomotor.com',
  });

  const page = await context.newPage();
  console.log('🔐 Performing login to generate storage state...');

  await page.goto('https://liveuat.gogomotor.com/en');
  await page.getByRole("button", { name: "login" }).click();
  await page.getByRole('combobox').selectOption('+966');
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('531938880');

  await page.getByRole('button', { name: 'Proceed' }).click();
  await this.page.waitForLoadState('networkidle');
  
  // Fill in the OTP
 
  await this.page.getByRole('textbox', { name: 'OTPNumber' }).fill('9461');
  await this.page.waitForTimeout(10000)
  
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForLoadState('networkidle');

  // Save session
  await page.context().storageState({ path: storagePath });

  console.log('✅ Login complete. Session saved.');

  await browser.close();
}
