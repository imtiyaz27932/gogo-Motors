import { expect, Page } from "@playwright/test";
import { ExtendedWarranty } from '../services/extendedWarranty';
import { Logger } from "../../utils/logger";
import { BrokenLinkChecker } from "../../utils/brokenLinkChecker";

export class PaymentFlow {
    private page: Page;


    constructor(page: Page) {
        this.page = page;

    }

    // 1. Service Tab
    private serviceTab = () => this.page.getByRole('navigation').getByText('Services');
    private MojazReportLink = () => this.page.getByRole('link', { name: 'Mojaz Report' });


    // Heading Text
    private headerTitle = () => this.page.getByRole('heading', { name: 'Get a Mojaz Car History' })
    private subHeaderText = () => this.page.getByText('Powered by')
    private carImage = () => this.page.getByRole('img', { name: 'Mojaz Car History Report -' })


    // 2. Hero Section
    private vinInput = () => this.page.getByRole('textbox', { name: 'Enter VIN Number' })
    private getFreeReportBtn = () => this.page.locator('section').filter({ hasText: 'Get a Mojaz Car History' }).getByRole('button')





    // 4. Car Story Section
    private carStorySectionTitle = () => this.page.getByRole('heading', { name: 'Unveil Your Car\'s True Story' })
    private carStorySubText = () => this.page.getByText('The Mojaz report provides complete transparency, from accident history to service records');
    private carStoryImage = () =>  this.page.locator('img[src*="mojaz-demo-report"]');



    private carStoryCardTitles = [
        'Maintenance Records',
        'Periodic Checks',
        'Vehicle Repair',
        'Odometer Readings',
        'Spare Parts',
        'Vehicle Reputation',
        'Previous Owners',
    ];

    // CTA Buttons
    private carStoryFullReportBtn = () => this.page.getByRole('button', { name: /Get full report/i });
    private carStoryFreeReportBtn = () => this.page.getByRole('button', { name: /Get Free Report/i }).nth(1);



    // ========== ACTIONS ==========



    async validateBrokenLinksAndImages() {
        try {
            Logger.info('Starting validation for broken links and images...');
    
            // Check for broken links
            const brokenLinks = await BrokenLinkChecker.checkBrokenLinks(this.page);
            if (brokenLinks.length > 0) {
                Logger.error(`Broken links found: ${JSON.stringify(brokenLinks)}`);
                throw new Error(`Broken links found: ${JSON.stringify(brokenLinks)}`);
            }
    
            Logger.success('No broken links found.');
    
            // Check for broken images
            const brokenImages = await BrokenLinkChecker.checkBrokenImages(this.page);
            if (brokenImages.length > 0) {
                Logger.error(`Broken images found: ${JSON.stringify(brokenImages)}`);
                throw new Error(`Broken images found: ${JSON.stringify(brokenImages)}`);
            }
    
            Logger.success('No broken images found.');
            Logger.info('Validation complete: No broken links or images found on the page.');
    
        } catch (error) {
            Logger.error(`Validation failed: ${error}`);
            throw error;
        }
    }



    async getHeaderTitle(): Promise<void> {
        await expect(this.headerTitle()).toBeVisible();
    }

    async getSubHeaderText(): Promise<void> {
        await expect(this.subHeaderText()).toBeVisible();
    }

    async validateCarImage(): Promise<void> {
        await expect(this.carImage()).toBeVisible();
    }




    async useServiceTab() {
        // Hover over 'Services' tab
        await expect(this.serviceTab()).toBeVisible({ timeout: 5000 });
        await this.serviceTab().hover();

        // Wait for Mojaz Report link to be visible and click it
        await expect(this.MojazReportLink()).toBeVisible({ timeout: 5000 });
        await this.MojazReportLink().click();

        // Wait for URL navigation and validate
        await this.page.waitForURL('**/mojaz-report', { timeout: 10000 });
        await expect(this.page).toHaveURL('https://liveuat.gogomotor.com/en/mojaz-report');
    }

    async enterVIN(vin: string) {
        await this.vinInput().fill(vin);
    }

    async clickGetFreeReport() {
        await this.getFreeReportBtn().click();
    }


    async isGetReportButtonDisabled(): Promise<boolean> {
        return await this.getFreeReportBtn().isDisabled();
    }

    async assertButtonIsDisabled() {
        await expect(this.getFreeReportBtn()).toBeDisabled();
    }


    async validateWhyUseMojazSection(): Promise<void> {
        try {
            const mainTitleText = 'Why Use Mojaz for Car History Reports?';
            const subHeaderText = 'Get the full picture before buying any second hand vehicle';

            const mainTitle = this.page.getByRole('heading', { name: mainTitleText });
            const subHeader = this.page.getByText(subHeaderText);

            Logger.info(`Scrolling to and validating main title: "${mainTitleText}"`);
            await mainTitle.scrollIntoViewIfNeeded();
            await expect(mainTitle).toBeVisible({ timeout: 5000 });
            Logger.success('Main title is visible.');

            Logger.info('Validating sub-header...');
            await expect(subHeader).toBeVisible({ timeout: 5000 });
            Logger.success('Sub-header is visible.');

            const cards = [
                {
                    title: 'Reports for All Vehicles',
                    description: 'We provide information on every vehicle in the Kingdom of Saudi Arabia, from when they entered the country until the present',
                },
                {
                    title: 'Comprehensive Reports',
                    description: 'With vehicle information collected from multiple sources we have the most comprehensive vehicle data available in the Kingdom',
                },
                {
                    title: 'Easy to View',
                    description: 'Through Mojaz, you could be able to find all the requested vehicle information through one report with high quality',
                },
            ];

            for (const { title, description } of cards) {
                try {
                    const cardTitle = this.page.getByRole('heading', { name: title });
                    const cardDescription = this.page.getByText(description);

                    Logger.info(`Validating card: "${title}"`);
                    await cardTitle.scrollIntoViewIfNeeded();
                    await expect(cardTitle).toBeVisible({ timeout: 5000 });

                    await expect(cardDescription).toBeVisible({ timeout: 5000 });
                    Logger.success(`Card validated: "${title}"`);
                } catch (cardError) {
                    Logger.error(`Card validation failed: "${title}" - ${cardError}`);
                    throw cardError;
                }
            }
        } catch (error) {
            Logger.error(`"Why Use Mojaz" section validation failed: ${error}`);
            throw error;
        }
    }


    async validateCarStorySection(): Promise<void> {
        try {
            Logger.info("Validating 'Unveil Your Car’s True Story' section...");

            // Validate section title
            await this.carStorySectionTitle().scrollIntoViewIfNeeded();
            await expect(this.carStorySectionTitle()).toBeVisible();
            Logger.success("Section title is visible.");

            // Validate subtext
            await expect(this.carStorySubText()).toBeVisible();
            Logger.success("Subtext is visible.");

            // Validate card titles
            for (const title of this.carStoryCardTitles) {
                const card = this.page.getByText(title, { exact: true });
                Logger.info(`Validating card: "${title}"`);
                await expect(card).toBeVisible();
                Logger.success(`Card "${title}" is visible.`);
            }


            // Validate car story image
            Logger.info("Validating car image in Car Story section...");
            await expect(this.carStoryImage()).toBeVisible({ timeout: 45000 });
            Logger.success("Car image is visible.");
            


            // Validate buttons
            Logger.info("Validating CTA buttons...");
            await expect(this.carStoryFullReportBtn()).toBeVisible();
            await expect(this.carStoryFreeReportBtn()).toBeVisible();
            Logger.success("CTA buttons are visible.");



        }


        catch (error) {
            Logger.error(`Validation failed in Car Story section: ${error}`);
            throw error;
        }
    }

    async validateAboutMojazSection(): Promise<void> {
        try {
            Logger.info('Validating "About Mojaz" section...');
    
            // Validate section title
            const aboutTitle = this.page.getByRole('heading', { name: 'About Mojaz' });
            await aboutTitle.scrollIntoViewIfNeeded();
            await expect(aboutTitle).toBeVisible({ timeout: 5000 });
            Logger.success('"About Mojaz" title is visible.');
    
            // Validate Mojaz logo
            const mojazLogo = this.page.locator('div').filter({ hasText: /^About Mojaz$/ }).getByRole('img')
            await expect(mojazLogo).toBeVisible({ timeout: 5000 });
            Logger.success('Mojaz logo is visible.');
    
            
            
        } catch (error) {
            Logger.error(`Validation failed for "About Mojaz" section: ${error}`);
            throw error;
        }
    }
}