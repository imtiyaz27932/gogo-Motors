import { expect, Page } from "@playwright/test";
import { Logger } from "../../utils/logger";
import { he } from "@faker-js/faker";



export class SellMyCar {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        
    }

    // Sell My Car Locators
    private sellHeading = () => this.page.getByRole('heading', { name: 'Sell Your Used Car in Saudi Arabia' });
    private sellMyCarlink = () => this.page.getByRole('link', { name: 'Sell My Car Sell your car' })
    private viewallBrandsLink = () => this.page.getByRole('button', { name: 'View all brands' })
   

    



    // Actions

    async validateHeading() {
        Logger.info('Validating the Heading of the Page');
        const heading = this.sellHeading();
        await heading.waitFor({ state: 'visible', timeout: 15000 });
        await expect(heading).toBeVisible();
        const headingText = (await heading.textContent())?.trim() || '';
        Logger.info(`Heading text found: "${headingText}"`);
        await expect(heading).toHaveText('Sell Your Used Car in Saudi Arabia');
        Logger.success('Heading validated successfully');
    }

    async ClickonSellMyCarLink() {
        Logger.info('Clicking on Sell my car link');
        const sellCar = this.sellMyCarlink();
        await sellCar.waitFor({ state: 'visible', timeout: 15000 });
        await expect(sellCar).toBeVisible();
        await sellCar.click();
        await this.page.waitForTimeout(4000)
        await expect(this.page).toHaveURL('https://uat.gogomotor.com/en/sell-my-car')
        Logger.info('Navigated to Sell My car page Successfully')
        
    }

    async clickonViewallBrandsLink() {
        Logger.info('clicking on view all Brands link in brand section');
        const brandslink = this.viewallBrandsLink();
        await brandslink.waitFor({ state: 'visible', timeout: 15000 });
        await expect(brandslink).toBeVisible();
        await brandslink.click();
        await this.page.waitForTimeout(5000);
        Logger.info('Link clicked and data fetched succesfully')
    }

    async validateHowItWorksSection() {
        Logger.info('🔍 Validating "How it works?" section...');

        const expectedSteps = [
            'Enter your vehicle details',
            'Enter additional vehicle information',
            'Upload images',
            'Confirm details'
        ];

        const steps = this.page.locator('div.flex.flex-col.items-center.gap-\\[20px\\]');

        const count = await steps.count();
        console.log(`➡️ Found ${count} step blocks`);
        expect(count).toBe(expectedSteps.length);

        for (let i = 0; i < expectedSteps.length; i++) {
            const label = await steps.nth(i).locator('span').nth(1).textContent();
            expect(label?.trim()).toBe(expectedSteps[i]);
            Logger.info(`✅ Step ${i + 1} validated: ${label?.trim()}`);
        }

        Logger.success('✅ "How it works?" section validated successfully.');
    }
    
    async validateCarBrandGrid() {
        const brandCards = this.page.locator('div.flex.flex-col.justify-center.cursor-pointer');
        const count = await brandCards.count();
        Logger.info(`✅ Found ${count} car brand cards.`);
        return count;
    }
}