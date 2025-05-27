import { Page, expect } from "@playwright/test"; import { privateDecrypt } from "crypto";
import { Logger } from "../../utils/logger";
import { expectVisible } from "../../utils/visibilityChecks";

export class UpComingCars {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }


    // Locator for Upcoming Cars Link
    private upComingCarsLink = () => this.page.locator('div').filter({ hasText: /^Upcoming Cars$/ });

    // Loctors for Banner Section
    private heroImage = () => this.page.locator('//img[@alt="Next-Gen Car Innovations Unveiled"]');
    private heroText = () => this.page.locator('//*[normalize-space(text())="Next-Gen Car Innovations Unveiled"]');


    // Locator for upcoming cars by budget section 
    // --- Locators for "Upcoming Cars by Budget" section ---
    private upcomingCarsByBudgetSection = () => this.page.locator('section', { hasText: 'Upcoming cars by budget' });
    private upcomingCarsByBudgetHeading = () => this.upcomingCarsByBudgetSection().locator('h2', { hasText: 'Upcoming cars by budget' });
    private budgetCards = () => this.upcomingCarsByBudgetSection().locator('a[href*="/en/new-cars/sar-"]');
    private budgetCardByLabel = (label: string) => this.budgetCards().filter({ hasText: label });
    private viewMoreButton = () => this.upcomingCarsByBudgetSection().locator('button', { hasText: 'View More' });

    // Locators for upconing cars by brand section 
    // --- Upcoming Cars by Brand Section ---
    private upcomingCarsByBrandSection = () => this.page.locator('section', { hasText: 'Upcoming cars by Brand' });
    private upcomingCarsByBrandHeading = () => this.upcomingCarsByBrandSection().locator('h2', { hasText: 'Upcoming cars by Brand' });
    private brandCards = () => this.upcomingCarsByBrandSection().locator('a[href*="/en/new-cars/"][href*="/upcoming"]');
    private brandCardByAlt = (alt: string) => this.brandCards().filter({ has: this.page.locator(`img[alt="${alt}"]`) });
    private viewAllBrandsLink = () => this.upcomingCarsByBrandSection().locator('span', { hasText: 'View all brands' });


    // Locators for upcoing cars by Body Type section 
    private section = () => this.page.locator('div', { hasText: 'Upcoming cars by body type' }).first();
    private title = () => this.section().locator('h2').first()
    private cards = () => this.section().locator('a');

    // Locators for latest cars section 
    sectionTitle() {return this.page.getByRole('heading', { name: 'Latest Cars', level: 2 });
    }
    private carCards = () => this.page.locator('.swiper-slide');



    




    // Method to click on Upcoming Cars Link
    async clickUpComingCarsLink() {
        Logger.info('clicking on Upcoming cars link...')
        await this.upComingCarsLink().click();
        await this.page.waitForTimeout(2000)
        Logger.info('Clciked on upcoming cars link')

    }

    async validateHeroImageAndText() {
        Logger.info('Validating presence of hero image...');
        await this.heroImage().waitFor({ state: 'visible' });
        const isImageVisible = await this.heroImage().isVisible();
        Logger.info(`Hero image visible: ${isImageVisible}`);

        Logger.info('Validating presence of hero text...');
        await this.heroText().waitFor({ state: 'visible' });
        const isTextVisible = await this.heroText().isVisible();
        Logger.info(`Hero text visible: ${isTextVisible}`);

        return isImageVisible && isTextVisible;
    }

    // In upComingCars.ts

    async verifyParagraphCollapsed() {
        Logger.info('Verifying the paragraph in collapsed state (Upcoming Cars)...');
        const paragraph = this.page.locator('#see-more');
        await paragraph.waitFor({ state: 'visible', timeout: 5000 });
        await expect(paragraph).toBeVisible();
        await expect(paragraph).toContainText('Excited about the future?'); 
        Logger.success('Paragraph collapsed state verified (Upcoming Cars).');
    }

    async expandParagraph() {
        Logger.info('Clicking on "see more" (Upcoming Cars)...');
        const seeMoreBtn = this.page.locator('#see-more');
        await seeMoreBtn.waitFor({ state: 'visible', timeout: 5000 });
        await expect(seeMoreBtn).toBeEnabled();
        await seeMoreBtn.click();
        Logger.success('"See more" clicked (Upcoming Cars).');
    }

    async verifyParagraphExpanded() {
        Logger.info('Verifying full paragraph after expansion (Upcoming Cars)...');
        const paragraph = this.page.locator('#see-more'); 
        await paragraph.waitFor({ state: 'visible', timeout: 5000 });
        await expect(paragraph).toContainText('Sign up for alerts'); 
        Logger.success('Paragraph expanded state verified (Upcoming Cars).');
    }

    async validateUpcomingCarsByBudgetSection() {
        Logger.info('Validating "Upcoming cars by budget" section...');

        await expectVisible(this.upcomingCarsByBudgetHeading(), 'Section heading');

        const count = await this.budgetCards().count();
        Logger.info(`Found ${count} budget cards.`);
        expect(count, 'There should be at least one budget card').toBeGreaterThan(0);

        const expectedLabels = [
            'Under 75,000',
            '75,000 - 1,30,000',
            '1,30,000 - 2,00,000',
            '2,00,000 - 2,50,000'
        ];

        for (const label of expectedLabels) {
            await expectVisible(this.budgetCardByLabel(label), `Budget card "${label}"`);
        }

        await expectVisible(this.viewMoreButton(), '"View More" button');

        Logger.success('"Upcoming cars by budget" section validated successfully.');
    }

    async validateUpcomingCarsByBrandSection() {
        Logger.info('Validating "Upcoming cars by Brand" section...');

        // Section & heading
        const section = this.page.locator('section', { hasText: 'Upcoming cars by Brand' });
        const heading = section.locator('h2', { hasText: 'Upcoming cars by Brand' });
        await heading.waitFor({ state: 'visible', timeout: 7000 });
        await expect(heading, 'Section heading should be visible').toBeVisible();

        // Brand cards
        const brandCards = section.locator('a[href*="/en/new-cars/"][href*="/upcoming"]');
        const totalCards = await brandCards.count();
        Logger.info(`Found ${totalCards} brand cards.`);
        expect(totalCards, 'There should be at least one brand card').toBeGreaterThan(0);

        // Validate specific brand alt texts
        const expectedBrands = ['TOYOTA', 'HYUNDAI', 'NISSAN', 'KIA'];
        for (const brand of expectedBrands) {
            const brandCard = this.page
                .locator(`a[href*="/en/new-cars/${brand.toLowerCase()}/upcoming"]:has(img[alt="${brand}"])`)
                .first();

            Logger.info(`Checking visibility for brand card: ${brand}`);
            await expect(brandCard, `Brand card for "${brand}" should be visible`).toBeVisible();
        }

        // Click each brand card and validate navigation
        for (let i = 0; i < totalCards; i++) {
            const card = brandCards.nth(i);
            const img = card.locator('img');
            const brandAlt = (await img.getAttribute('alt')) || `Brand ${i + 1}`;
            Logger.info(`Clicking brand card: "${brandAlt}"`);

            await card.scrollIntoViewIfNeeded();
            await card.waitFor({ state: 'visible', timeout: 5000 });
            await expect(card, `Card "${brandAlt}" should be enabled`).toBeEnabled();

            const href = await card.getAttribute('href');
            expect(href, `Card "${brandAlt}" should have a valid href`).not.toBeNull();

            await Promise.all([
                this.page.waitForURL(new RegExp(href!.replace(/\//g, '\\/'), 'i'), { timeout: 10000 }),
                card.click()
            ]);

            Logger.info(`Navigated to: ${this.page.url()}`);
            expect(this.page.url()).toContain(href!);

            // Go back if more cards remain
            if (i < totalCards - 1) {
                await this.page.goBack();
                await heading.waitFor({ state: 'visible', timeout: 150000 });
            }
        }
    }

    async validateTitle(expectedTitle: string) {
        await this.title().waitFor({ state: 'visible' });
        const actualTitle = (await this.title().textContent())?.trim();
        expect(actualTitle).toBe(expectedTitle);
    }


    async countCards(expectedCount: number) {
        const count = await this.cards().count();
        expect(count).toBe(expectedCount);
    }

    async validateCards() {
        Logger.info('Validating each car body type card...');
        const count = await this.cards().count();

        for (let i = 0; i < count; i++) {
            const card = this.cards().nth(i);
            const label = card.locator('p');
            const img = card.locator('img');
            const href = await card.getAttribute('href');

            const labelText = await label.textContent();
            const imgSrc = await img.getAttribute('src');

            Logger.info(`Card ${i + 1}: Label="${labelText?.trim()}", Image Src="${imgSrc}", Href="${href}"`);

            expect(labelText).not.toBeNull();
            expect(labelText?.trim().length).toBeGreaterThan(0);
            expect(imgSrc).toMatch(/\.svg$/);
            expect(href).toMatch(/^\/en\/new-cars\/.*-upcoming$/);
        }
    }


    async verifySectionVisible() {
        Logger.info('Verifying "Latest Cars" section is visible...');
        await this.sectionTitle().scrollIntoViewIfNeeded();
        await this.sectionTitle().waitFor({ state: 'visible' });
    }

    async validateCarCards() {
        Logger.info('Validating the first car card in "Latest Cars" section...');

        const firstCard = this.page.locator('.swiper-slide').first();

       
        const title = firstCard.locator('h3'); // Adjust selector if incorrect
        const launch = firstCard.getByText(/^Launched/, { exact: false });
        const image = firstCard.locator('img');
        const year = firstCard.locator('span').filter({ hasText: /\d{4}/ }).first();
        await expect(year).not.toHaveText('');

        const variants = firstCard.locator('div').filter({ hasText: /Variant|Petrol|Diesel/i });

        Logger.info('Checking title is present...');
        await expect(title).not.toHaveText('');

        Logger.info('Checking launch badge is visible...');
        await expect(launch).toBeVisible();

        Logger.info('Checking car image is visible...');
        await expect(image).toBeVisible();

        Logger.info('Checking year info is present...');
        await expect(year).not.toHaveText('');

        Logger.info('Checking variant details are present...');
        const variantsDetails = firstCard.locator('div').filter({ hasText: /Variants/i }).first(); 
        await expect(variantsDetails).not.toHaveText('');

        Logger.info('First car card validated successfully.');
    }
}