import { Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class HeaderPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    readonly logoicon = () => this.page.getByRole("link", { name: /GoGo Motor - Buy and Sell/i });
    readonly languageSelector = () => this.page.getByRole("button", { name: "Riyadh" });
    readonly wishListicon = () => this.page.getByRole("button", { name: "wishlist" });
    readonly loginicon = () => this.page.getByRole("button", { name: "login" });
    readonly loginclosebtn = () => this.page.locator('#back-btn-wrapper div').getByRole('img');
    readonly newcars = () => this.page.getByRole('navigation').getByText('New Cars');
    readonly buysellcars = () => this.page.getByRole('navigation').getByText('Buy & Sell Used Cars');
    readonly deals = () => this.page.getByRole('navigation').getByText('Deals', { exact: true });
    readonly services = () => this.page.getByRole('navigation').getByText('Services');
    readonly countrycodelist = () => this.page.getByRole('combobox');
    readonly PhoneNumber = () => this.page.getByRole('textbox', { name: 'Mobile Number' });
    readonly proceedBtn = () => this.page.getByRole('button', { name: 'Proceed' });
    readonly otpfield = () => this.page.locator('input[name="OTPNumber"]');
    readonly signinbtn = () => this.page.getByRole('button', { name: 'Sign In' });
    readonly getStartedBtn = () => this.page.getByRole('button', { name: 'Get Started' });
    readonly wishlistphonenumber = () => this.page.locator('div').filter({ hasText: /^Mobile Number\*$/ }).getByRole('textbox')
    private sendotplink =()=> this.page.getByText('OTP is sent on your mobile no.')
                
    // Navigate to the home page
    async navigateToHomePage() {
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error("BASE_URL is not defined in environment variables.");
        }

        await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await this.page.waitForTimeout(2000);  // Ensures all network requests are done
        await expect(this.page).toHaveURL(new RegExp(`${baseUrl}.*`), { timeout: 10000 });

        console.log("✅ Current URL:", this.page.url());
    }

    // Verify that all elements are displayed in the header
    async verifyHeaderElements() {
        await expect(this.logoicon()).toBeVisible();
        await expect(this.languageSelector()).toBeVisible();
        await expect(this.wishListicon()).toBeVisible();
        await expect(this.loginicon()).toBeVisible();
        await expect(this.newcars()).toBeVisible();
        await expect(this.buysellcars()).toBeVisible();
        await expect(this.deals()).toBeVisible();
        await expect(this.services()).toBeVisible();

        await this.page.screenshot({ path: "screenshots/header_elements.png" });
        console.log('✅ All header elements are visible.');
    }
    
    // Verify that header top section elements are clickable
    async verifyClickFunctionality() {
        await this.wishListicon().click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/wishlist', { timeout: 15000 });
        console.log('✅ Wishlist icon clicked.');

        await this.loginicon().click();
        await this.page.waitForLoadState("networkidle");
        await this.loginclosebtn().click();
        console.log('✅ Login icon clicked and closed.');
    }

    // Verify navigation menu elements are clickable
    async verifyTabNavigation() {
        await this.newcars().click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/newcars', { timeout: 15000 });

        await this.buysellcars().click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/used-cars/riyadh-surveyed', { timeout: 15000 });

        await this.deals().click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/campaigns', { timeout: 15000 });

        await this.services().click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/vas/warranty', { timeout: 15000 });

        await this.page.screenshot({ path: "screenshots/header_tabs.png" });
        console.log('✅ All header tabs navigated successfully.');
    }

    async loginWithCountryCode(index: number, countryCode: string) {
        //await this.page.waitForSelector('.globalloader', { state: 'detached', timeout: 10000 });
        await this.page.waitForSelector('.globalloader', { state: 'hidden', timeout: 15000 });

        await this.loginicon().click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(2000);
    
        await this.countrycodelist().selectOption({ index });
        await this.page.waitForTimeout(1000);
    
        let phoneNumber = '';
        if (countryCode === '+91') {
            phoneNumber = '9' + faker.string.numeric(9);
        } else if (countryCode === '+966') {
            phoneNumber = '5' + faker.string.numeric(8);
        } else {
            phoneNumber = faker.phone.number();
        }
    
        await this.PhoneNumber().fill(phoneNumber);
        await this.proceedBtn().click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(2000);
        await this.otpfield().fill('123456');
        await this.signinbtn().click();
    
        try {
            // Wait max 5-6 seconds for something indicating successful login, like wishlist button appearing or page navigation
            await this.page.waitForLoadState('networkidle', { timeout: 6000 });
            console.log(`✅ Login attempt for ${countryCode} completed.`);
        } catch (error) {
            console.warn(`⚠️ Login with ${countryCode} got stuck or failed. Continuing with the next test case.`);
        }
    
        await this.page.screenshot({ path: `screenshots/login_${countryCode}.png` });
    }
    
    
    async loginWithSaudiAndIndia() {
        // Attempt login with Saudi number
        await this.loginWithCountryCode(1, '+966');
        await this.page.waitForTimeout(2000);
    
        // Refresh or go home, just to reset UI state
        await this.navigateToHomePage();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(2000);
    
        // Attempt login with Indian number
        await this.loginWithCountryCode(2, '+91');
        await this.page.waitForLoadState("networkidle");
    }

    async verifyLoaderStuckOnInvalidOtp() {
        await this.page.waitForSelector('.globalloader', { state: 'hidden', timeout: 15000 });
    
        await this.loginicon().click();
        await this.page.waitForLoadState("networkidle");
        await this.countrycodelist().selectOption({ index: 1 });
        await this.PhoneNumber().fill('500000000');
        await this.proceedBtn().click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(2000);
    
        // Enter invalid OTP
        await this.otpfield().fill('000000');
        await this.signinbtn().click();
    
        console.log('⚠️ Waiting to see if loader disappears or remains stuck...');
        try {
            // If loader still visible after 10 seconds, fail test
            await this.page.waitForSelector('.globalloader', { state: 'hidden', timeout: 10000 });
            console.log('✅ Loader disappeared — system responded to invalid OTP.');
        } catch (error) {
            console.error('❗ BUG: Loader still hanging on invalid OTP, no validation message.');
            await this.page.screenshot({ path: 'screenshots/loader_stuck_on_invalid_otp.png' });
            throw new Error('BUG: Loader remains stuck and no validation message appears after entering invalid OTP.');
        }
    }

    // Perform login through wishlist if user is un-authenticated
    async loginThroughWishlist() {
        await this.wishListicon().click();
        await this.getStartedBtn().click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(1000);
        await this.signinbtn().click();
        const phoneNumber = faker.phone.number();
        await this.wishlistphonenumber().fill(phoneNumber);
        await this.sendotplink().click()
        await this.page.waitForLoadState("networkidle");
        await this.otpfield().fill('123456');
        await this.signinbtn().click();


    
    }
}