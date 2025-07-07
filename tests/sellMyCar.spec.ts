import { test } from '../utils/testSetup';
import { Logger } from '../utils/logger';
import { devices, expect } from '@playwright/test';
import { CarValuation } from '../pages/Buy & Sell Used Cars/usedCarValuation';
import { selectCarDetails } from '../utils/carSelectionHelper';
import { SellMyCar } from '../pages/Buy & Sell Used Cars/sellMyCar';
import { RoadsideAssistantPage } from '../pages/services/roadsideAssistant';

test.use({
    //...devices['iPhone 15'],
    storageState: './storage/auth.json',
});

test.describe('Extended Warranty - Mobile Web', () => {
    let valuation: CarValuation;
    let sellcar: SellMyCar;
    let roadassist: RoadsideAssistantPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('➡ Initializing MOBILE page objects and navigating to the buy used cars section');
        valuation = new CarValuation(page);
        sellcar = new SellMyCar(page);
        roadassist = new RoadsideAssistantPage(page);
        await valuation.hoverOnUsedCarsTab();
        await sellcar.ClickonSellMyCarLink()
    });


    test('Verify the Heading of the page', async ({ }) => {
        await sellcar.validateHeading()
    })

    test('Validate How It Works section', async ({ page }) => {
        await sellcar.validateHowItWorksSection();

    });


    test('Verify E2E flow of Sell My Car', async ({ page }) => {
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
        await valuation.clickonBoostListing();
        await valuation.clickonPayNowButton();
        await roadassist.enterCardDetails()



    });

    test('Verify E2E flow of Sell My Car through view all brands link', async ({ page }) => {
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
        await valuation.clickonBoostListing();
        await valuation.clickonPayNowButton();
        await roadassist.enterCardDetails()

    });
});