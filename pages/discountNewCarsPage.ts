import { expect, Page, Locator } from "@playwright/test";
import { scrollSmoothly } from "../utils/scrollWheel";

export class DiscountNewCars {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Smooth scroll helper
    private async smoothScrollToElement(locator: Locator) {
        const elementHandle = await locator.elementHandle();
        if (elementHandle) {
            await this.page.evaluate((el) => {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, elementHandle);
            await this.page.waitForTimeout(500);
        }
    }

    // Selectors
    private headingText = () => this.page.getByRole('heading', { name: 'GoGo Motor exclusive services' });
    private cardsTitle = () => this.page.locator('.swiper-slide p.title');
    private banner = () => this.page.locator('.embla__slide > .absolute').first();
    private vinNumber = () => this.page.getByRole('textbox', { name: 'eg. "1HGBH41JXH1000000"' });
    private deliveryDate = () => this.page.locator('input[name="deliveryDate"]');
    private confirmbtn = () => this.page.getByRole('button', { name: 'Confirm' });
    private selectMakeDropdown = () => this.page.locator('div').filter({ hasText: /^Select MakeSelect$/ }).locator('div').nth(1);
    private manufacturerYearDropdown = () => this.page.locator('div').filter({ hasText: /^Manufacturing YearSelect$/ }).locator('div').nth(1);
    private selectModelDropdown = () => this.page.locator('div').filter({ hasText: /^Select ModelSelect$/ }).locator('div').nth(1);
    private trimDropdown = () => this.page.locator('div').filter({ hasText: /^TrimSelect$/ }).locator('div').nth(1);
    private phonenumberfield = () => this.page.getByRole('main').getByRole('textbox')
    private proceedbtn = () => this.page.getByRole('button', { name: 'Proceed' });
    private otpfield = () => this.page.locator('input[name="OTPNumber"]');
    private closenmodelicon = () => this.page.locator('#Icon_material-close');
    private discontinuebtn = () => this.page.getByRole('button', { name: 'Yes' });
    private faqheading = () => this.page.getByRole('heading', { name: 'Frequently Asked Questions' });
    private usedcartabbtn = () => this.page.getByRole('button', { name: 'Used', exact: true })
    private ownerId = () => this.page.locator('input[name="userId"]');
    private sequencenumber = () => this.page.locator('input[name="sequenceNo"]');
    private getDetails = () => this.page.getByRole('button', { name: 'Get detail' });


    private async ensurePageIsScrolled() {
            await scrollSmoothly(this.page, 2000, 600, 500);
        }

    // Methods
    async verifyDiscountCarsSectionVisible() {
        await this.ensurePageIsScrolled()
        await expect(this.headingText()).toBeVisible();
        await this.page.waitForLoadState('networkidle');
    }

    async clickFirstCardExploreButton() {
        await this.ensurePageIsScrolled()
        await this.page.waitForSelector('.swiper-slide');
        const exploreButton = this.page.locator('.swiper-slide.swiper-slide-active').getByRole('link', { name: 'Explore now' });
        await exploreButton.scrollIntoViewIfNeeded();
        await expect(exploreButton).toBeVisible();
        await exploreButton.click();
    }

    async checkEligibility() {
       await this.ensurePageIsScrolled()
        await this.banner().waitFor({ state: 'visible' });
        await this.page.waitForTimeout(500);
        await this.banner().hover();
        await this.page.waitForTimeout(300);
        await this.banner().click({ force: true });
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    async verifyCarForm() {
        await this.vinNumber().scrollIntoViewIfNeeded();
        await this.vinNumber().fill('LSJA36E32LZ02795f');

        await this.deliveryDate().scrollIntoViewIfNeeded();
        await this.deliveryDate().click();

        await this.page.waitForSelector('.rmdp-calendar');
        const today = new Date();
        const currentDay = today.getDate().toString();
        await this.page.locator('.rmdp-calendar').locator(`text="${currentDay}"`).click();
        await this.page.waitForTimeout(1000);

        await this.confirmbtn().scrollIntoViewIfNeeded();
        await this.confirmbtn().click();
    }

    async ConfirmCarDetails() {
        // Select Make
        await this.selectMakeDropdown().scrollIntoViewIfNeeded();
        await this.selectMakeDropdown().click();
        await this.page.locator('span.dropdown-item').filter({ hasText: /^NISSAN$/ }).click();
        await this.page.waitForTimeout(1000);

        // Select Manufacturing Year
        await this.manufacturerYearDropdown().scrollIntoViewIfNeeded();
        await this.manufacturerYearDropdown().click();
        await this.page.getByText('2025', { exact: true }).click();
        await this.page.waitForTimeout(1000);

        // Select Model
        await this.selectModelDropdown().scrollIntoViewIfNeeded();
        await this.selectModelDropdown().click();
        await this.page.getByText('PATROL', { exact: true }).click();
        await this.page.waitForTimeout(1000);

        // Select Trim
        await this.trimDropdown().scrollIntoViewIfNeeded();
        await this.trimDropdown().click();
        await this.page.getByText('XE', { exact: true }).click();
        await this.page.waitForTimeout(1000);

       // await this.confirmbtn().scrollIntoViewIfNeeded();
        await this.confirmbtn().click();
    }

    async fillPhoneDetails() {
        await this.phonenumberfield().scrollIntoViewIfNeeded();
        await this.phonenumberfield().fill('1234567890');
        await this.proceedbtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);

        await this.otpfield().scrollIntoViewIfNeeded();
        await this.otpfield().fill('1234');
        await this.confirmbtn().scrollIntoViewIfNeeded();
        await this.confirmbtn().click();
    }

    async usedCarsDiscount() {
        //await this.ensurePageIsScrolled();
        await this.usedcartabbtn().scrollIntoViewIfNeeded();
        await this.usedcartabbtn().click();
        await this.page.waitForLoadState('networkidle');

        await this.ownerId().scrollIntoViewIfNeeded();
        await this.ownerId().fill('7000102744');

        await this.sequencenumber().scrollIntoViewIfNeeded();
        await this.sequencenumber().fill('919654020');

        await this.getDetails().scrollIntoViewIfNeeded();
        await this.getDetails().click();
        await this.page.waitForTimeout(2000);
    }

    async closeModal() {
        await this.closenmodelicon().scrollIntoViewIfNeeded();
        await this.closenmodelicon().click();
        await this.page.waitForLoadState('networkidle');

        await this.discontinuebtn().scrollIntoViewIfNeeded();
        await this.discontinuebtn().click();
        await this.page.waitForTimeout(1000);
    }

    async previewFAQs() {
        await this.ensurePageIsScrolled()
        await this.smoothScrollToElement(this.faqheading());
        await expect(this.faqheading()).toBeVisible();

        const faqButtons = this.page.locator('div.border-b button');
        const count = await faqButtons.count();

        // Expand all FAQs with smooth scrolling
        for (let i = 0; i < count; i++) {
            const button = faqButtons.nth(i);
            await this.smoothScrollToElement(button);
            await button.click();
            await this.page.waitForTimeout(300);
        }

        await this.page.waitForTimeout(1000);

        // Collapse all FAQs
        for (let i = 0; i < count; i++) {
            const button = faqButtons.nth(i);
            await this.smoothScrollToElement(button);
            await button.click();
            await this.page.waitForTimeout(300);
        }
    }
}
