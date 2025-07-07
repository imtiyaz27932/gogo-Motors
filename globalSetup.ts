
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { Logger } from './utils/logger';

const storagePath = path.resolve(__dirname, './storage/auth.json');

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 Unhandled Rejection at:', promise, 'reason:', reason);
});

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
    await page.waitForTimeout(5000)


    Logger.info('Selecting country code...');
    try {
      const countrySelect = page.getByRole('banner').getByRole('combobox');
      await countrySelect.waitFor({ state: 'visible' });
      await countrySelect.click(); 
      await countrySelect.selectOption('sa'); // +966
      Logger.success('Country code +966 selected.');
    } catch (e) {
      Logger.error('Failed to select country code: ' + e);
    }


    Logger.info('Filling mobile number...');
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('531938880');
    await page.waitForTimeout(3000)

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
    Logger.error('Error during global setup: ' + (error instanceof Error ? error.stack : error));

    process.exit(1);
  }
}


// import { chromium } from '@playwright/test';
// import fs from 'fs';
// import path from 'path';
// import { Logger } from './utils/logger';

// const storagePath = path.resolve(__dirname, './storage/auth.json');

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('🔴 Unhandled Rejection at:', promise, 'reason:', reason);
// });

// export default async function globalSetup() {
//   let browser;
//   try {
//     // 🗑 Always remove old storage to force fresh login
//     if (fs.existsSync(storagePath)) {
//       Logger.info('Removing old auth.json to generate new tokens...');
//       fs.unlinkSync(storagePath);
//       Logger.success('Old auth.json removed.');
//     }

//     Logger.info('Launching Chromium browser...');
//     browser = await chromium.launch({ headless: false });

//     Logger.info('Creating new browser context with geolocation...');
//     const context = await browser.newContext({
//       locale: 'en-US',
//       geolocation: { latitude: 28.6139, longitude: 77.2090 },
//       permissions: ['geolocation'],
//     });

//     Logger.info('Granting geolocation permissions...');
//     await context.grantPermissions(['geolocation'], {
//       origin: 'https://uat.gogomotor.com/en',
//     });

//     const page = await context.newPage();
//     Logger.info('Navigating to site...');
//     await page.goto('https://uat.gogomotor.com/en', { waitUntil: 'domcontentloaded' });
//     await page.waitForLoadState('networkidle');
//     Logger.success('Page loaded: ' + page.url());

//     Logger.info('Clicking login button...');
//     const loginBtn = page.getByRole('button', { name: 'login' });
//     await loginBtn.waitFor({ state: 'visible', timeout: 10000 });
//     await loginBtn.click();

//     Logger.info('Selecting country code...');
//     const countryCombo = page.getByRole('combobox');
//     await countryCombo.waitFor({ state: 'visible', timeout: 7000 });
//     await countryCombo.selectOption('+966');

//     Logger.info('Filling mobile number...');
//     const mobileInput = page.getByRole('textbox', { name: 'Mobile Number' });
//     await mobileInput.waitFor({ state: 'visible', timeout: 7000 });
//     await mobileInput.fill('531938880');

//     Logger.info('Clicking Proceed...');
//     const proceedBtn = page.getByRole('button', { name: 'Proceed' });
//     await proceedBtn.waitFor({ state: 'visible', timeout: 7000 });
//     await proceedBtn.click();

//     Logger.info('Filling OTP...');
//     const otpInput = page.locator('input[name="OTPNumber"]');
//     await otpInput.waitFor({ state: 'visible', timeout: 7000 });
//     await otpInput.fill('9461');

//     Logger.info('Clicking Sign In...');
//     const signInBtn = page.getByRole('button', { name: 'Sign In' });
//     await signInBtn.waitFor({ state: 'visible', timeout: 7000 });
//     await signInBtn.click();

//     Logger.info('Waiting for login to complete...');
//     await page.waitForLoadState('networkidle');
//     await page.waitForTimeout(2000);

//     Logger.info('Saving session state...');
//     await context.storageState({ path: storagePath });
//     Logger.success('Login complete. Session saved.');

//     await browser.close();
//     Logger.success('Browser closed. Global setup completed.');
//   } catch (error) {
//     if (browser) {
//       const page = browser.contexts()[0]?.pages()[0];
//       if (page) {
//         await page.screenshot({ path: 'test-results/global-setup-error.png' }).catch(() => {});
//       }
//       await browser.close();
//     }
//     Logger.error('Error during global setup: ' + (error instanceof Error ? error.stack : error));
//     process.exit(1);
//   }
// }