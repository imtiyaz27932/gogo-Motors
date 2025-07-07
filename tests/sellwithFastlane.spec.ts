import { test } from '../utils/testSetup';
import  { Logger } from '../utils/logger';
import { devices, expect } from '@playwright/test';
import { CarValuation } from '../pages/Buy & Sell Used Cars/usedCarValuation';
import { RoadsideAssistantPage } from '../pages/services/roadsideAssistant';
import { Fastlane } from '../pages/Buy & Sell Used Cars/sellwithFastlane';
import { SellMyCar } from '../pages/Buy & Sell Used Cars/sellMyCar';
import   { selectCarDetails } from '../utils/carSelectionHelper';






test.use({
    //...devices['iPhone 15'],
    storageState: './storage/auth.json',
});

test.describe('Sell With Fastlane Flow', () => {
    let valuation: CarValuation;
    let roadassist: RoadsideAssistantPage;
    let sellcar: SellMyCar;
    let fastlane: Fastlane;


    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('➡ Initializing MOBILE page objects and navigating to the buy used cars section');
        valuation = new CarValuation(page);
       
        roadassist = new RoadsideAssistantPage(page);
        fastlane = new Fastlane(page);
        sellcar = new SellMyCar(page);
        await valuation.hoverOnUsedCarsTab();
        await fastlane.clicksellFastLaneLink();
       
    });



    test('Verify the Heading of the page', async ({ }) => {
        await sellcar.validateHeading()
    })


    test('Verify E2E flow of Sell with FastLane through view all Brands links', async ({ page }) => {
        await sellcar.validateCarBrandGrid()
        await sellcar.clickonViewallBrandsLink()
        await selectCarDetails(page, {
            brand: 'TOYOTA',
            year: '2024',
            model: 'FORTUNER',
            variant: 'SAutomatic',
            city: 'Riyadh'
        });

        await valuation.enterKmsDriven();
        await valuation.clickonContiueBtn();
        await valuation.uploadCarImages();
        await valuation.clickonContiueBtn();
        await valuation.enterExpectedPrice();
        await valuation.clickSubmit();
        await valuation.clickonPayNowButton();
        await roadassist.enterCardDetails()

    });

    test('Verify E2E flow of sell with Fastlane through Select your Brand ', async ({ page }) => {
        await selectCarDetails(page, {
            brand: 'TOYOTA',
            year: '2024',
            model: 'FORTUNER',
            variant: 'SAutomatic',
            city: 'Riyadh'
        });

        await valuation.enterKmsDriven();
        await valuation.clickonContiueBtn();
        await valuation.uploadCarImages();
        await valuation.clickonContiueBtn();
        await valuation.enterExpectedPrice();
        await valuation.clickSubmit();
        await valuation.clickonPayNowButton();
        await roadassist.enterCardDetails()

    });
});