import { expect, Page } from "@playwright/test";
import { mobileUsedClass } from "../Buy & Sell Used Cars/mobileview";
import { Logger } from "../../utils/logger";
import { faker } from "@faker-js/faker";


export class gogoDeals {
    private page: Page;
    private mobileUsed: mobileUsedClass;

    constructor(page: Page) {
        this.page = page;
        this.mobileUsed = new mobileUsedClass(page);

    }


    // Deals Selectors

    private deals = () => this.page.getByRole('button', { name: 'Deals' }).first()
    private gogodeals = () => this.page.locator('div:nth-child(3) > .transition-all > .px-\\[24px\\] > div').first()

    // Request Quote Selectors

    private priceElement = () => this.page.locator('p.text-\\[58px\\]').first()
    private requestQuoteButton = () => this.page.locator('div').filter({ hasText: /^ 808MonthlyRequest A Quote$/ }).getByRole('button')

    // Form Locators
    private firstname = () => this.page.getByRole('textbox', { name: 'Name' });
    private email = () => this.page.getByRole('textbox', { name: 'Email' }).first()
    private city = () => this.page.locator('.mb-3 > .go-form-dropdown > .relative > .select-area').first();
    private salary = () => this.page.locator('div:nth-child(5) > .go-form-dropdown > .relative > .select-area');
    private duration = () => this.page.locator('div:nth-child(6) > .go-form-dropdown > .relative > .select-area');
    private checkbox1 = () => this.page.getByRole('checkbox', { name: 'Do you have a valid driving' });
    private checkbox2 = () => this.page.getByRole('checkbox', { name: 'I agree to receive' });
    private submitBtn = () => this.page.getByRole('button', { name: 'REQUEST A QUOTE' }).first()

    // Terms and Conditions Locators
    private offerTermsHeading = () => this.page.getByRole('heading', { name: 'Offer Terms and Conditions' })
    private offerTermsListItems = () => this.page.locator('section ul > li');

    // Returns all banner sections as locators
    private allBanners = () =>
        this.page.locator('div.absolute.top-0.left-0.flex.w-full.flex-col');
    
    // Get a specific banner by index (0-based)
    private bannerByIndex = (index: number) =>
        this.allBanners().nth(index);
   

    // Methods

    async clickingMenu() {
        await this.mobileUsed.clickonMenu()
    }

    async verifyDealsPageLoaded() {
        Logger.info('Verifying Deals page is loaded');
        const dealsHeading = this.page.getByRole('heading', { name: 'Celebrate the blessings of' })
        await expect(dealsHeading).toBeVisible();
        Logger.success('Deals page loaded successfully');
    }

    async clickonDeals() {
        Logger.info('Clicking on Deals link')
        await this.deals().click();
    }

    async clickonGoGoDealslink() {
        Logger.info('clicking on Gogo Deals link');
        await this.gogodeals().click();
        await this.page.waitForLoadState('networkidle');
    }

    async getPriceText(): Promise<number> {
        Logger.info('Fetching the price text from the page');
        const priceText = await this.priceElement().textContent();
        if (!priceText) {
            throw new Error('Price text is not available on the page');
        }
        const price = parseFloat(priceText.trim().replace(/[^0-9.]/g, '')); // Extract numeric value
        if (isNaN(price)) {
            throw new Error(`Price text "${priceText}" could not be converted to a number`);
        }
        Logger.success(`Price fetched successfully: ${price}`);
        return price;
    }

    async clickRequestQuoteByPrice() {
        Logger.info('Clicking on Request Qutoe Button')
        await this.requestQuoteButton().scrollIntoViewIfNeeded();
        await this.requestQuoteButton().first().click()

    }

    async fillRequestForm() {
        Logger.info('Filling the Request Quote Form');
    
        // Generate random data using faker
        const firstName = faker.person.firstName();
        const email = faker.internet.email();
    
        // Fill in the Name field
        Logger.info(`Filling Name: ${firstName}`);
        await this.firstname().scrollIntoViewIfNeeded();
        await this.firstname().fill(firstName);
    
        // Fill in the Email field
        Logger.info(`Filling Email: ${email}`);
        await this.email().scrollIntoViewIfNeeded();
        await this.email().fill(email);
    
        // Select City
        Logger.info('Selecting City: Riyadh');
        await this.city().scrollIntoViewIfNeeded();
        await this.city().click();
        await this.page.locator('.dropdown-item').filter({ hasText: 'Riyadh' }).first().click();
    
        // Select Salary Range
        const salaryRange = 'Up to 3,500 SAR';
        Logger.info(`Selecting Salary Range: ${salaryRange}`);
        await this.salary().scrollIntoViewIfNeeded();
        await this.salary().click();
        const salaryOption = this.page.locator('.dropdown-item', { hasText: salaryRange });
        await salaryOption.waitFor({ state: 'visible' });
        await salaryOption.click();
    
        // Select Duration
        const durationOptionText = 'Less than 3 months';
        Logger.info(`Selecting Duration: ${durationOptionText}`);
        await this.duration().scrollIntoViewIfNeeded();
        await this.duration().click();
        const durationOption = this.page.locator('.dropdown-item', { hasText: durationOptionText });
        await durationOption.waitFor({ state: 'visible' });
        await durationOption.click();
    
        // Check the required checkboxes
        Logger.info('Checking required checkboxes');
        await this.checkbox1().scrollIntoViewIfNeeded();
        await this.checkbox1().check();
        await this.checkbox2().scrollIntoViewIfNeeded();
        await this.checkbox2().check();
    
        // Submit the form
        Logger.info('Submitting the Request Quote form');
        await this.submitBtn().scrollIntoViewIfNeeded();
        await this.submitBtn().click({ force: true });
    
        // Wait for the page to load after submission
        await this.page.waitForLoadState('networkidle');
    
        Logger.success('✅ Request Quote form filled and submitted successfully.');
    }


    async verifyOfferTermsSection(): Promise<void> {
        Logger.info('Verifying Offer Terms and Conditions section');
    
        // Ensure the Offer Terms heading is visible
        await this.offerTermsHeading().scrollIntoViewIfNeeded();
        await expect(this.offerTermsHeading()).toBeVisible();
        Logger.info('Offer Terms and Conditions heading is visible');
    
        // Define the expected texts for the list items
        const expectedTexts = [
            'These offers are subject to availability of stock and the finance offer from respective finance provider.',
            'The cars displayed in the advertisements are for illustration purposes only. The actual car purchased may differ in specification and color.',
            'The offers are valid until 31st March 2025 or until stock depletion on advertised model years.',
            'Monthly installment is calculated based on the entry trim and average insurance rate.',
            'The monthly installment will vary based on trim, insurance rate, and credit score from one customer to another.',
            'The offer cannot be combined with any other promotion.',
            'These offers are brought to you by FinPal®.'
        ];
    
        // Wait for the list items to be visible
        const listItems = this.offerTermsListItems();
        await listItems.first().scrollIntoViewIfNeeded();
        await expect(listItems).toHaveCount(expectedTexts.length);
        Logger.info(`Found ${expectedTexts.length} list items in the Offer Terms section`);
    
        // Verify each list item text
        for (let i = 0; i < expectedTexts.length; i++) {
            const listItem = listItems.nth(i);
            await listItem.scrollIntoViewIfNeeded();
            const actualText = await listItem.textContent();
            if (!actualText) {
                throw new Error(`List item at index ${i} is empty or not visible`);
            }
            expect(actualText.trim()).toBe(expectedTexts[i]);
            Logger.info(`Verified list item ${i + 1}: "${actualText.trim()}"`);
        }
    
        Logger.success('✅ Offer Terms and Conditions section verified successfully');
    }

    async verifyAllBannersVisible(): Promise<void> {
        const count = await this.allBanners().count();
        Logger.info(`Found ${count} banners on the page`);
      
        for (let i = 0; i < count; i++) {
            Logger.info(`Checking visibility of banner ${i + 1}`);
            await expect(this.bannerByIndex(i)).toBeVisible();
        }
        Logger.success('All banners are visible');
    }
    }
    