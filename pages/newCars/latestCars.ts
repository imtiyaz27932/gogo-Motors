import { Page, expect } from "@playwright/test";
import { Logger } from "../../utils/logger";

export class LatestCars {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // Locator for New Cars Link
    private newCarsLink = () => this.page.getByRole('button', { name: 'New Cars' });

    // Locator for Latest cars link
    private latestCarsLink = () => this.page.locator('div').filter({ hasText: /^Latest Cars$/ });


    //Locator for Latest Cars heading... contains h2 or heading locators
    private headingfields = (headings: string) => this.page.locator('h2').filter({ hasText: headings });
    private paragraph = () => this.page.locator('#see-more');
    private seeMoreButton = () => this.paragraph().locator('span[role="button"]');



    // Why GogoMotor Section locators
    private swiperSlides = () => this.page.locator('.why-gogo-cars-id-swiper .swiper-slide');
    private swiperContainer = () => this.page.locator('.why-gogo-cars-id-swiper');
    private slides = () => this.swiperContainer().locator('.swiper-slide');


    // Locator for the offers section 
    private sectionContainer = () => this.page.locator('div', { hasText: 'Offers from your favourite banks' }).first();
    private bankImage = () => this.sectionContainer().locator('img[alt="banks"]');
    private exploreOffersBtn = () => this.page.getByRole('link', { name: 'Explore Offers' });
    private exploreOffersText = () => this.exploreOffersBtn().locator('p', { hasText: 'Explore Offers' });

    //  Locators for latest cars by body type 
    private bodyTypeCardByName = (name: string) => this.page.locator(`a[href*="/en/new-cars/"] >> text="${name}"`);

    // Upcoming Cars section Locators

    private popularCarHeading = () => this.page.getByRole('heading', { name: 'Upcoming Cars' })
    private carCards = () => this.page.locator('.swiper-slide');
    private carTitle = () => this.page.locator('h3');
    private launchDate = () => this.page.locator('text=Expected launch').locator('..'); // parent contains both label and date
    private carImage = () => this.page.locator('img');






    // Methods

    async clickNewCarsLink() {
        Logger.info('Clicking on New Cars link');
        const newcarsLink = this.newCarsLink();
        await newcarsLink.waitFor({ state: 'visible', timeout: 15000 });
        await expect(newcarsLink).toBeEnabled();
        await newcarsLink.click();
        Logger.success('Clicked on New Cars link successfully.');

    }

    async clickLatestCarsLink() {
        Logger.info('Clicking on Latest Cars link');
        const latestCarsLink = this.latestCarsLink();
        await latestCarsLink.waitFor({ state: 'visible', timeout: 5000 });
        await expect(latestCarsLink).toBeEnabled();
        await latestCarsLink.click();
        await this.page.waitForLoadState('load')
        Logger.success('Clicked on Latest Cars link successfully.');

    }

    async verifyHeading() {
        Logger.info('Verifying the section heading...');
        const heading = this.headingfields('New launched cars in KSA');
        await heading.waitFor({ state: 'visible', timeout: 5000 });
        await expect(heading).toBeVisible();
        await expect(heading).toHaveText('New launched cars in KSA');
        Logger.success('Section heading verified.');
    }

    async verifyParagraphCollapsed() {
        Logger.info('Verifying the paragraph in collapsed state...');
        const paragraph = this.paragraph();
        await paragraph.waitFor({ state: 'visible', timeout: 5000 });
        await expect(paragraph).toBeVisible();
        await expect(paragraph).toContainText('Stay ahead of the curve');
        Logger.success('Paragraph collapsed state verified.');
    }

    async expandParagraph() {
        Logger.info('Clicking on "see more"...');
        const seeMoreBtn = this.seeMoreButton();
        await seeMoreBtn.waitFor({ state: 'visible', timeout: 5000 });
        await expect(seeMoreBtn).toBeEnabled();
        await seeMoreBtn.click();
        Logger.success('"See more" clicked.');
    }

    async verifyParagraphExpanded() {
        Logger.info('Verifying full paragraph after expansion...');
        const paragraph = this.paragraph();
        await paragraph.waitFor({ state: 'visible', timeout: 5000 });
        await expect(paragraph).toContainText('Toyota Land Cruiser');
        await expect(paragraph).toContainText('Hyundai Tucson');
        Logger.success('Paragraph expanded state verified.');
    }

    async validateSectionVisible() {
        Logger.info('✅ Validating "Find popular new cars by" section is visible');
        await this.headingfields('Find popular new cars by').scrollIntoViewIfNeeded();
        await this.headingfields('Find popular new cars by').waitFor({ state: 'visible', timeout: 5000 });

    }

    async clickTabsOneByOne() {
        Logger.info('Clicking all tabs one by one in the tablist...');
        const tabList = this.page.locator('div[role="tablist"]');
        await tabList.scrollIntoViewIfNeeded();
        await tabList.waitFor({ state: 'visible', timeout: 7000 });

        const tabs = tabList.locator('[role="tab"]');
        const count = await tabs.count();

        if (count === 0) {
            await this.page.screenshot({ path: 'test-results/no-tabs-found.png' });
            throw new Error('No tabs found in the tablist. Screenshot saved.');
        }

        for (let i = 0; i < count; i++) {
            const tab = tabs.nth(i);
            const tabText = (await tab.textContent())?.trim() || `Tab ${i + 1}`;
            Logger.info(`Clicking on tab: ${tabText}`);
            await tab.waitFor({ state: 'visible', timeout: 5000 });
            await expect(tab).toBeEnabled();
            await tab.click();

        }
        Logger.success('All tabs clicked successfully.');
    }

    async validateSectionHeading() {
        Logger.info('Validating section heading "Why GoGo Motor?" is visible');
        await expect(this.headingfields('Why GoGo Motor?')).toBeVisible();
    }

    async validateSwiperSlidesContent() {
        const slideCount = await this.swiperSlides().count();
        Logger.info(`Found ${slideCount} swiper slides`);
        expect(slideCount).toBeGreaterThan(0);

        for (let i = 0; i < slideCount; i++) {
            const slide = this.swiperSlides().nth(i);

            const heading = slide.locator('h3');
            const image = slide.locator('img');
            const paragraph = slide.locator('p');

            Logger.info(`Validating contents of slide ${i + 1}`);

            await expect(heading).toBeVisible();
            const headingText = await heading.textContent();
            Logger.info(`Slide heading: ${headingText?.trim()}`);
            await expect(paragraph).toBeVisible();
        }
    }

    async validateSlidesOnMobile() {
        Logger.info('Validating all swiper slides on mobile...');
        // Ensure the slides container is visible before proceeding
        await this.swiperContainer().waitFor({ state: 'visible', timeout: 10000 });

        const slideCount = await this.slides().count();
        Logger.info(`Found ${slideCount} slides in the swiper container.`);
        expect(slideCount).toBeGreaterThan(0);

        for (let i = 0; i < slideCount; i++) {
            const slide = this.slides().nth(i);
            Logger.info(`Validating slide ${i + 1}...`);
            await slide.scrollIntoViewIfNeeded();
            await slide.waitFor({ state: 'visible', timeout: 5000 });

            // Dynamically find the visible image inside the slide
            const imgCount = await slide.locator('img').count();
            let visibleImgFound = false;

            for (let j = 0; j < imgCount; j++) {
                const img = slide.locator('img').nth(j);
                try {
                    await img.waitFor({ state: 'visible', timeout: 2000 });
                    if (await img.isVisible()) {
                        await expect(img, `Visible image in slide ${i + 1} should be visible`).toBeVisible();
                        visibleImgFound = true;
                        break;
                    }
                } catch {
                    // Ignore and continue to next image
                }
            }

            if (!visibleImgFound) {
                await slide.screenshot({ path: `test-results/no-visible-image-slide-${i + 1}.png` });
                throw new Error(`No visible image found in slide ${i + 1}. Screenshot saved.`);
            }

            // Validate the title
            const title = slide.locator('h3');
            await title.waitFor({ state: 'visible', timeout: 3000 });
            await expect(title, `Title in slide ${i + 1} should be visible`).toBeVisible();

            // Validate the paragraph
            const paragraph = slide.locator('p');
            await paragraph.waitFor({ state: 'visible', timeout: 3000 });
            await expect(paragraph, `Paragraph in slide ${i + 1} should be visible`).toBeVisible();

            Logger.info(`Slide ${i + 1} validated successfully.`);
        }
        Logger.success('All swiper slides validated successfully on mobile.');
    }

    async validateOffersSection() {
        Logger.info('Validating Offers section...');
        // Wait for the section container to be visible
        await this.sectionContainer().waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.sectionContainer(), 'Offers section container should be visible').toBeVisible();

        // Wait for the heading to be visible and correct
        const heading = this.headingfields('Offers from your favourite banks');
        await heading.waitFor({ state: 'visible', timeout: 5000 });
        await expect(heading, 'Heading should be visible and correct').toHaveText('Offers from your favourite banks');

        // Wait for the bank image to be visible
        const bankImg = this.bankImage();
        await bankImg.waitFor({ state: 'visible', timeout: 5000 });
        await expect(bankImg, 'Bank image should be visible').toBeVisible();

        // Wait for the Explore Offers button to be visible
        const exploreBtn = this.exploreOffersBtn();
        await exploreBtn.waitFor({ state: 'visible', timeout: 5000 });
        await expect(exploreBtn, 'Explore Offers button should be visible').toBeVisible();

        // Wait for the Explore Offers text to be visible and correct
        const exploreText = this.exploreOffersText();
        await exploreText.waitFor({ state: 'visible', timeout: 5000 });
        await expect(exploreText, 'Explore Offers text should be correct').toHaveText('Explore Offers');

        Logger.success('Offers section validated successfully.');
    }

    async validateBodyTypeSection() {
        // Ensure section heading is visible
        await expect(this.headingfields('Latest cars by body type'), 'Section heading should be visible').toBeVisible();

        // Get all cards
        const cards = this.headingfields('Latest cars by body type');
        const count = await cards.count();
        expect(count, 'There should be at least one body type card visible').toBeGreaterThan(0);

        // Labels to validate
        const expectedLabels = ['Sedan', 'Coupe', 'Sports Car', 'Large SUV', 'Small SUV', 'Hatchback', 'MPV', 'Van/Minivan'];

        // Loop over each label
        for (const label of expectedLabels) {
            await expect(
                this.bodyTypeCardByName(label),
                `Card with label "${label}" should be visible`
            ).toBeVisible();
        }
    }


    async validatePopularCarsSection() {
        Logger.info('Validating "Popular new cars" section...');
        const section = this.page.locator('div.max-w-full.theme-v1');
        const heading = section.locator('h2', { hasText: 'Popular new cars' });
        await heading.waitFor({ state: 'visible', timeout: 7000 });
        await expect(heading, 'Popular new cars heading should be visible').toBeVisible();

        // Wait for at least one card to appear
        const cards = section.locator('div.swiper-slide');
        await cards.first().waitFor({ state: 'visible', timeout: 7000 });
        const cardsCount = await cards.count();
        Logger.info(`Found ${cardsCount} popular car cards.`);
        expect(cardsCount, 'There should be at least one popular car card').toBeGreaterThan(0);

        const expectedCars = ['TOYOTA CAMRY', 'TOYOTA Yaris', 'SHARK SUNNY', 'NISSAN Patrol'];
        let foundAny = false;

        for (const car of expectedCars) {
            const cardByName = section.locator('h3', { hasText: car })
                .locator('xpath=ancestor::div[contains(@class, "flex") and contains(@class, "flex-col") and contains(@class, "bg-white")]')
                .first();
            if (await cardByName.isVisible()) {
                Logger.info(`Card for ${car} is visible.`);
                await expect(cardByName, `Card for ${car} should be visible`).toBeVisible();
                foundAny = true;
            } else {
                Logger.info(`Card for ${car} is not visible (may not be present for all brands).`);
            }
        }

        expect(foundAny, 'At least one expected popular car card should be visible').toBeTruthy();
        Logger.success('"Popular new cars" section validated successfully.');
    }

    async validateUpcomingCarsSection() {
        try {
            Logger.info('🔍 Validating Upcoming Cars section...');

            // Wait for the heading to be visible
            await this.popularCarHeading().waitFor({ state: 'visible', timeout: 10000 });
            await expect(this.popularCarHeading(), 'Upcoming Cars heading should be visible').toBeVisible();
            Logger.info('✅ Upcoming Cars heading is visible.');

            // Wait for the container to be visible
            const upcomingCarsContainer = this.page.locator('.upcoming-cars-id-mob-swiper');
            await upcomingCarsContainer.waitFor({ state: 'visible', timeout: 10000 });
            await expect(upcomingCarsContainer, 'Upcoming Cars container should be visible').toBeVisible();

            // Get all car cards
            const carCards = upcomingCarsContainer.locator('.swiper-slide');
            const count = await carCards.count();
            Logger.info(`ℹ️ Found ${count} upcoming car cards.`);
            expect(count, 'There should be at least one upcoming car card').toBeGreaterThan(0);

            for (let i = 0; i < count; i++) {
                Logger.info(`🔍 Validating car card #${i + 1}...`);
                const card = carCards.nth(i);

                // Validate title
                const title = card.locator('h3');
                await title.waitFor({ state: 'visible', timeout: 5000 });
                await expect(title, `Title in card #${i + 1} should be visible`).toBeVisible();
                const titleText = await title.textContent();
                Logger.info(`- Car title: "${titleText?.trim()}"`);

                // Validate launch info
                const launchText = card.locator('p', { hasText: 'Expected launch' });
                await launchText.waitFor({ state: 'visible', timeout: 5000 });
                await expect(launchText, `Expected launch info in card #${i + 1} should be visible`).toBeVisible();
                Logger.info(`- Expected launch info is visible.`);

                // Optionally: Validate image
                const img = card.locator('img');
                if (await img.count() > 0) {
                    await img.first().waitFor({ state: 'visible', timeout: 5000 });
                    await expect(img.first(), `Image in card #${i + 1} should be visible`).toBeVisible();
                    Logger.info(`- Image is visible.`);
                } else {
                    Logger.info(`- No image found in card #${i + 1}.`);
                }
            }

            Logger.success('✅ All Upcoming Cars cards validated successfully.');
        } catch (error) {
            await this.page.screenshot({ path: 'test-results/upcoming-cars-section-error.png' });
            Logger.error('❌ Validation failed for Upcoming Cars section. Screenshot saved.');
            throw error;
        }
    }
}