import { Page, Locator, expect } from "@playwright/test";
import { scrollSmoothly } from "../utils/scrollWheel";
import { slowScrollDown } from "../utils/scroll";
import { faker } from "@faker-js/faker";
import { ExploreMenuItems, SubMenuItems } from "../utils/exploreConstants";
import { Logger } from "../utils/logger";

export class FooterPage {
    readonly page: Page;
    readonly footerLogo: Locator;
    readonly socialLinks: Locator[];
    readonly contactNumber: Locator;
    readonly email: Locator;
    readonly downloadAppLink: Locator;
    readonly googlePlayLink: Locator;
    readonly appStoreLink: Locator;
    readonly appGalleryLink: Locator;
    readonly aboutUsLink: Locator;
    readonly careersLink: Locator;
    readonly contactUsLink: Locator;
    readonly faqLink: Locator;
    readonly name: Locator;
    readonly Email: Locator;
    readonly mobileNumber: Locator;
    readonly citydropdown: Locator;
    readonly commentsBox: Locator;
    readonly submitbtn: Locator;
    readonly cancelbtn: Locator;
    readonly faqSearch: Locator;
    readonly city1: Locator;
    readonly city2: Locator;
    readonly city3: Locator;
    readonly city4: Locator;
    readonly city5: Locator;
    readonly city6: Locator;
    readonly seeAlllink: Locator;
    readonly selectcity: Locator;
    readonly newsletter: Locator;
    readonly newletterEmail: Locator;
    readonly subscribebtn: Locator;
    readonly privacyPolicyLink: Locator;
    readonly termsAndConditionsLink: Locator;
    readonly salePurchasePolicyLink: Locator;
    readonly refundCancellationPolicyLink: Locator;
    readonly paymentIcons: Locator[];
    readonly copyrightText: Locator;
    readonly newCars: Locator
    readonly buyandsellusedcars: Locator

    constructor(page: Page) {
        this.page = page;
        this.footerLogo = page.locator("footer img[alt='GoGo Motor - Buy and Sell New & Used Cars in Saudi Arabia']");

        this.socialLinks = [
            page.locator("footer a[href*='youtube.com']"),
            page.locator("footer a[href*='linkedin.com']"),
            page.locator("footer a[href*='facebook.com']"),
            page.locator("footer a[href*='twitter.com']"),
            page.locator("footer a[href*='instagram.com']"),
        ];
        this.contactNumber = this.page.locator('a[href="tel:8002440258"][tabindex="2007"]');
        this.email = this.page.locator('a[href="mailto:customercare@gogomotor.com"][tabindex="2008"]');
        this.downloadAppLink = this.page.getByText('Download GoGo Motor App').nth(1)
        this.googlePlayLink = this.page.getByRole('link', { name: 'GoGo Motor App on Google Play' }).first()
        this.appStoreLink = this.page.getByRole('link', { name: 'GoGo Motor App on the Apple' })
        this.appGalleryLink = this.page.getByRole('link', { name: 'GoGo Motor App on Google Play' }).nth(1)
        this.aboutUsLink = this.page.locator("footer a[href='/en/info/about-us']");
        this.contactUsLink = this.page.locator("footer a[href='/en/info/contact-us']");
        this.faqLink = this.page.locator('a[href="/en/info/faq"]');
        this.name = page.locator('input[name="firstName"]')
        this.Email = page.getByRole('main').locator('input[name="email"]')
        this.mobileNumber = page.locator('div').filter({ hasText: /^Mobile Number\*$/ }).getByRole('textbox')
        this.citydropdown = page.locator('div.select-area')
        this.commentsBox = page.locator('textarea[name="comments"]')
        this.submitbtn = page.getByRole('button', { name: 'Submit' })
        this.cancelbtn = page.getByRole('button', { name: 'Cancel' })
        this.faqSearch = page.getByRole('textbox', { name: 'Search' })
        this.city1 = page.locator('#footer-id').getByText('Riyadh')
        this.city2 = page.locator('#footer-id').getByText('Jeddah', { exact: true })
        this.city3 = page.locator('#footer-id').getByText('Dammam')
        this.city4 = page.locator('#footer-id').getByText('Mecca')
        this.city5 = page.locator('#footer-id').getByText('Medina')
        this.city6 = page.locator('#footer-id').getByText('Medina')
        this.seeAlllink = page.locator('#footer-id').getByText('See all')
        this.selectcity = page.getByRole('img', { name: 'Riyadh' })
        this.newsletter = page.getByText('Subscribe to our newsletters')
        this.newletterEmail = page.getByRole('textbox', { name: 'Enter your email address' })
        this.subscribebtn = page.getByRole('button', { name: 'Subscribe' })
        this.privacyPolicyLink = page.locator("a[href='/en/info/privacy-policy']");
        this.termsAndConditionsLink = page.locator("a[href='/en/info/terms-and-conditions']");
        this.salePurchasePolicyLink = page.locator("a[href='/en/info/terms-and-conditions#sales-and-purchase-policy']");
        this.refundCancellationPolicyLink = page.locator("a[href='/en/info/terms-and-conditions#refund-and-cancellation-policy']");
        this.paymentIcons = [
            page.locator("img[alt='stcpay']"),
            page.locator("img[alt='visacard']"),
            page.locator("img[alt='american-express']"),
            page.locator("img[alt='mastercard']"),
            page.locator("img[alt='casamada']"),
            page.locator("img[alt='applepay']")
        ];
        this.copyrightText = page.locator("p.text-gray-200");
        this.newCars = page.getByText('New Cars', { exact: true }).first();
        this.buyandsellusedcars = page.getByText('Buy & Sell Used Cars', { exact: true }).nth(0)





    }

    private async ensurePageIsScrolled() {
        await scrollSmoothly(this.page, 2000, 2200, 700);
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(1000);
    }


    async verifyLogoVisibility() {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 1500)
        await this.footerLogo.waitFor();
        return this.footerLogo.isVisible();
    }

    async verifySocialLinks(): Promise<boolean> {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)

        const socialLinks = [
            { name: 'YouTube', selector: 'a[href*="youtube.com"]' },
            { name: 'LinkedIn', selector: 'a[href*="linkedin.com"]' },
            { name: 'Facebook', selector: 'a[href*="facebook.com"]' },
            { name: 'Twitter', selector: 'a[href*="twitter.com"]' },
            { name: 'Instagram', selector: 'a[href*="instagram.com"]' },
        ];

        let allVisible = true;

        for (const link of socialLinks) {
            const locator = this.page.locator(link.selector);
            try {
                await locator.waitFor({ state: 'visible', timeout: 3000 });
            } catch {
                Logger.error(`❌ Timeout waiting for ${link.name} link`);
            }
            const visible = await locator.isVisible();
            if (!visible) {
                Logger.error(`❌ Social link not visible: ${link.name}`);
                allVisible = false;
            } else {
                Logger.info(`✅ Social link visible: ${link.name}`);
            }
        }

        if (!allVisible) {
            await this.page.screenshot({ path: 'test-results/social-links-missing.png', fullPage: true });
        }

        return allVisible;
    }

    async verifyContactDetails(): Promise<boolean> {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)
        const isContactVisible = await this.contactNumber.isVisible();
        const isEmailVisible = await this.email.isVisible();
        return isContactVisible && isEmailVisible;
    }


    async verifyAppLinks() {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)
        await expect(this.downloadAppLink).toBeVisible()
        await expect(this.googlePlayLink).toBeVisible();
        await expect(this.appStoreLink).toBeVisible();
        await expect(this.appGalleryLink).toBeVisible();



    }

    async validateAndClickFooterLinks() {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 5000);

        const links: { name: string; locator: Locator }[] = [
            { name: 'About Us', locator: this.aboutUsLink },
            { name: 'Careers', locator: this.careersLink },
            // { name: 'Contact Us', locator: this.contactUsLink },
            { name: 'FAQ\'s', locator: this.faqLink }
        ];

        for (const { name, locator } of links) {
            Logger.info(`Navigating to: ${name}`);

            // ✅ Ensure locator is valid
            if (!locator || typeof locator !== 'object' || !('click' in locator)) {
                console.error(`Invalid locator for: ${name}`);
                continue;
            }

            await expect(locator).toBeVisible();

            const href = await locator.getAttribute('href');
            if (href?.startsWith('mailto:')) {
                console.log(`${name} is a mailto link: ${href}`);
                continue; // Skip navigation for mailto links
            }

            const [response] = await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'load' }),
                locator.click()
            ]);

            Logger.info(`${name} page opened, status: ${response?.status()}`);
            await this.page.waitForTimeout(2000);

            await this.page.goBack({ waitUntil: 'load' });
            await this.page.waitForTimeout(1500);
            await this.page.mouse.wheel(0, 2000);
        }

        Logger.success("✅ Footer links verified.");
    }




    async fillContactDeatils() {
        Logger.info('Filling contact details in the footer...');
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000);

        // Click Contact Us link and wait for form to be visible
        await this.contactUsLink.waitFor({ state: 'visible', timeout: 7000 });
        await this.contactUsLink.click();
        await this.page.waitForLoadState('networkidle');

        // Fill name
        await this.name.waitFor({ state: 'visible', timeout: 5000 });
        await this.name.fill(faker.person.firstName());

        // Fill email
        await this.Email.waitFor({ state: 'visible', timeout: 5000 });
        await this.Email.fill(faker.internet.email());

        // Fill mobile number
        await this.mobileNumber.waitFor({ state: 'visible', timeout: 5000 });
        await this.mobileNumber.fill(faker.phone.number());

        // Open city dropdown and select city
        await this.citydropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.citydropdown.click();
        const riyadhOption = this.page.locator('span.dropdown-item', { hasText: /^Riyadh$/ });
        await riyadhOption.waitFor({ state: 'visible', timeout: 5000 });
        await riyadhOption.click();

        // Fill comments
        await this.commentsBox.waitFor({ state: 'visible', timeout: 5000 });
        await this.commentsBox.fill(faker.lorem.sentence());

        // Submit the form
        await this.submitbtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.submitbtn.click();
        await this.page.waitForLoadState('networkidle')

        Logger.success('Contact details form filled and submitted successfully.');
    }

    async SearchForFAQ() {
        await this.ensurePageIsScrolled();

        // Scroll down to reveal the FAQ link
        await this.page.mouse.wheel(0, 2000);

        // Use getByRole to locate and click the "FAQ's" link
        const FaqLink = this.page.locator('a[tabindex="2044"]', { hasText: "FAQ's" });
        await FaqLink.waitFor({ state: 'visible', timeout: 5000 });
        await expect(FaqLink).toBeVisible();
        await FaqLink.click();


        // Wait for the page to load
        await this.page.waitForLoadState('load');

        // Fill the search input and press Enter
        await this.faqSearch.fill('Can I test drive the car?');

        await this.faqSearch.press('Enter');
    }


    async validateAndClickCities() {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)

        const cities = [this.city1, this.city2, this.city3, this.city4, this.city5, this.city6];

        for (const city of cities) {
            await city.click();
            await this.page.waitForTimeout(2000);
        }

        await this.page.waitForLoadState('load');
        await this.seeAlllink.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('networkidle');

        await this.selectcity.click();
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('load');
    }

    async NewsLetter() {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)
        await expect(this.newsletter).toBeVisible()
        await this.newletterEmail.fill(faker.internet.email())
        await this.subscribebtn.click();
        await this.page.waitForTimeout(2000);
        console.log('subscribe to newsletter successfully')


    }

    async clickPrivacyPolicy() {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)
        await this.privacyPolicyLink.click();
        await this.page.waitForTimeout(4000)
    }

    async TermsAndConditions() {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)
        await this.termsAndConditionsLink.click();
        await this.page.waitForTimeout(4000);
    }

    async clickSalePurchasePolicy() {
        await this.ensurePageIsScrolled()
        await this.page.mouse.wheel(0, 2000)
        await this.salePurchasePolicyLink.click();

    }

    async clickRefundCancellationPolicy() {
        await this.ensurePageIsScrolled()
        await this.page.mouse.wheel(0, 2000)
        await this.refundCancellationPolicyLink.click();

    }

    async verifyPaymentIconsVisibility() {
        await this.page.mouse.wheel(0, 2000)
        await this.ensurePageIsScrolled()
        await this.page.waitForTimeout(300);
        await this.ensurePageIsScrolled();
        for (const icon of this.paymentIcons) {
            await icon.waitFor({ state: "visible" });
        }
    }

    async getCopyrightText(): Promise<string> {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)
        return await this.copyrightText.textContent() || '';
    }


    async clickAndValidateMenuItems() {
        await this.ensurePageIsScrolled();
        await this.page.mouse.wheel(0, 2000)
        await this.newCars.click();



    }
}
