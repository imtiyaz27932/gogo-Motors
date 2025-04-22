import { test } from '../utils/testSetup';
import { Logger } from '../utils/logger';
import { NewCarPage } from '../pages/newCarPage';

test.describe('New Car Tab in Header Test Cases', () => {
    let car: NewCarPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Setting up NewCarPage and navigating to New Cars tab');
        car = new NewCarPage(page);
        await car.clickNewCarTab();
    });

    test('Should click on the New Cars Tab', async () => {
        Logger.info('New Cars tab clicked successfully');
    });

    test('Should display offers section when New Cars Tab is clicked', async () => {
        Logger.info('Checking offers section visibility...');
        await car.OffersVisibility();
    });

    test('Should explore offers under New Cars Tab', async () => {
        Logger.info('Exploring offers under New Cars...');
        await car.ExploreOffers();
    });

    test('Should click on the Popular Cars link', async () => {
        Logger.info('Exploring offers first...');
        await car.ExploreOffers();

        Logger.info('Clicking on the Popular Cars link...');
        await car.PopularCarLink();
    });

    test('Should unlock the complete offer and fill phone details', async () => {
        Logger.info('Clicking to unlock offer...');
        await car.ExploreOffers();
        await car.clickUnlockOffer();

        Logger.info('Filling phone and OTP details...');
        await car.fillphonedeatils();

        Logger.info('clickng on slider forward and backward')
        await car.swipeCarousel(1)
    });

    test('Should apply filters and search', async () => {
        Logger.info('Applying budget and vehicle filters...');
        await car.applyFilters();
    });

    test('Should select brand and model and perform search', async () => {
        Logger.info('Selecting brand and model...');
        await car.selectByBudgetBrandAndModel();
    });
});
  