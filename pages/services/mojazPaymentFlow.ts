import { expect, Page } from "@playwright/test";
import { ExtendedWarranty } from '../services/extendedWarranty';
import { Logger } from "../../utils/logger";
import { BrokenLinkChecker } from "../../utils/brokenLinkChecker";
import * as fs from 'fs';

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
    private carStoryImage = () => this.page.locator('img[src*="mojaz-demo-report"]');



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



    //Select Car Buttons
    private selectcar = () => this.page.getByRole('img', { name: 'TOYOTA', exact: true })
    private selectyear = () => this.page.locator('role=listitem[name="2024"]')
    private selectcar1 = () => this.page.getByText('FORTUNER')
    private selectautomatic = () => this.page.getByRole('listitem').filter({ hasText: 'SAutomatic' })


    // Select Report selectors
    private getfullreport92 = () => this.page.getByRole('button', { name: 'Get Full Report ' })
    private continuebtn = () => this.page.getByRole('button', { name: 'Continue' })
    
    // city selectors
    private city = () => this.page.getByRole('img', { name: 'Riyadh' })
    
    // Promocode selector
    private promocode = () => this.page.getByRole('textbox', { name: 'eg FIRST300' });
    private applybtn = () => this.page.getByRole('button', { name: 'Apply' })
    
    //Email selector
    private email = () => this.page.getByRole('textbox', { name: 'Email Address' })
    private proceedbtn = () => this.page.getByRole('button', { name: 'Proceed' })
    private verifyBtn = () => this.page.getByRole('button', { name: 'Verify' })
    private paynowbtn = () => this.page.getByRole('button', { name: 'Pay Now' });
    private closenmodelicon = () => this.page.locator('#modal-root path').nth(1)


    // Detailed report selectors
    private detailedreport = () => this.page.getByRole('button', { name: 'See detail report' })
    private downloadPdf = () => this.page.getByRole('button', { name: 'mojaz logo Download PDF' })
    
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
        Logger.info('Entering VIN...')
        await this.vinInput().fill(vin);
    }

    async clickGetFreeReport() {
        Logger.info('Clicking on Get Free Report button...')
        await this.getFreeReportBtn().click();
    }



    async isGetReportButtonDisabled(): Promise<boolean> {
        return await this.getFreeReportBtn().isDisabled();
    }

    async assertButtonIsDisabled() {
        await expect(this.getFreeReportBtn()).toBeDisabled();
    }

    async clickSelectCar() {
        Logger.info('Clicking on Select Car...');
        await this.selectcar().click();
       await this.page.waitForTimeout(3000)
    }

    async clickSelectYear() {
        Logger.info('Clicking on Select Year...');
        await this.selectyear().click();
        await this.page.waitForTimeout(3000)

    }
    async clickSelectAutomatic() {
        Logger.info('Clicking on Select Automatic...');
        await this.selectautomatic().click();
        await this.page.waitForLoadState('networkidle')
    }

    async clickSelectCar1() {
        Logger.info('Clicking on Select Car 1...');
        await this.selectcar1().click();
        await this.page.waitForLoadState('networkidle')
    }

    async clickselectfullreport() {
        Logger.info('Clicking on Select Full Report...');
        await this.getfullreport92().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000)

        Logger.info('Clicking on Continue button...');
        await this.continuebtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000)
    }

    async selectCity() {
        Logger.info('Clicking on Select City...');
        await this.city().click();
        await this.page.waitForLoadState('networkidle');
    }

    async applyPromoCode() {
        Logger.info('Applying Promo Code...');
        await this.promocode().fill('MJZUAT')
        await this.applybtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000)
    }

    async fillEmail() {
        Logger.info('Filling Email...');
        await this.email().fill('portal@gogomotor.com')

        Logger.info('Clicking on Proceed button...');
        await this.proceedbtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000)
        await this.page.getByRole('textbox', { name: 'Please enter OTP' }).fill('9461')

        Logger.info('Clicking on Verify button...');
        await this.verifyBtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(4000)

        Logger.info('Clicking on Pay Now button...');
        await this.paynowbtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(9000)
    }

    async cardDetails() {
        Logger.info('Filling Card Details...');
        await this.page.getByRole('textbox', { name: 'Card Number' }).fill('4111111111111111');
        await this.page.getByRole('textbox', { name: 'Name on Card' }).fill('Test User');
        await this.page.getByPlaceholder('MM/YY').fill('12/26');
        await this.page.getByRole('textbox', { name: 'CVV' }).fill('123');

        await this.page.getByRole('button', { name: /place order/i }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
       
    }

    async clickDetailedReportAndDownloadPDF() {
        Logger.info('Clicking on Detailed Report ');
        // Click on the "See detailed report" button
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Wait for the new tab to open
            this.detailedreport().click(), // Click the button to open the new tab
        ]);
    
        // Wait for the new tab to load
        await newPage.waitForLoadState('domcontentloaded');
        Logger.info(`Detailed report opened in new tab: ${newPage.url()}`);
        await this.page.waitForTimeout(4000)
    
        // Close the new tab after it opens
        await newPage.close();
        Logger.success('New tab closed successfully');
    }
    async handleDownloadPDF(): Promise<void> {
        Logger.info('Clicking on Download PDF button...');
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Wait for the new tab to open
            this.downloadPdf().click(), // Click the download button that opens the new tab
        ]);
    
        await newPage.waitForLoadState('domcontentloaded');
        Logger.info(`New tab opened with URL: ${newPage.url()}`);
        await this.page.waitForTimeout(4000)
        await newPage.close();
        await this.page.waitForTimeout(3000)
        

        Logger.info('Closing the modal...');
        await this.closenmodelicon().click();
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