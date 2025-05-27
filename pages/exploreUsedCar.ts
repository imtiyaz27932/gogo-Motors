import { Page, Locator, expect } from '@playwright/test';
import { scrollSmoothly } from '../utils/scrollWheel';


export class LocationPage {
    readonly page: Page;
    readonly locationSection: Locator;
    readonly sectionTitle: Locator;
    readonly cityLinks: Locator;
    readonly veiwCityLink: Locator;
    readonly clickOnCity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.locationSection = page.locator('.gogo-container.mobile-container');
        this.sectionTitle = page.locator('h2', { hasText: 'Explore used car by location' });
        this.cityLinks = page.locator('.grid.grid-cols-3 a');
        this.veiwCityLink = page.getByText('View all cities');
        this.clickOnCity= page.getByRole('img', { name: 'Riyadh', exact: true })
    }

    private async ensurePageIsScrolled() {
        await scrollSmoothly(this.page, 2000, 1900, 500);
    }
    

    async validateSection() {
        await this.ensurePageIsScrolled()
        await expect(this.sectionTitle).toBeVisible();
        const cityCount = await this.cityLinks.count();
        console.log(`Found ${cityCount} cities`);
        expect(cityCount).toBeGreaterThan(0);
    }

    async clickRandomCity() {
        await this.ensurePageIsScrolled()
        const cityCount = await this.cityLinks.count();
        const randomIndex = Math.floor(Math.random() * cityCount);
        console.log(`Clicking city at index: ${randomIndex}`);
        
        await this.cityLinks.nth(randomIndex).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async loopThroughAllCities() {
        await this.ensurePageIsScrolled()
        const cityCount = await this.cityLinks.count();

        for (let i = 0; i < cityCount; i++) {
            console.log(`Clicking city ${i + 1} of ${cityCount}`);
            await this.cityLinks.nth(i).click();
            await this.page.waitForTimeout(100)
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(3000);
            
            await this.page.goBack();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
        }
    }
    async verifyAllCityLink() {
        await this.ensurePageIsScrolled();
        await this.veiwCityLink.click()
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        await this.clickOnCity.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000)

        
        }
    }

