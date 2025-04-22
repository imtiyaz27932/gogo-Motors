import { expect, Page } from "@playwright/test";

export class NewCarPage {
    constructor(private page: Page) {}

    // --- Navigation & Common ---
    private newCarTab = () => this.page.getByRole('navigation').getByText('New Cars');
    private offerHeading = () => this.page.getByRole('heading', { name: 'Offers from your favourite' });
    private offerButton = () => this.page.getByRole('link', { name: 'Explore Offers' });
    private popularCarsLink = () => this.page.getByRole('link', { name: 'View All Popular Cars' });

    // --- Offer Unlock Flow ---
    private unlockOfferBtn = () => this.page.locator('.flex-none > div:nth-child(3) > .font-medium').first();
    private selectCity = () => this.page.getByRole('img', { name: 'Riyadh', exact: true });
    private phoneNumberInput = () => this.page.getByRole('main').getByRole('textbox');
    private proceedButton = () => this.page.getByText('Proceed');
    private otpField = () => this.page.locator('input[name="OTPNumber"]');
    private signInButton = () => this.page.getByRole('button', { name: 'Sign In' })

    // --- Budget + Filter Flow ---
    private budgetDropdown = () => this.page.locator('label:text("Select Budget")');
    private vehicleTypeDropdown = () => this.page.locator('label:text("Vehicle Type")');
    private searchButton = () => this.page.locator('button[aria-label="Search"]');

    // --- By Brand/Model Flow ---
    private byBudget = () => this.page.getByText('By Budget');
    private byModelTab = () => this.page.getByText('By Model');
    private selectBrand = () => this.page.getByText('Select brand');
    private brandOption = () => this.page.getByText('NISSAN', { exact: true });
    private selectModel = () => this.page.getByText('Select Model');
    private modelOption = () => this.page.getByText('SUNNY', { exact: true });

    // ---Offers Flow -----

    private notSureBtn = () => this.page.getByRole('radio', { name: 'Not Sure' })
    private claimofferbtn = () => this.page.getByRole('button', { name: 'Claim offers' })
    private checkVariant = ()=> this.page.locator('.flex > div > div:nth-child(2) > .cursor-pointer').first()

    // --- Actions ---

    async clickNewCarTab() {
        await this.newCarTab().click();
        await this.page.waitForLoadState('networkidle');
    }

    async OffersVisibility() {
        await this.offerHeading().scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await expect(this.offerHeading()).toBeVisible();
    }

    async ExploreOffers() {
        await this.offerButton().scrollIntoViewIfNeeded();
        await this.offerButton().click();
        await this.page.waitForTimeout(2000);
    }

    async PopularCarLink() {
        await this.popularCarsLink().scrollIntoViewIfNeeded();
        await this.popularCarsLink().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000);
    }

    async clickUnlockOffer() {
        await this.unlockOfferBtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000);
        await this.selectCity().click();
        await this.page.waitForLoadState('load');
    }

    async fillphonedeatils() {
        await this.page.getByRole('combobox').selectOption('+966');
        await this.phoneNumberInput().fill('531938880');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000);
        await this.proceedButton().click();
        await this.page.waitForLoadState('networkidle');
        await this.otpField().fill('9461');
        await this.page.waitForTimeout(2000);
        await this.signInButton().click();
        await this.page.waitForLoadState('networkidle')
        await this.notSureBtn().check();
        await this.claimofferbtn().click();
        await this.page.waitForLoadState('networkidle')

    }

    async swipeCarousel(times: number = 1) {
        const nextButton = this.page.getByRole('button', { name: 'swiperpnext' });
        const prevButton = this.page.getByRole('button', { name: 'swiperpprev' });
    
        for (let i = 0; i < times; i++) {
            await nextButton.click();
            await this.page.waitForTimeout(500); 
        }
    
        for (let i = 0; i < times; i++) {
            await prevButton.click();
            await this.page.waitForTimeout(500);
        }

        await this.checkVariant().click()
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000)
        await this.page.locator('.py-\\[19px\\] > .absolute').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('.thank-you-close > .hidden').click();



    }
    

    async selectBudget() {
        await this.budgetDropdown().click();
        const option = this.page.getByText(' 75,000 - 130,000');
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async selectVehicleType(optionText: string) {
        await this.vehicleTypeDropdown().click();
        await this.page.waitForTimeout(1500);

        const noResult = this.page.getByText('No Result Found');
        if (await noResult.isVisible()) {
            console.warn(`⚠️ No vehicle types available – skipping selection`);
            return;
        }

        const option = this.page.getByText(optionText, { exact: false });
        await option.waitFor({ state: 'visible', timeout: 3000 });
        await option.click();
    }

    async clickSearch() {
        await this.searchButton().click();
    }

    async applyFilters(vehicleType?: string) {
        await this.selectBudget();

        if (vehicleType) {
            await this.selectVehicleType(vehicleType);
        } else {
            console.warn("⚠️ No vehicle type provided, skipping vehicle selection");
        }

        await this.clickSearch();
    }

    async selectByBudgetBrandAndModel() {
        await this.byBudget().click();
        await this.byModelTab().click();
        await this.selectBrand().click();
        await this.brandOption().click();
        await this.selectModel().click();
        await this.modelOption().click();
        await this.clickSearch();
        await this.page.waitForLoadState('networkidle');
    }
}
