import { test } from '../../utils/testSetup';
import { ExtendedWarranty } from '../../pages/services/extendedWarranty';
import { DiscountNewCars } from '../../pages/discountNewCarsPage';
import { Logger } from '../../utils/logger';
import { devices } from '@playwright/test';


test.use({
    ...devices['iPhone 15'],
    storageState: './storage/auth.json',
});

test.describe('Extended Warranty - Mobile Web', () => {

    let warranty: ExtendedWarranty;
    let discountNewCars: DiscountNewCars;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('➡ Initializing MOBILE page objects');
        discountNewCars = new DiscountNewCars(page);
        warranty = new ExtendedWarranty(page, discountNewCars);
        await warranty.humberginiclick();
        await warranty.services();
        await warranty.clickonExtendedWarranty();
        //await warranty.ServiceTab();
    });


    test('Verify Extended Warranty basic tab click', async () => {
        Logger.info('✅ Services Tab Clicked Successfully');
    });



    test('Verify Extended Warranty Flow for New Cars - MOBILE', async () => {
        Logger.info('➡ Starting Mobile Warranty Flow');
        await warranty.getCovergabtn();
        await warranty.ConfirmCarDetailsMobile()
        await warranty.enterVINDetails()
        await warranty.Nationalid();
        await warranty.selectEndDate();
        await warranty.SelectPlan();
        await warranty.applyPromoCode();
        await warranty.enterEmail();

        Logger.info('🎉 Mobile warranty flow completed');
    });

    test('Verify functionality of explore used cars', async () => {
        Logger.info('➡ Starting explore used cars functionality');
    })

    test('Check Eligiblity for Extended Warranty', async () => {
        Logger.info('Checking eligibility for extended warranty');
        await warranty.CheckEligibility();
        await warranty.ConfirmCarDetailsMobile()
        await warranty.enterVINDetails()
        await warranty.Nationalid();
        await warranty.selectEndDate();
        await warranty.SelectPlan();
        await warranty.applyPromoCode();
        await warranty.enterEmail();
        
    })

    test('Verify Explore Used Cars functionality', async () => {
        Logger.info('Testing "Explore Used Cars" functionality');
        await warranty.exploreUsedCars();
        Logger.success('"Explore Used Cars" functionality verified successfully');
    });

    test('Verify Buy Extended Warranty functionality', async () => {
        Logger.info('Testing "Buy Extended Warranty" functionality');
        await warranty.buyExtendedWarranty();
        await warranty.ConfirmCarDetailsMobile()
        await warranty.enterVINDetails()
        await warranty.Nationalid();
        await warranty.selectEndDate();
        //await warranty.byNowProcess();
        Logger.success('"Buy Extended Warranty" functionality verified successfully');
    });


    test('Verify the  visiblity of gogo Promise section', async () => {
        Logger.info('Checking the promise section visiblity')
        await warranty.validateGogoPromiseSection();
        
    });

    test('Validate Protect Your Car Steps Section', async ({ page }) => {
        Logger.info('Testing Car Steps Sections')
        await warranty.validateSection();
    });
    
    test('Validate Fast Claims feature cards and content', async () => {
        Logger.info('Testing Fast claims section')
        await warranty.validateFastClaims();
    });

});
