import { test } from '../../utils/testSetup';
import { ExtendedWarranty } from '../../pages/services/extendedWarranty';
import { DiscountNewCars } from '../../pages/discountNewCarsPage';
import { Logger } from '../../utils/logger';
import { devices } from '@playwright/test';
import { LatestCars } from '../../pages/newCars/latestCars';
import { lstatSync } from 'fs';


test.use({
    ...devices['iPhone 15'],
    storageState: './storage/auth.json',
});

test.describe('New Cars Test Suite - Mobile Web', () => {

    let warranty: ExtendedWarranty;
    let discountNewCars: DiscountNewCars;
    let latestCars: LatestCars;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('➡ Initializing MOBILE page objects');
        discountNewCars = new DiscountNewCars(page);
        warranty = new ExtendedWarranty(page, discountNewCars);
        latestCars = new LatestCars(page);
        await warranty.humberginiclick();
        await latestCars.clickNewCarsLink()
        await latestCars.clickLatestCarsLink()

    });


    test('should navigate to Latest Cars section after clicking New Cars and Latest Cars links', async () => {
        await latestCars.verifyHeading();
    });

    test('should show collapsed paragraph by default', async () => {
        await latestCars.verifyParagraphCollapsed();
    });

    test('should expand paragraph and show full content after clicking "see more"', async () => {
        await latestCars.expandParagraph();
        await latestCars.verifyParagraphExpanded();
    });

    test('should validate all elements in the popular cars section ', async () => {
        await latestCars.validateSectionVisible();
        await latestCars.clickTabsOneByOne();

    });

    test('should validate Why gogo Motors Section ', async () => {
        await latestCars.validateSectionHeading();
        await latestCars.validateSwiperSlidesContent();
        await latestCars.validateSlidesOnMobile();

    });

    test('should validate the offer section', async () => {
        await latestCars.validateOffersSection();
    });

    test('should validate Latest Cars by Body Type section', async () => {
        await latestCars.validateBodyTypeSection();
    });

    test('should validate Popular car section', async () => {
        await latestCars.validatePopularCarsSection();
    });

    test('should validate upcoming car section', async () => {
        await latestCars.validateUpcomingCarsSection();

    });
})