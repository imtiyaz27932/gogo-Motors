

import { test } from '../utils/testSetup';
import { Logger } from '../utils/logger';
import { slowScrollDown, slowScrollUp } from '../utils/scroll';
import { CarDealsPage } from '../pages/exclusiveDealsPage';

test.describe('Exclusive Car Deals tests', () => {
    let DealsPage;

    test.beforeEach(async ({  headerPage,DealsPage: fixtureCarDealsPage }) => {
        Logger.info('Navigating to Exclusive Car Deals section');
        DealsPage = fixtureCarDealsPage; 
    });

    test('should display correct heading with expected text', async () => {
        Logger.info('✅ Starting test: should display correct heading with expected text');

        await DealsPage.verifyExclusiveDeals();
        await DealsPage.requestQuote();
        await DealsPage.fillRequestQuoteForm();

        Logger.success('🎉 Test passed: should display correct heading with expected text');
    });

    test('should display all car deals', async () => {
        Logger.info('✅ Starting test: should display all car deals');

        await DealsPage.clickOnViewAllCars();
        await DealsPage.requestQuoteFromFirstCarCard();
        await DealsPage.fillRequestQuoteForm();
        
        await slowScrollDown(DealsPage.page);
        await slowScrollUp(DealsPage.page);

        Logger.success('🎉 Test passed: should display all car deals');
    });
});
