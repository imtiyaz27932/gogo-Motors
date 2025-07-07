import { test } from '../utils/testSetup';
import { Logger } from '../utils/logger';
import { devices, expect } from '@playwright/test';
import { CarValuation } from '../pages/Buy & Sell Used Cars/usedCarValuation';
import { selectCarDetails } from '../utils/carSelectionHelper';
import { RoadsideAssistantPage } from '../pages/services/roadsideAssistant';
import { ro } from '@faker-js/faker';


test.use({
    //...devices['iPhone 15'],
    storageState: './storage/auth.json',
});

test.describe('Extended Warranty - Mobile Web', () => {
    let valuation: CarValuation;
    let roadassist: RoadsideAssistantPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('➡ Initializing MOBILE page objects and navigating to the buy used cars section');
        valuation = new CarValuation(page);
        roadassist = new RoadsideAssistantPage(page);
        await valuation.hoverOnUsedCarsTab();
        await valuation.clickonCarValuationTab();
    });


    test('Validate car resale heading on valuation page', async ({ page }) => {
        await valuation.validateCarResaleHeading();
    });

    test('Validate subheading and see more paragraph on car valuation page', async ({ page }) => {
        await valuation.validateValuationSubSection();
        await valuation.clickSeeMoreAndValidate();
    });

    test('Why Choose GoGo Motor Section', async ({ page }) => {
        await valuation.validateWhyChooseSection()
    });

    test('validate instant car valuation', async ({ page }) => {
        await valuation.validateInstantValuationSection()
    });

    test('Verify get your car valuation in 3 steps', async ({ page }) => {
        await valuation.validateCarValuationStepsSection()
    });

    test('Testing  E2E flow for Car Valuation Functionality', async ({ page }) => {
        await valuation.clickGetFreeValuation();
        await selectCarDetails(page, {
            brand: 'TOYOTA',
            year: '2024',
            model: 'FORTUNER',
            variant: 'SAutomatic',
            city: 'Riyadh'
        });

        await valuation.selectOwnership();
        await valuation.enterKmsDriven();
        await valuation.clickonContiueBtn();
        await valuation.clickOnListCarButton();
        await valuation.uploadCarImages();
        await valuation.clickonContiueBtn();
        await valuation.enterExpectedPrice();
        await valuation.clickSubmit();
        await valuation.clickonBoostListing();
        await valuation.clickonPayNowButton();
        await roadassist.enterCardDetails();
    });

    test('Verify E2E flow of car valuation using Select your brand car section', async ({ page }) => {
        await selectCarDetails(page, {
            brand: 'TOYOTA',
            year: '2024',
            model: 'FORTUNER',
            variant: 'SAutomatic',
            city: 'Riyadh'
        });
        await valuation.selectOwnership();
        await valuation.enterKmsDriven();
        await valuation.clickonContiueBtn();
        await valuation.clickOnListCarButton();
        await valuation.uploadCarImages();
        await valuation.clickonContiueBtn();
        await valuation.enterExpectedPrice();
        await valuation.clickSubmit();
        await valuation.clickonBoostListing();
        await valuation.clickonPayNowButton();
        await roadassist.enterCardDetails();
    });

    test.fixme('Car Valuation - Validate car brand grid', async ({ page }) => {
        
        const expectedBrands = [
            "Toyota", "Hyundai", "Nissan", "Kia", "Chevrolet",
            "Ford", "Honda", "GMC", "Abarth", "Geely",  "Audi"
        ];
        await valuation.validateCarBrandLogosAndNames(expectedBrands);
    });

});

