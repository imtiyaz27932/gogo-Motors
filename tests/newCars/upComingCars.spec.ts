import { test } from '../../utils/testSetup';
import { ExtendedWarranty } from '../../pages/services/extendedWarranty';
import { DiscountNewCars } from '../../pages/discountNewCarsPage';
import { Logger } from '../../utils/logger';
import { devices } from '@playwright/test';
import { UpComingCars } from '../../pages/newCars/upComingCars';
import { LatestCars } from '../../pages/newCars/latestCars';




test.use({
    ...devices['iPhone 15'],
    storageState: './storage/auth.json',
});

test.describe('New Cars Test Suite - Mobile Web', () => {

    let warranty: ExtendedWarranty;
    let discountNewCars: DiscountNewCars;
    let upComingCars: UpComingCars
    let latestCars: LatestCars;
    

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('➡ Initializing MOBILE page objects');
        discountNewCars = new DiscountNewCars(page);
        warranty = new ExtendedWarranty(page, discountNewCars);
        upComingCars = new UpComingCars(page);
        latestCars = new LatestCars(page)
        await warranty.humberginiclick();
        await latestCars.clickNewCarsLink()
        await upComingCars.clickUpComingCarsLink();
        

    });


    test('should navigate Upcoming Cars section  after clicking on New Cars link', async () => {
        await upComingCars.validateHeroImageAndText();
    });

    test('should show collapsed paragraph by default', async () => {
        await upComingCars.verifyParagraphCollapsed();
    });

    test('should expand paragraph and show full content after clicking "see more"', async () => {
        await upComingCars.expandParagraph();
        await upComingCars.verifyParagraphExpanded();
    });

    test('should validate upcoming cars by budget section', async () => {
        await upComingCars.validateUpcomingCarsByBudgetSection();
    });

    test('should validate upcoming cars by Brand section', async () => {
        await upComingCars.validateUpcomingCarsByBrandSection();
    })

    test.fixme('Validate upcoming cars section and cards', async ({ page }) => {
        await upComingCars.validateTitle('Upcoming cars by body type');
        await upComingCars.countCards(8);
        await upComingCars.validateCards();
    });
    
    
    test('should validate the latest car section', async () => {
        await upComingCars.verifySectionVisible();
        await upComingCars.validateCarCards();
    });
});