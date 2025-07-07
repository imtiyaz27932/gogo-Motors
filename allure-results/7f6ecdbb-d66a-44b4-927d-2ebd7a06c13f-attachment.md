# Test info

- Name: Car Tinting - Mobile Web >> Validate GoGo Promise section
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:40:9

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://uat.gogomotor.com/en", waiting until "domcontentloaded"

    at HeaderPage.navigateToHomePage (D:\gogomotor\pages\headerPage.ts:38:25)
    at Object.headerPage (D:\gogomotor\utils\testSetup.ts:16:26)
```

# Test source

```ts
   1 | import { Page, expect } from "@playwright/test";
   2 | import { faker } from "@faker-js/faker";
   3 | import { Logger } from "../utils/logger";
   4 |
   5 | export class HeaderPage {
   6 |     readonly page: Page;
   7 |
   8 |     constructor(page: Page) {
   9 |         this.page = page;
   10 |     }
   11 |
   12 |     // Selectors
   13 |     readonly logoicon = () => this.page.getByRole("link", { name: /GoGo Motor - Buy and Sell/i });
   14 |     readonly languageSelector = () => this.page.getByRole("button", { name: "Riyadh" });
   15 |     readonly wishListicon = () => this.page.getByRole("button", { name: "wishlist" });
   16 |     readonly loginicon = () => this.page.getByRole("button", { name: "login" });
   17 |     readonly loginclosebtn = () => this.page.locator('#back-btn-wrapper div').getByRole('img');
   18 |     readonly newcars = () => this.page.getByRole('navigation').getByText('New Cars', { exact: true })
   19 |     readonly buysellcars = () => this.page.getByRole('navigation').getByText('Buy & Sell Used Cars');
   20 |     readonly deals = () => this.page.getByRole('navigation').getByText('Deals', { exact: true });
   21 |     readonly services = () => this.page.getByRole('navigation').getByText('Services');
   22 |     readonly countrycodelist = () => this.page.getByRole('combobox');
   23 |     readonly PhoneNumber = () => this.page.getByRole('textbox', { name: 'Mobile Number' });
   24 |     readonly proceedBtn = () => this.page.getByRole('button', { name: 'Proceed' });
   25 |     readonly otpfield = () => this.page.locator('input[name="OTPNumber"]');
   26 |     readonly signinbtn = () => this.page.getByRole('button', { name: 'Sign In' });
   27 |     readonly getStartedBtn = () => this.page.getByRole('button', { name: 'Get Started' });
   28 |     readonly wishlistphonenumber = () => this.page.locator('div').filter({ hasText: /^Mobile Number\*$/ }).getByRole('textbox')
   29 |     private sendotplink = () => this.page.getByText('OTP is sent on your mobile no.')
   30 |
   31 |     // Navigate to the home page
   32 |     async navigateToHomePage() {
   33 |         const baseUrl = process.env.BASE_URL;
   34 |         if (!baseUrl) {
   35 |             throw new Error("BASE_URL is not defined in environment variables.");
   36 |         }
   37 |
>  38 |         await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      |                         ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
   39 |         await this.page.waitForTimeout(2000);  // Ensures all network requests are done
   40 |         await expect(this.page).toHaveURL(new RegExp(`${baseUrl}.*`), { timeout: 10000 });
   41 |
   42 |         console.log("✅ Current URL:", this.page.url());
   43 |     }
   44 |
   45 |     async verifyHeaderElements(): Promise<void> {
   46 |         Logger.info('Verifying that all header elements are visible');
   47 |
   48 |         //  array of header elements to verify
   49 |         const headerElements = [
   50 |             { name: 'Logo Icon', locator: this.logoicon() },
   51 |             { name: 'Language Selector', locator: this.languageSelector() },
   52 |             { name: 'Wishlist Icon', locator: this.wishListicon() },
   53 |             { name: 'Login Icon', locator: this.loginicon() },
   54 |             { name: 'New Cars Tab', locator: this.newcars().first() },
   55 |             { name: 'Buy & Sell Cars Tab', locator: this.buysellcars() },
   56 |             { name: 'Deals Tab', locator: this.deals() },
   57 |             { name: 'Services Tab', locator: this.services() }
   58 |         ];
   59 |
   60 |         // Iterate through each element and verify visibility
   61 |         for (const element of headerElements) {
   62 |             Logger.info(`Checking visibility of ${element.name}`);
   63 |             await element.locator.waitFor({ state: 'visible', timeout: 5000 });
   64 |             await expect(element.locator).toBeVisible();
   65 |             Logger.success(`${element.name} is visible`);
   66 |         }
   67 |
   68 |         // Take a screenshot after verifying all elements
   69 |         await this.page.screenshot({ path: 'screenshots/header_elements.png' });
   70 |         Logger.success('✅ All header elements are visible and verified successfully');
   71 |     }
   72 |
   73 |     async verifyClickFunctionality(): Promise<void> {
   74 |         Logger.info('Verifying click functionality of header elements');
   75 |
   76 |         // Verify Wishlist Icon
   77 |         Logger.info('Clicking on the Wishlist icon');
   78 |         const wishlistIcon = this.wishListicon();
   79 |         await wishlistIcon.scrollIntoViewIfNeeded();
   80 |         await wishlistIcon.waitFor({ state: 'visible' });
   81 |         await wishlistIcon.click();
   82 |         await this.page.waitForTimeout(2000)
   83 |         await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/wishlist', { timeout: 10000 });
   84 |         Logger.success('✅ Wishlist icon clicked and navigated successfully');
   85 |
   86 |         // Verify Login Icon
   87 |         Logger.info('Clicking on the Login icon');
   88 |         const loginIcon = this.loginicon();
   89 |         await loginIcon.scrollIntoViewIfNeeded();
   90 |         await loginIcon.waitFor({ state: 'visible' });
   91 |         await loginIcon.click();
   92 |         await this.page.waitForTimeout(2000)
   93 |
   94 |         // Close the Login modal
   95 |         Logger.info('Closing the Login modal');
   96 |         const loginCloseButton = this.loginclosebtn();
   97 |         await loginCloseButton.scrollIntoViewIfNeeded();
   98 |         await loginCloseButton.waitFor({ state: 'visible' });
   99 |         await loginCloseButton.click();
  100 |         Logger.success('✅ Login icon clicked and modal closed successfully');
  101 |     }
  102 |
  103 |     // Verify navigation menu elements are clickable
  104 |     async verifyTabNavigation(): Promise<void> {
  105 |         Logger.info('Verifying navigation for header tabs');
  106 |
  107 |         // Define an array of tabs with their expected URLs
  108 |         const tabs = [
  109 |             { name: 'New Cars Tab', locator: this.newcars(), expectedUrl: 'https://liveuat.gogomotor.com/en/newcars' },
  110 |             { name: 'Buy & Sell Cars Tab', locator: this.buysellcars(), expectedUrl: 'https://liveuat.gogomotor.com/en/used-cars/riyadh-surveyed' },
  111 |             { name: 'Deals Tab', locator: this.deals(), expectedUrl: 'https://liveuat.gogomotor.com/en/campaigns' },
  112 |             { name: 'Services Tab', locator: this.services(), expectedUrl: 'https://liveuat.gogomotor.com/en/vas/warranty' }
  113 |         ];
  114 |
  115 |         // Iterate through each tab and verify navigation
  116 |         for (const tab of tabs) {
  117 |             Logger.info(`Clicking on ${tab.name}`);
  118 |             await tab.locator.scrollIntoViewIfNeeded();
  119 |             await tab.locator.waitFor({ state: 'visible' });
  120 |             await tab.locator.click();
  121 |
  122 |             Logger.info(`Verifying navigation to ${tab.expectedUrl}`);
  123 |             await this.page.waitForTimeout(2000)
  124 |             await expect(this.page).toHaveURL(tab.expectedUrl, { timeout: 10000 });
  125 |             Logger.success(`✅ ${tab.name} navigated successfully to ${tab.expectedUrl}`);
  126 |         }
  127 |
  128 |         // Take a screenshot after verifying all tabs
  129 |         await this.page.screenshot({ path: 'screenshots/header_tabs.png' });
  130 |         Logger.success('✅ All header tabs navigated successfully and screenshot captured');
  131 |     }
  132 |
  133 |     async loginWithCountryCode(index: number, countryCode: string): Promise<void> {
  134 |         await this.page.waitForSelector('.globalloader', { state: 'hidden', timeout: 15000 });
  135 |
  136 |         await this.loginicon().click();
  137 |         await this.countrycodelist().selectOption({ index });
  138 |
```