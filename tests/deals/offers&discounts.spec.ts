import { test } from '../../utils/testSetup'
import { devices } from '@playwright/test';
import { Logger } from '../../utils/logger';
import { gogoDeals } from '../../pages/deals/gogoDeals';
import { expect } from '@playwright/test';
import { OffersandDiscounts } from '../../pages/deals/offersAndDiscounts';



test.use({
    ...devices['iPhone 15'],
    storageState: './storage/auth.json',
  });

test.describe('Deals - Mobile Web', () => {
    let deals: gogoDeals;
    let offers: OffersandDiscounts;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and initializing Deals Page');
        deals = new gogoDeals(page);
        offers = new OffersandDiscounts(page);
        await deals.clickingMenu();
        await deals.clickonDeals();
        await offers.clickonOfferDisocuntlink();
        
    });

    test('Verify Heading after naviagation', async () => {
        Logger.info('Testing  Header after navigation to Deals page');
        await offers.validateHeading()
        Logger.success('Navigation to Deals page verified successfully');
    });


});
