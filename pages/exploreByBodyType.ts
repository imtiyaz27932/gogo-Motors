import { Page, Locator, expect } from '@playwright/test';
import { scrollSmoothly } from '../utils/scrollWheel';

export class ExploreByBodyTypePage {
    readonly page: Page;
    readonly section: Locator;
    readonly heading: Locator;
    readonly carBodyTypeElements: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.section = page.locator('.theme-v1');
        this.heading = page.locator('h2', { hasText: 'Explore by body type' });
        this.carBodyTypeElements = page.locator('div[class*="body-type"] a');
        this.nextButton = page.locator('#nextid');
        this.prevButton = page.locator('#previd');
    }


    private async ensurePageIsScrolled() {
        await scrollSmoothly(this.page, 2000, 1900, 500);
    }


    async verifySectionVisibility() {
        await this.ensurePageIsScrolled()
        const section = this.page.locator('section.theme-v1:has-text("Explore by body type")');
        await expect(section).toBeVisible();
    }

    async getCarBodyTypeCount(): Promise<number> {
        await this.ensurePageIsScrolled();
        return await this.carBodyTypeElements.count();
    }

    // Click each car body type, go back, and continue
    async clickEachCarBodyType() {
        await this.ensurePageIsScrolled();
        const count = await this.getCarBodyTypeCount();
        console.log(`Total Car Body Types: ${count}`);

        for (let i = 0; i < count; i++) {
            console.log(`Clicking on car type ${i + 1}`);
            await this.carBodyTypeElements.nth(i).click();


            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);

            // Go back to the previous page
            await this.page.goBack();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);

            // Ensure page is scrolled back
            await this.ensurePageIsScrolled();
        }
    }



    async validateSwiperNavigation() {
        await this.ensurePageIsScrolled();
        const sectionLocator = this.page.locator('section').filter({ hasText: 'Explore by body' });

        const nextButton = sectionLocator.getByLabel('swiperpnext');
        const prevButton = sectionLocator.getByLabel('swiperpprev');

        if (await nextButton.isVisible() && !(await nextButton.isDisabled())) {
            for (let i = 0; i < 2; i++) {
                await nextButton.click();
                await this.page.waitForTimeout(1000);
            }
        } else {
            console.warn('Next button is not available or is disabled.');
        }


        if (await prevButton.isVisible() && !(await prevButton.isDisabled())) {
            await prevButton.click();
            await this.page.waitForTimeout(1000);
        } else {
            console.warn('Previous button is not available or is disabled.');
        }
    }


}
