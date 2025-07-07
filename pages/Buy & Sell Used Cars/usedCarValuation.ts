
import { Page, expect } from "@playwright/test";
import { Logger } from "../../utils/logger";
import path from "path";
import { selectCarDetails } from '../../utils/carSelectionHelper';

export class CarValuation {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private usedCarTab = () => this.page.getByRole('navigation').getByText('Buy & Sell Used Cars');
    private carValuation = () => this.page.getByRole('link', { name: 'Used car valuation Find your' });
    private ownership = () => this.page.getByRole('listitem').filter({ hasText: '1st Owner' });
    private kmsdriven = () => this.page.getByRole('textbox', { name: 'For eg.' });
    private expectedPrice = () => this.page.locator('input[name="expected_price"]');
    private closemodal = () => this.page.locator('#Icon_material-close');


    private Buttons = (buttonName: string | RegExp) => this.page.getByRole('button', { name: buttonName, exact: true });

    // Reusable image input locator by label
    private imageUploadByLabel = (label: string, nthIndex = 0) => this.page.locator('div').filter({ hasText: new RegExp(`^${label}$`) }).nth(nthIndex).locator('input[type="file"]');

    // Helper to get image path
    private testImagePath(fileName: string): string {
        return path.resolve(__dirname, `../../${fileName}`);
    }

    private carResaleHeading = () => this.page.locator('h1', { hasText: 'Find your car resale value instantly', });
    private valuationSubHeading = () => this.page.locator('h2', { hasText: 'Get your car valuation now | Instant used car pricing in Saudi Arabia - GoGo Motor', });

    private seeMoreParagraph = () => this.page.locator('#see-more');
    private seeMoreToggle = () => this.page.locator('#see-more span[role="button"]', { hasText: 'see more' });

    private sectionTitle = () => this.page.locator('h3', { hasText: 'Why choose GoGo Motor for your car valuation?', });
    private swiperCards = () => this.page.locator('.swiper-slide, .gogo-motor-scroll-move > div');
    private cardTitles = () => this.swiperCards().locator('h3');
    private cardDescription = () => this.swiperCards().locator('p');

    private section2Title = () => this.page.locator('h3', { hasText: 'Get your car valuation in 3 easy steps', });
    private stepTitle = () => this.page.locator('div.flex.flex-col.items-start h3');
    private stepDescriptions = () => this.page.locator('div.flex.flex-col.items-start p');

    private Title = () => this.page.locator('h3', { hasText: 'Sell smarter with instant car valuation!' });
    private ctaButton = () => this.page.getByRole('button', { name: 'Check Your Car’s Worth Now!' });
    private brandItems = () => this.page.locator('div.flex.flex-col.justify-center.cursor-pointer');

    private boostButton = ()=> this.page.getByRole('button', { name: /Boost listing for.*399/i });








    // Actions
    async hoverOnUsedCarsTab() {
        Logger.info('Hovering over the "Buy & Sell Used Cars" tab...');
        const tab = this.usedCarTab();
        await tab.waitFor({ state: 'visible', timeout: 15000 });
        await expect(tab).toBeVisible();
        await tab.hover();
        Logger.success('Hovered on "Buy & Sell Used Cars" tab successfully.');
    }

    async clickonCarValuationTab() {
        Logger.info('Clicking on the car valuation link');
        const carvaluation = this.carValuation();
        await carvaluation.waitFor({ state: 'visible', timeout: 5000 });
        await expect(carvaluation).toBeVisible();
        await carvaluation.click();
        await this.page.waitForURL('https://uat.gogomotor.com/en/car-valuation', { timeout: 10000 });
        await expect(this.page).toHaveURL('https://uat.gogomotor.com/en/car-valuation');
        Logger.success('Navigated to Car Valuation page.');
        await this.page.waitForTimeout(4000);
    }

    async clickGetFreeValuation() {
        Logger.info('Clicking "Get free valuation" button');
        const btn = this.Buttons('Get free valuation');
        await expect(btn).toBeVisible();
        await btn.click();
        Logger.success('Clicked Get free valuation button.');
        await this.page.waitForTimeout(4000);
    }

    async selectCarDetailsViaHelper(options = {}) {
        await selectCarDetails(this.page, options);
    }

    async selectOwnership() {
        Logger.info('Selecting ownership');
        const clickownership = this.ownership();
        await clickownership.waitFor({ state: 'visible', timeout: 5000 });
        await expect(clickownership).toBeVisible();
        await clickownership.click();
        Logger.success('Ownership selected.');
        await this.page.waitForTimeout(4000);
    }

    async enterKmsDriven() {
        Logger.info('Entering KMs driven');
        const kms = this.kmsdriven();
        await kms.waitFor({ state: 'visible', timeout: 4000 });
        await expect(kms).toBeVisible();
        await kms.fill('4000');
        Logger.success('KMs entered.');
        await this.page.waitForTimeout(4000);
    }

    async clickonContiueBtn() {
        Logger.info('Clicking Continue');
        const btn = this.Buttons('Continue').first()
        await expect(btn).toBeVisible();
        await btn.click();
        Logger.success('Clicked Continue button.');
        await this.page.waitForTimeout(4000);
    }

    async clickOnListCarButton() {
        Logger.info('Clicking List My Car');
        const btn = this.Buttons('List my car');
        await expect(btn).toBeVisible();
        await btn.click();
        Logger.success('Clicked List My Car.');
        await this.page.waitForTimeout(4000);
    }

    async uploadCarImages() {
        Logger.info("Uploading car images...");

        await this.imageUploadByLabel("Cover image").setInputFiles(this.testImagePath("carimage.jpg"));
        Logger.success("Cover image uploaded.");

        await this.imageUploadByLabel("Right Side", 2).setInputFiles(this.testImagePath("carimage.jpg"));
        Logger.success("Right side image uploaded.");

        await this.imageUploadByLabel("Left Side", 2).setInputFiles(this.testImagePath("carimage.jpg"));
        Logger.success("Left side image uploaded.");

        await this.imageUploadByLabel("Front View", 2).setInputFiles(this.testImagePath("carimage.jpg"));
        Logger.success("Front view image uploaded.");

        await this.imageUploadByLabel("Rear View", 2).setInputFiles(this.testImagePath("carimage.jpg"));
        Logger.success("Rear view image uploaded.");

        await this.page.waitForTimeout(2000);
    }

    async enterExpectedPrice() {
        Logger.info('Entering the expected price');
        const price = this.expectedPrice();
        await price.waitFor({ state: 'visible', timeout: 6000 });
        await expect(price).toBeVisible();
        await price.fill('50000');
        Logger.success('Expected price entered.');
        await this.page.waitForTimeout(2000);
    }

    async clickSubmit() {
        Logger.info('Clicking Submit button');
        const btn = this.Buttons('Submit');
        await expect(btn).toBeVisible();
        await btn.click();
        Logger.success('Clicked Submit.');
        await this.page.waitForTimeout(4000);
    }

    async closeModal() {
        Logger.info('Closing the Modal');
        const close = this.closemodal();
        await close.waitFor({ state: 'visible', timeout: 4000 });
        await expect(close).toBeVisible();
        await close.click();
        Logger.success('Modal closed successfully.');
        await this.page.waitForTimeout(3000);
        await expect(this.page).toHaveURL('https://uat.gogomotor.com/en/sell-my-car')
    }


    async clickonBoostListing() {
        Logger.info('clicking on boost Listing');
        const book = this.Buttons(/Boost listing for.*399/i )
        await book.scrollIntoViewIfNeeded();
        await book.waitFor({ state: 'visible', timeout: 15000 });
        await expect(book).toBeVisible();
        await book.click();
        await this.page.waitForTimeout(4000);
        Logger.info('book listing clicked')
    }

    async clickonPayNowButton() {
        Logger.info('Clicking on Paynow Button');
        const Paynow = this.Buttons('Pay Now');
        await Paynow.scrollIntoViewIfNeeded();
        await Paynow.waitFor({ state: 'visible', timeout: 15000 });
        await expect(Paynow).toBeVisible();
        await Paynow.click();
        await this.page.waitForTimeout(4000);
        Logger.info('Paynow button clicked')
    }

    async validateCarResaleHeading() {
        Logger.info('Validating car resale value heading...');
        const heading = this.carResaleHeading();
        await heading.waitFor({ state: 'visible', timeout: 5000 });
        await expect(heading).toBeVisible();
        await expect(heading).toHaveText('Find your car resale value instantly');
        Logger.success('Car resale value heading validated successfully.');
    }

    async validateValuationSubSection() {
        Logger.info('Validating valuation sub-heading and paragraph content...');

        const heading = this.valuationSubHeading();
        const paragraph = this.seeMoreParagraph();
        const seeMoreButton = this.seeMoreToggle();

        await heading.waitFor({ state: 'visible', timeout: 5000 });
        await expect(heading).toBeVisible();
        await expect(heading).toHaveText(
            'Get your car valuation now | Instant used car pricing in Saudi Arabia - GoGo Motor'
        );

        await paragraph.waitFor({ state: 'visible', timeout: 5000 });
        await expect(paragraph).toContainText('Find out your car’s true resale value instantly');

        await expect(seeMoreButton).toBeVisible();
        await expect(seeMoreButton).toHaveText('see more');

        Logger.success('Valuation sub-heading and paragraph validated successfully.');
    }

    async clickSeeMoreAndValidate() {
        Logger.info('Clicking on "see more"...');
        await this.seeMoreToggle().click();

        const expandedText = 'with GoGo Motor and discover the fair market price in Saudi Arabia. Fast, accurate, and hassle-free.';
        await expect(this.seeMoreParagraph()).toContainText(expandedText);
        Logger.success('"See more" expansion validated successfully.');
    }



    async validateWhyChooseSection() {
        Logger.info('🔍 Validating section title...');
        await expect(this.sectionTitle()).toBeVisible();
        Logger.info('✅ Section title is visible.');

        const nextArrow = this.page.getByRole('button', { name: 'swiper-next' });
        const prevArrow = this.page.getByRole('button', { name: 'swiper-prev' });


        for (let i = 0; i < 2; i++) {
            Logger.info(`🔁 Trying to click swiper-next button (${i + 1}/2)...`);
            if (await nextArrow.isEnabled()) {
                await nextArrow.click();
                Logger.info(`✅ Clicked swiper-next (${i + 1}/2)`);
                await this.page.waitForTimeout(500);
            } else {
                Logger.warn(`⚠️ swiper-next is disabled on attempt ${i + 1}. Skipping click.`);
                break;
            }
        }

        // 👉 Then go back 2 times, if prev is enabled
        for (let i = 0; i < 2; i++) {
            Logger.info(`🔁 Trying to click swiper-prev button (${i + 1}/2)...`);
            if (await prevArrow.isEnabled()) {
                await prevArrow.click();
                Logger.info(`✅ Clicked swiper-prev (${i + 1}/2)`);
                await this.page.waitForTimeout(500);
            } else {
                Logger.warn(`⚠️ swiper-prev is disabled on attempt ${i + 1}. Skipping click.`);
                break;
            }
        }


    }


    async validateCarValuationStepsSection() {
        Logger.info('🔍 Validating "Get your car valuation in 3 easy steps" section title...');
        await expect(this.section2Title()).toBeVisible();
        Logger.success('✅ Section title is visible.');

        const expectedSteps = [
            {
                title: 'Enter car details & condition',
                description: 'Select your car make, model, year, mileage, and condition',
            },
            {
                title: 'Get instant valuation',
                description: 'AI powered system provides a fair market price based on real-time data.',
            },
            {
                title: 'Sell at the best price',
                description: 'Use your valuation to negotiate or list your car instantly on our platform',
            },
        ];

        for (let i = 0; i < expectedSteps.length; i++) {
            Logger.info(`🔍 Validating Step ${i + 1}...`);

            const title = await this.stepTitle().nth(i).textContent();
            const description = await this.stepDescriptions().nth(i).textContent();

            expect(title?.trim()).toBe(expectedSteps[i].title);
            expect(description?.trim()).toBe(expectedSteps[i].description);

            Logger.success(`✅ Step ${i + 1} - Title: "${title?.trim()}"`);
            Logger.success(`✅ Step ${i + 1} - Description: "${description?.trim()}"`);
        }
    }
    async validateInstantValuationSection() {
        Logger.info('🔍 Validating Instant Valuation Section heading...');
        await expect(this.Title()).toBeVisible();
        const headingText = await this.Title().textContent();
        Logger.success(`✅ Heading found: "${headingText?.trim()}"`);

        Logger.info('🔍 Validating CTA button...');
        const ctaBtn = this.ctaButton();
        await expect(ctaBtn).toBeVisible();
        await expect(ctaBtn).toBeEnabled();
        Logger.success('✅ CTA button "Check Your Car’s Worth Now!" is visible and clickable.');

        await ctaBtn.click();
        Logger.success('✅ CTA button clicked successfully.');
    }
    

    async validateCarBrandLogosAndNames(expectedBrands: string[]) {
        Logger.info('🔍 Validating car brand grid...');

        const count = await this.brandItems().count();
        expect(count).toBe(expectedBrands.length);
        Logger.success(`✅ Found ${count} brand blocks.`);

        for (let i = 0; i < count; i++) {
            const brandBlock = this.brandItems().nth(i);
            const brandName = await brandBlock.locator('p').textContent();
            const logo = await brandBlock.locator('img');
            const logoSrc = await logo.getAttribute('src');

            expect(brandName?.trim()).toBe(expectedBrands[i]);
            expect(logoSrc).not.toBeNull();

            Logger.success(`✅ Brand ${i + 1}: ${brandName?.trim()} with logo verified.`);
        }
    }
}


