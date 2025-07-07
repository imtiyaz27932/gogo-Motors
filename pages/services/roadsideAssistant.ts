import { Page, expect, Locator } from "@playwright/test";
import vinDetails from '../../testData/vinDetails.json'
import { Logger } from "../../utils/logger";
import { CardUtils } from "../../utils/cardDetails";
import emailDetails from '../../testData/emailDetails.json';

export class RoadsideAssistantPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }



    //Heading Locators
    private heading = () => this.page.getByRole('heading', {
        name: /One Call, Zero Stress\s+Roadside Assistance/i,
    })
    private priceInfo = () => this.page.locator('p', { hasText: 'Starting from just' });
    private image = () => this.page.locator('img[alt="roadside assistance"]');
    private titleHeading = () => this.page.locator('h1', { hasText: 'One Call, Zero Stress' });


    // Locators
    private clickonRsa = () => this.page.locator('div').filter({ hasText: /^Roadside Assistance$/ })
    private vinInput = () => this.page.getByPlaceholder('Enter VIN Number').nth(1);
    private buyCoverageButton = () => this.page.locator('button:has-text("Buy Coverage"):not([disabled])');
    private payNowButton = () => this.page.getByRole('button', { name: 'Pay Now' })


    // service cards
    private serviceCards = () => this.page.locator('div.flex.gap-x-\\[12px\\]');
    private serviceTitles = () => this.page.locator('div.flex.gap-x-\\[12px\\] > div > p:first-child');
    private serviceDescriptions = () => this.page.locator('div.flex.gap-x-\\[12px\\] > div > p:nth-child(2)');

    // top features cards
    private topFeaturesTitle = () => this.page.locator('text=Top Features');
    private topFeaturesSubtitle = () => this.page.locator('text=Unlimited services during membership');
    private featureCards = () => this.page.locator('.swiper-slide');

    // exclusion locators
    private exclusionSection = () => this.page.locator('div.sm\\:px-\\[30px\\]');
    private exclusionItems = () => this.page.locator('div.flex.mt-\\[8px\\].items-center p');


    // Section title
    getThreeStepsTitle(): Locator {
        return this.page.locator('h2', {
            hasText: 'Get roadside assistance in 3 easy steps',
        });
    }

    // Step titles: "Enter car details", "Make payment", "Get assistance"
    getStepTitles(): Locator {
        return this.page.locator('h3.font-semibold');
    }

    // Step descriptions
    getStepDescriptions(): Locator {
        return this.page.locator('h3.font-semibold + p');
    }





    //Methods


    async clickonRoadsideAssistantlink() {
        Logger.info('Clicking on Roadside Assistance link');
        await this.clickonRsa().waitFor({ state: 'visible' });
        expect(this.clickonRsa()).toBeVisible({ timeout: 10000 });
        await this.clickonRsa().click();
        await this.page.waitForTimeout(3000)
        Logger.info('Waiting for Roadside Assistance page to load');
        await expect(this.page).toHaveURL('https://uat.gogomotor.com/en/roadside-assistance', { timeout: 10000 });
        Logger.success('URL verified successfully');

        Logger.info('Validating hero title is visible');
        await expect(this.titleHeading()).toBeVisible();
        Logger.success('Hero title is visible');

    }




    async validateHeroSection() {
        Logger.info('Validating heading');
        await expect(this.heading()).toBeVisible();

        Logger.info('Validating pricing information');
        await expect(this.priceInfo()).toBeVisible();
        await expect(this.priceInfo()).toContainText('99.00/year');

        Logger.info('Validating roadside assistance image');
        await expect(this.image()).toBeVisible();
    }



    async enterVINDetails() {
        Logger.info('Entering VIN details')
        await this.page.waitForTimeout(3000)
        expect(this.vinInput()).toBeVisible({ timeout: 10000 });
        await this.vinInput().click()
        await this.vinInput().fill(vinDetails.VIN);
        await this.page.waitForTimeout(3000)

    }

    async clickBuyCovergatebutton() {
        await this.buyCoverageButton().waitFor({ state: 'visible' });
        expect(this.buyCoverageButton()).toBeVisible({ timeout: 10000 });
        await this.buyCoverageButton().click();
    }

    async selectCarBrand() {
        Logger.info('Selecting car Brand');
        await this.page.getByRole('img', { name: 'TOYOTA' }).click();
        await this.page.waitForTimeout(4000)
    }

    async selectcarYear() {
        Logger.info('Selecting car year');
        await this.page.getByRole('listitem').filter({ hasText: '2025' }).click();
        await this.page.waitForTimeout(3000)
    }

    async selectCar() {
        Logger.info('Selecting car');
        await this.page.getByText('Camry').click();
        await this.page.waitForTimeout(3000)
    }

    async clickPayNowButton() {
        Logger.info('Clicking Pay Now button');
        await this.payNowButton().waitFor({ state: 'visible' });
        expect(this.payNowButton()).toBeVisible({ timeout: 10000 });
        await this.payNowButton().click();
        await this.page.waitForTimeout(3000);
    }


    async enterCardDetails() {
        Logger.info('Entering card details');
        const cardUtils = new CardUtils(this.page);
        await this.page.waitForTimeout(5000);

        await cardUtils.fillTestCardDetails();
        await this.page.mouse.wheel(0, 500);
        await this.page.waitForTimeout(4000);
        await this.page.getByRole('button', { name: 'Pay Now' }).scrollIntoViewIfNeeded();
        await expect(this.page.getByRole('button', { name: 'Pay Now' })).toBeVisible({ timeout: 10000 });
        await this.page.getByRole('button', { name: 'Pay Now' }).click()
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Pay Now' }).click()
        await this.page.waitForTimeout(5000);

        await this.page.locator('a:has-text("Complete Now ->")').click();
        await this.page.waitForTimeout(4000);
        await this.page.waitForLoadState('load')
        await this.page.getByRole('textbox', { name: 'Enter store password' }).fill(emailDetails.storePassword);
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('button', { name: 'Enter' }).click();
        await this.page.waitForTimeout(10000)
    
        Logger.success('Roadside Assistance purchased successfully');
    }

    async validateServiceCards(expectedCards: { title: string; description: string }[]) {
        Logger.info(`Validating ${expectedCards.length} roadside service cards...`);
        const cardCount = await this.serviceCards().count();
        expect(cardCount).toBe(expectedCards.length);

        for (let i = 0; i < expectedCards.length; i++) {
            const title = await this.serviceTitles().nth(i).textContent();
            const description = await this.serviceDescriptions().nth(i).textContent();

            Logger.info(`Validating card ${i + 1}: "${title?.trim()}"`);
            expect(title?.trim()).toBe(expectedCards[i].title);
            expect(description?.trim()).toContain(expectedCards[i].description);
        }
    }

    async validateTopFeaturesSection() {
        Logger.info('Validating "Top Features" title');
        await expect(this.topFeaturesTitle()).toBeVisible();

        Logger.info('Validating subtitle under "Top Features"');
        await expect(this.topFeaturesSubtitle()).toBeVisible();

        Logger.info('Validating total number of top feature cards');
        await expect(this.featureCards()).toHaveCount(4);

        const expectedCards = [
            {
                title: 'Quick response',
                description: '24/7 dispatch & service coverage',
            },
            {
                title: 'Affordable pricing',
                description: 'To suit every driver’s need',
            },
            {
                title: 'Wide availability',
                description: 'Across GCC countries, Lebanon, Jordan, Syria, Egypt and Turkey',
            },
            {
                title: 'Availability 24/7',
                description: 'Anytime anywhere in Saudi Arabia',
            },
        ];

        for (let i = 0; i < expectedCards.length; i++) {
            const card = this.featureCards().nth(i);
            Logger.info(`Validating card ${i + 1}: "${expectedCards[i].title}"`);

            await expect(card.locator('h3')).toHaveText(expectedCards[i].title);
            await expect(card.locator('p')).toHaveText(expectedCards[i].description);
        }
    }


    async waitForSectionVisible() {
        Logger.info('Waiting for exclusion section to be visible');
        await this.exclusionSection().first().waitFor({ state: 'visible' });
    }

    async getExclusionItemsCount(): Promise<number> {
        Logger.info('Getting exclusion items count');
        return await this.exclusionItems().count();
    }

    async getExclusionTexts(): Promise<string[]> {
        Logger.info('Getting exclusion items text');
        const count = await this.getExclusionItemsCount();
        const texts: string[] = [];
        for (let i = 0; i < count; i++) {
            texts.push(await this.exclusionItems().nth(i).textContent() ?? '');
        }
        return texts.map(t => t.trim());
    }


    async validateThreeStepSection() {
        Logger.info('Validating "Get roadside assistance in 3 easy steps" section');

        await this.getThreeStepsTitle().waitFor({ state: 'visible' });
        const title = await this.getThreeStepsTitle().textContent();
        Logger.info(`Section title found: ${title}`);
    }

    async getStepTitleTexts(): Promise<string[]> {
        return await this.getStepTitles().allTextContents();
    }

    async getStepDescriptionTexts(): Promise<string[]> {
        return await this.getStepDescriptions().allTextContents();
    }
}


