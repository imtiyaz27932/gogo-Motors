import { Page, Locator, expect } from "@playwright/test";
import { scrollSmoothly } from "../utils/scrollWheel";
import { slowScrollDown } from "../utils/scroll";
import { faker } from "@faker-js/faker";
import { ExploreMenuItems,SubMenuItems }  from "../utils/exploreConstants";

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
        this.contactNumber = this.page.locator("footer a[href^='tel:']").first();
        this.email = this.page.locator("footer a[href^='mailto:']").first();
        this.downloadAppLink = this.page.getByText('Download GoGo Motor App').nth(1)
        this.googlePlayLink = this.page.getByRole('link', { name: 'GoGo Motor App on Google Play' }).first()
        this.appStoreLink = this.page.getByRole('link', { name: 'GoGo Motor App on the Apple' })
        this.appGalleryLink = this.page.getByRole('link', { name: 'GoGo Motor App on Google Play' }).nth(1)
        this.aboutUsLink = page.locator("footer a[href='/en/info/about-us']");
        this.contactUsLink = page.locator("footer a[href='/en/info/contact-us']");
        this.faqLink = page.getByRole('link', { name: 'FAQs' })
        this.name = page.locator('input[name="firstName"]')
        this.Email = page.getByRole('main').locator('input[name="email"]')
        this.mobileNumber = page.locator('div').filter({ hasText: /^Mobile Number\*$/ }).getByRole('textbox')
        this.citydropdown = page.locator('div').filter({ hasText: /^Select$/ }).nth(1)
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
        this.buyandsellusedcars =  page.getByText('Buy & Sell Used Cars', { exact: true }).nth(0)
        


        

    }

    private async ensurePageIsScrolled() {
        await scrollSmoothly(this.page, 2000, 2200, 700);
    }


    async verifyLogoVisibility() {
        await this.ensurePageIsScrolled();
        await this.footerLogo.waitFor();
        return this.footerLogo.isVisible();
    }

    async verifySocialLinks() {
        await this.ensurePageIsScrolled();
        for (const link of this.socialLinks) {
            const isVisible = await link.isVisible();
            console.log(`Checking: ${await link.getAttribute("href")} - Visible: ${isVisible}`);
            if (!isVisible) return false;
        }
        return true;
    }

    async verifyContactDetails() {
        await this.ensurePageIsScrolled()
        return (await this.contactNumber.isVisible()) && (await this.email.isVisible());
    }
    async verifyAppLinks() {
        await this.ensurePageIsScrolled();
        await expect(this.downloadAppLink).toBeVisible()
        await expect(this.googlePlayLink).toBeVisible();
        await expect(this.appStoreLink).toBeVisible();
        await expect(this.appGalleryLink).toBeVisible();



    }
    async validateAndClickFooterLinks() {
        await this.ensurePageIsScrolled();

        const links = [
            { name: "About Us", locator: this.aboutUsLink },
            { name: "Contact Us", locator: this.contactUsLink }
        ];

        for (const link of links) {
            console.log(`Navigating to ${link.name} link...`);

            await expect(link.locator).toBeVisible();
            await link.locator.click();
            await this.page.waitForLoadState("load");
            console.log(`${link.name} page opened successfully!`);
            await this.page.waitForTimeout(3000);
            await this.page.goBack();
            await this.page.waitForTimeout(2000);
            await this.faqLink.click();
            await this.page.waitForTimeout(2000)
        }

    }
    async fillContactDeatils() {
        await this.ensurePageIsScrolled()
        await this.contactUsLink.click()
        await this.page.waitForLoadState('load')
        await this.name.fill(faker.person.firstName());
        await this.Email.fill(faker.internet.email());
        await this.mobileNumber.fill(faker.phone.number());
        await this.citydropdown.click();
        this.page.getByRole('main').getByText('Riyadh', { exact: true }).click()
        await this.page.waitForTimeout(1000)
        await this.commentsBox.fill(faker.lorem.sentence());
        //await this.submitbtn.click();
        await this.cancelbtn.click();


    }

    async SearchForFAQ() {
        await this.ensurePageIsScrolled();
        await this.faqLink.click();
        await this.page.waitForLoadState('load')
        await this.faqSearch.fill('What is GoGo ProShield?');
        await this.faqSearch.press('Enter');

    }

    async validateAndClickCities() {
        await this.ensurePageIsScrolled();

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
        await expect(this.newsletter).toBeVisible()
        await this.page.waitForLoadState('networkidle');
        await this.newletterEmail.fill(faker.internet.email())
        await this.subscribebtn.click();
        await this.page.waitForTimeout(2000);
        console.log('subscribe to newsletter successfully')

        
    }

    async clickPrivacyPolicy() {
        await this.ensurePageIsScrolled();
        await this.privacyPolicyLink.click();
        await this.page.waitForLoadState('networkidle');
    }
    
    async TermsAndConditions() {
        await this.ensurePageIsScrolled();
        await this.termsAndConditionsLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickSalePurchasePolicy() {
        await this.ensurePageIsScrolled()
        await this.salePurchasePolicyLink.click();
      
    }
    
    async clickRefundCancellationPolicy() {
        await this.ensurePageIsScrolled()
        await this.refundCancellationPolicyLink.click();
       
    }
    
    async verifyPaymentIconsVisibility() {
        await this.ensurePageIsScrolled()
        await this.page.waitForTimeout(300);
        await this.ensurePageIsScrolled();
        for (const icon of this.paymentIcons) {
            await icon.waitFor({ state: "visible" });
        }
    }

    async getCopyrightText(): Promise<string> {
        await this.ensurePageIsScrolled();
        return await this.copyrightText.textContent() || '';
    }

   
    async clickAndValidateMenuItems() {
        await this.ensurePageIsScrolled();
        await this.newCars.click();

        

    }
}
