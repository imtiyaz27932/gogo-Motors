import { test } from '../utils/testSetup'
import { FooterPage } from '../pages/footer';
import { Logger } from '../utils/logger';
import { expect } from '@playwright/test';
import { COPYRIGHT_TEXT } from '../utils/footerConstants';


test.use({ storageState: './storage/auth.json' });
test.describe('Footer Test Cases', () => {
    let footerPage: FooterPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and checking functionality of Footer');
        footerPage = new FooterPage(page);
    });

    test("Verify GoGo Motor logo is visible in footer", async () => {
        Logger.info('Checking the logo visibility in Footer ')
        expect(await footerPage.verifyLogoVisibility()).toBeTruthy();
    });

    test("Verify social media links are present", async () => {
        Logger.info('Checking presence of social media links')
        expect(await footerPage.verifySocialLinks()).toBeTruthy();
    });

    test("Verify contact number and email are visible", async () => {
        Logger.info('Checking contact and email address')
        expect(await footerPage.verifyContactDetails()).toBeTruthy();
    });

    test("Verify app store download links are visible", async () => {
        Logger.info('Checking the app download links')
        await footerPage.verifyAppLinks();
    });

    test("Verify footer links are present and clickable", async () => {
        Logger.info('Checking Company')
        await footerPage.validateAndClickFooterLinks()

    });

    test("Filling the contact Details", async () => {
        Logger.info('Filling contact Deatils')
        await footerPage.fillContactDeatils()

    });

    test("Search for FAQs in Footer section", async () => {
        Logger.info('Searching for any FAQ');
        await footerPage.SearchForFAQ();
    });

    test('Verify the cities are functional', async () => {
        Logger.info('Clciking on Citites one by one');
        await footerPage.validateAndClickCities();

    });

    test('Verify the newsletter subscription', async () => {
        Logger.info('Subscribing to the newsletter');
        await footerPage.NewsLetter();

    })

    test('Validate Privacy Policy link navigation', async () => {
        Logger.info('Clicking on Privacy Policy Link');
        await footerPage.clickPrivacyPolicy();
      

    })

    test("Validate Terms & Conditions link navigation", async () => {
        Logger.info('clicking on Terms and conditions link')
        await footerPage.TermsAndConditions();
        

    });

    test("Validate Sale & Purchase Policy link navigation", async () => {
        Logger.info('clicking on sale and purchaes policy link')
        await footerPage.clickSalePurchasePolicy();
    
    });

    test("Validate Refund & Cancellation Policy link navigation", async () => {
        Logger.info('clicking on refund and cancellation policy link')
        await footerPage.clickRefundCancellationPolicy();
        
    });

    test("Verify that all payment method icons are visible", async () => {
        Logger.info('checking the payemnt methods icons are displayed')
        await footerPage.verifyPaymentIconsVisibility();
    })
    

    test("Verify each payment method icon's presence with assertion", async ({ page }) => {
        const paymentIcons = [
            "stcpay",
            "visacard",
            "american-express",
            "mastercard",
            "casamada",
            "applepay"
        ];
        
        for (const icon of paymentIcons) {
            const locator = page.locator(`img[alt='${icon}']`);
            await expect(locator).toBeVisible();
        }

    });

    test('should validate copyright text matches expected', async () => {
        Logger.info('Validating coyright text in footer')
        const actualText = await footerPage.getCopyrightText();
        expect(actualText.trim()).toBe(COPYRIGHT_TEXT);
    });
    
    test('should click and validate all Explore menu items and submenus', async ({ page }) => {
        Logger.info('clicking on the new cars in footer')
        await footerPage.clickAndValidateMenuItems();
        await page.waitForTimeout(4000)
        await page.goBack();
       
    });
});