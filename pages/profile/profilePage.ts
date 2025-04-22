import { expect, Page } from "@playwright/test";
import { Logger } from "../../utils/logger";
import { faker } from "@faker-js/faker";

export class UserProfile {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // User Profile Selectors
    private profileicon = () => this.page.getByRole('button', { name: 'open profile menu' });
    private profilelink = () => this.page.getByRole('link', { name: 'Profile' });

    // Input fields
    private firstName = () => this.page.locator('input[name="firstName"]');
    private middleName = () => this.page.locator('input[name="middleName"]');
    private lastName = () => this.page.locator('input[name="lastName"]');
    private addressLine1 = () => this.page.locator('input[name="addressLine1"]');
    private addressLine2 = () => this.page.locator('input[name="addressLine2"]');
    private dateOfBirth = () => this.page.locator('input[name="dateOfBirth"]');
    private country = () => this.page.locator('div');
    private region = () => this.page.locator('div').filter({ hasText: /^Select$/ }).nth(1);
    private city = () => this.page.locator('div').filter({ hasText: /^Select$/ }).nth(1)
    private zip = () => this.page.locator('input[name="zip"]');
    private profession = () => this.page.locator('input[name="profession"]');
    private gender = () => this.page.locator('#user-form circle').nth(2);
    private saveChangesbtn = ()=> this.page.getByRole('button', { name: 'Save Changes' })

    // Checkboxes and radios
    private whatsapp = () => this.page.locator('input#preferredCommunication\.isPreferredWhatsapp');
    private email = () => this.page.locator('input#preferredCommunication\.isPreferredEmail');
    private sms = () => this.page.locator('input#preferredCommunication\.isPreferredSms');
    private languageEnglish = () => this.page.getByLabel('English');
    private languageArabic = () => this.page.getByLabel('Arabic');

    // Bookmark selectors
    private bookmarkicon = () => this.page.getByRole('link', { name: 'My Bookmarks' });

    // Wishlist Selectors
    private wishlisticon = () => this.page.getByRole('link', { name: 'My Wishlist' });
    private wishlistbutton = () => this.page.getByRole('button', { name: 'Add Wishlist' });
    private nextbutton = () => this.page.getByRole('button', { name: 'Next' });
    private transmissiotype = () => this.page.locator('div').filter({ hasText: /^Automatic$/ }).first();
    private fueltype = () => this.page.locator('div').filter({ hasText: /^Petrol$/ }).first();
    private wishlistName = () => this.page.locator('input[name="conciergeName"]');
    private submitbtn = () => this.page.getByRole('button', { name: 'Submit' });
    private okbtn = () => this.page.getByRole('button', { name: 'OK' });
    private deleteWishlist = () => this.page.getByRole('button', { name: 'Delete' });
    private delteconfirmation = () => this.page.getByRole('button', { name: 'Yes' });


    // Logout selectors

    private logoutbtn = () => this.page.getByText('Logout')

    async clickProfileicon() {
        Logger.info('Clicking on Profile Icon');
        await this.profileicon().click();
    }

    async clickProfileLink() {
        Logger.info('Clicking on Profile Link');
        await this.profilelink().click();
        await this.page.waitForLoadState('load');

        Logger.info('Validating the page URL');
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/profile');
    }
    async fillForm(data: any) {
        Logger.info('Filling First Name');
        await this.firstName().fill('imtiyaz');
        await this.page.waitForTimeout(1000);
    
        Logger.info('Filling Middle Name');
        await this.middleName().fill(data.middleName);
        await this.page.waitForTimeout(1000);
    
        Logger.info('Filling Last Name');
        await this.lastName().fill(data.lastName);
    
        Logger.info('Filling Address Line 1');
        await this.addressLine1().fill(data.addressLine1);
        await this.page.waitForTimeout(1000);
    
        Logger.info('Filling Address Line 2');
        await this.addressLine2().fill(data.addressLine2);
        await this.page.waitForTimeout(1000);
    
        Logger.info('Selecting Country');
        await this.country().filter({ hasText: /^Kingdom of Saudi Arabia$/ }).nth(1);
    
        // ---------- Region ----------
        Logger.info('Checking if Region is already selected');
        const selectedRegion = await this.page.locator('div').filter({ hasText: 'Southern Region' }).first().isVisible();
    
        if (!selectedRegion) {
            Logger.info('Selecting Region');
            await this.region().click();
            await this.page.waitForTimeout(1000);
            await this.page.getByText('Southern Region').click();
            await this.page.waitForTimeout(1000);
        } else {
            Logger.info('Region already selected, skipping...');
        }
    
        // ---------- City ----------
        Logger.info('Checking if City is already selected');
        const selectedCity = await this.page.locator('div').filter({ hasText: 'Abu Arish' }).first().isVisible();
    
        if (!selectedCity) {
            Logger.info('Selecting City');
            await this.city().click();
            await this.page.waitForTimeout(1000);
            await this.page.getByText('Abu Arish').click();
            await this.page.waitForTimeout(1000);
        } else {
            Logger.info('City already selected, skipping...');
        }
    
        Logger.info('Filling Zip Code');
        await this.zip().fill('22233');
        await this.page.waitForTimeout(1000);
    
        Logger.info('Filling Profession');
        await this.profession().fill(data.profession);
        await this.page.waitForTimeout(3000)
    
        
        // Logger.info('Select Gender');
        // await this.gender().scrollIntoViewIfNeeded();
        // await this.gender().click();
        // await this.page.waitForTimeout(2000);
    
        Logger.info('Click on Save Changes Button');
        await this.saveChangesbtn().click();
        await this.page.waitForTimeout(2000);
        await this.page.getByText('OK', { exact: true }).click();

        await this.page.waitForTimeout(2000);
    }
    

    async bookmarkIcon() {
        Logger.info('Clicking on Bookmark Icon');
        await this.bookmarkicon().click();
        await this.page.waitForLoadState('load');
    }

    async wishlistIcon() {
        Logger.info('Clicking on Wishlist Icon');
        await this.wishlisticon().click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(2000);
    
        Logger.info('Validating the page URL');
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/my-wishlist');
    
        Logger.info('Checking if a wishlist already exists');
        const wishlistExists = await this.page.locator('button:has-text("Delete")').count() > 0;
    
        if (wishlistExists) {
            Logger.info('Existing wishlist found. Deleting it.');
            await this.deletewishlist();
            await this.delteconfirmation().scrollIntoViewIfNeeded();
            await this.delteconfirmation().click();
            await this.page.waitForTimeout(2000);
            await this.okbtn().scrollIntoViewIfNeeded();
            await this.okbtn().click();
            await this.page.waitForTimeout(4000);
            await this.page.waitForLoadState('networkidle');
        } else {
            Logger.info('No existing wishlist found. Proceeding to create a new one.');
        }
    
        Logger.info('Clicking on Add Wishlist button');
        await this.wishlistbutton().scrollIntoViewIfNeeded();
        await this.wishlistbutton().waitFor({ state: 'visible' });
        await this.wishlistbutton().waitFor({ state: 'visible' });
        await expect(this.wishlistbutton()).toBeEnabled();
        await this.wishlistbutton().click();
        
        Logger.info('Waiting for Wishlist page updates');
        await this.page.waitForLoadState('networkidle', { timeout: 120000 });
        await this.page.waitForTimeout(1000);
    
        Logger.info('Clicking on Car Type');
        await this.page.getByText('Sports Car').click();
    
        Logger.info('Clicking on Next Button');
        await this.nextbutton().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(6000);
    
        Logger.info('Clicking on Next Button after selecting Car Type');
        await this.nextbutton().click();
        await this.page.waitForLoadState('networkidle');
    }
    

    async transmissionType() {
        Logger.info('Clicking on Transmission Type');
        await this.transmissiotype().scrollIntoViewIfNeeded();
        await this.transmissiotype().click();
        await this.page.waitForTimeout(1000);

        Logger.info('Clicking on Fuel Type');
        await this.fueltype().click();
        await this.page.waitForTimeout(1000);
        await this.nextbutton().scrollIntoViewIfNeeded();
        await this.nextbutton().click();
    }

    async wishlistname() {
        const wishlistname = faker.commerce.productName();
        Logger.info('Filling in the Wishlist Name');
        await this.wishlistName().fill(wishlistname);
        await this.page.waitForTimeout(1000);

        Logger.info('Clicking on Save Button');
        await this.submitbtn().scrollIntoViewIfNeeded();
        await this.submitbtn().click();
        await this.page.waitForLoadState('networkidle');

        Logger.info('Clicking on OK Button');
        await this.okbtn().scrollIntoViewIfNeeded();
        await this.okbtn().click();
        await this.page.waitForLoadState('networkidle');
    }

    async deletewishlist() {
        Logger.info('Clicking on Delete Wishlist Button');
        await this.deleteWishlist().click();
        await this.page.waitForTimeout(1000);
    }

    async logout() {
        Logger.info('Clicking on Logout Button');
        await this.logoutbtn().click();
        await this.page.waitForTimeout(2000)

        Logger.info('Validating the page URL after logout');
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en')
    }
    
}
