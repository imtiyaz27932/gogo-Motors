import { Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { Logger } from "../utils/logger";

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
    readonly newcars = () => this.page.getByRole('navigation').getByText('New Cars', { exact: true })
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
    private sendotplink = () => this.page.getByText('OTP is sent on your mobile no.')

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

    async verifyHeaderElements(): Promise<void> {
        Logger.info('Verifying that all header elements are visible');

        //  array of header elements to verify
        const headerElements = [
            { name: 'Logo Icon', locator: this.logoicon() },
            { name: 'Language Selector', locator: this.languageSelector() },
            { name: 'Wishlist Icon', locator: this.wishListicon() },
            { name: 'Login Icon', locator: this.loginicon() },
            { name: 'New Cars Tab', locator: this.newcars().first() },
            { name: 'Buy & Sell Cars Tab', locator: this.buysellcars() },
            { name: 'Deals Tab', locator: this.deals() },
            { name: 'Services Tab', locator: this.services() }
        ];

        // Iterate through each element and verify visibility
        for (const element of headerElements) {
            Logger.info(`Checking visibility of ${element.name}`);
            await element.locator.waitFor({ state: 'visible', timeout: 5000 });
            await expect(element.locator).toBeVisible();
            Logger.success(`${element.name} is visible`);
        }

        // Take a screenshot after verifying all elements
        await this.page.screenshot({ path: 'screenshots/header_elements.png' });
        Logger.success('✅ All header elements are visible and verified successfully');
    }

    async verifyClickFunctionality(): Promise<void> {
        Logger.info('Verifying click functionality of header elements');

        // Verify Wishlist Icon
        Logger.info('Clicking on the Wishlist icon');
        const wishlistIcon = this.wishListicon();
        await wishlistIcon.scrollIntoViewIfNeeded();
        await wishlistIcon.waitFor({ state: 'visible' });
        await wishlistIcon.click();
        await this.page.waitForTimeout(2000)
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/wishlist', { timeout: 10000 });
        Logger.success('✅ Wishlist icon clicked and navigated successfully');

        // Verify Login Icon
        Logger.info('Clicking on the Login icon');
        const loginIcon = this.loginicon();
        await loginIcon.scrollIntoViewIfNeeded();
        await loginIcon.waitFor({ state: 'visible' });
        await loginIcon.click();
        await this.page.waitForTimeout(2000)

        // Close the Login modal
        Logger.info('Closing the Login modal');
        const loginCloseButton = this.loginclosebtn();
        await loginCloseButton.scrollIntoViewIfNeeded();
        await loginCloseButton.waitFor({ state: 'visible' });
        await loginCloseButton.click();
        Logger.success('✅ Login icon clicked and modal closed successfully');
    }

    // Verify navigation menu elements are clickable
    async verifyTabNavigation(): Promise<void> {
        Logger.info('Verifying navigation for header tabs');

        // Define an array of tabs with their expected URLs
        const tabs = [
            { name: 'New Cars Tab', locator: this.newcars(), expectedUrl: 'https://liveuat.gogomotor.com/en/newcars' },
            { name: 'Buy & Sell Cars Tab', locator: this.buysellcars(), expectedUrl: 'https://liveuat.gogomotor.com/en/used-cars/riyadh-surveyed' },
            { name: 'Deals Tab', locator: this.deals(), expectedUrl: 'https://liveuat.gogomotor.com/en/campaigns' },
            { name: 'Services Tab', locator: this.services(), expectedUrl: 'https://liveuat.gogomotor.com/en/vas/warranty' }
        ];

        // Iterate through each tab and verify navigation
        for (const tab of tabs) {
            Logger.info(`Clicking on ${tab.name}`);
            await tab.locator.scrollIntoViewIfNeeded();
            await tab.locator.waitFor({ state: 'visible' });
            await tab.locator.click();

            Logger.info(`Verifying navigation to ${tab.expectedUrl}`);
            await this.page.waitForTimeout(2000)
            await expect(this.page).toHaveURL(tab.expectedUrl, { timeout: 10000 });
            Logger.success(`✅ ${tab.name} navigated successfully to ${tab.expectedUrl}`);
        }

        // Take a screenshot after verifying all tabs
        await this.page.screenshot({ path: 'screenshots/header_tabs.png' });
        Logger.success('✅ All header tabs navigated successfully and screenshot captured');
    }

    async loginWithCountryCode(index: number, countryCode: string): Promise<void> {
        await this.page.waitForSelector('.globalloader', { state: 'hidden', timeout: 15000 });

        await this.loginicon().click();
        await this.countrycodelist().selectOption({ index });

        const phoneNumber = countryCode === '+966' ? '531938880' : faker.phone.number();
        await this.PhoneNumber().fill(phoneNumber);
        await this.proceedBtn().click();
        await this.otpfield().fill('9461');
        await this.signinbtn().click();
        await this.page.screenshot({ path: `screenshots/login_${countryCode}.png` });
    }



    // Perform login through wishlist if user is un-authenticated
    async loginThroughWishlist(): Promise<void> {
        Logger.info('Starting login process through the Wishlist icon');

        // Click on the Wishlist icon
        Logger.info('Clicking on the Wishlist icon');
        const wishlistIcon = this.wishListicon();
        await wishlistIcon.scrollIntoViewIfNeeded();
        await wishlistIcon.waitFor({ state: 'visible' });
        await wishlistIcon.click();

        // Click on the "Get Started" button
        Logger.info('Clicking on the "Get Started" button');
        const getStartedButton = this.getStartedBtn();
        await getStartedButton.scrollIntoViewIfNeeded();
        await getStartedButton.waitFor({ state: 'visible' });
        await getStartedButton.click();

        // Click on the "Sign In" button
        Logger.info('Clicking on the "Sign In" button');
        const signInButton = this.signinbtn();
        await signInButton.scrollIntoViewIfNeeded();
        await signInButton.waitFor({ state: 'visible' });
        await signInButton.click();

        // Select Saudi Arabia country code
        Logger.info('Selecting Saudi Arabia country code (+966)');
        const countryCodeDropdown = this.countrycodelist();
        await countryCodeDropdown.scrollIntoViewIfNeeded();
        await countryCodeDropdown.waitFor({ state: 'visible' });
        await countryCodeDropdown.selectOption({ label: '+966' });


        // Fill in the phone number
        const phoneNumber = '531938880'; // Provided phone number
        Logger.info(`Filling in the phone number: ${phoneNumber}`);
        const phoneNumberField = this.wishlistphonenumber();
        await phoneNumberField.scrollIntoViewIfNeeded();
        await phoneNumberField.waitFor({ state: 'visible' });
        await phoneNumberField.fill(phoneNumber);

        // Click on the "Send OTP" button
        Logger.info('Clicking on the "Send OTP" button');
        const sendOtpButton = this.sendotplink();
        await sendOtpButton.scrollIntoViewIfNeeded();
        await sendOtpButton.waitFor({ state: 'visible' });
        await sendOtpButton.click();

        // Wait for the OTP field to appear and fill in the OTP
        const otp = '9461'; // Provided OTP
        Logger.info(`Filling in the OTP: ${otp}`);
        const otpField = this.otpfield();
        await otpField.scrollIntoViewIfNeeded();
        await otpField.waitFor({ state: 'visible' });
        this.page.getByText('OTP is sent on your mobile no.')
        await otpField.fill(otp);

        // Click on the "Sign In" button to complete the login process
        Logger.info('Clicking on the "Sign In" button to complete the login process');
        await signInButton.scrollIntoViewIfNeeded();
        await signInButton.waitFor({ state: 'visible' });
        await signInButton.click();

        // Wait for login confirmation
        try {
            Logger.info('Waiting for login confirmation');
            await this.wishListicon().waitFor({ state: 'visible', timeout: 10000 });
            Logger.success('✅ Login through Wishlist completed successfully.');
        } catch (error) {
            Logger.error('⚠️ Login through Wishlist failed or got stuck.');
            await this.page.screenshot({ path: 'screenshots/login_through_wishlist_error.png' });
            throw error;
        }

        // Take a screenshot for debugging
        await this.page.screenshot({ path: 'screenshots/login_through_wishlist.png' });
    }

    async logout(): Promise<void> {
        Logger.info('Starting logout process');

        // Click on the profile menu button
        Logger.info('Clicking on the "Open Profile Menu" button');
        const profileMenuButton = this.page.getByRole('button', { name: 'open profile menu' });
        await profileMenuButton.scrollIntoViewIfNeeded();
        await profileMenuButton.waitFor({ state: 'visible' });
        await profileMenuButton.click();

        // Click on the "Logout" button
        Logger.info('Clicking on the "Logout" button');
        const logoutButton = this.page.getByRole('button', { name: 'Logout' });
        await logoutButton.scrollIntoViewIfNeeded();
        await logoutButton.waitFor({ state: 'visible' });
        await logoutButton.click();

        // Wait for the page to confirm logout (e.g., login button becomes visible again)
        Logger.info('Waiting for confirmation of logout');
        const loginButton = this.loginicon();
        await loginButton.waitFor({ state: 'visible', timeout: 10000 });

        Logger.success('✅ Logout process completed successfully');
    }
    async isLoggedIn(): Promise<boolean> {
        Logger.info('Checking if the user is already logged in');

        try {
            // Check if the profile menu button is visible (indicating the user is logged in)
            const profileMenuButton = this.page.getByRole('button', { name: 'open profile menu' });
            await profileMenuButton.waitFor({ state: 'visible', timeout: 3000 });
            Logger.info('User is already logged in');
            return true;
        } catch {
            Logger.info('User is not logged in');
            return false;
        }
    }


}
