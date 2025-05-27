import { test } from '../../utils/testSetup'
import { devices } from '@playwright/test';
import { Logger } from '../../utils/logger';
import { gogoDeals } from '../../pages/deals/gogoDeals';
import { expect } from '@playwright/test';




test.use({
        ...devices['iPhone 15'],
        storageState: './storage/auth.json',
      });

test.describe('Deals - Mobile Web', () => {
    let deals: gogoDeals;
    
    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and initializing Deals Page');
        deals = new gogoDeals(page);
        await deals.clickingMenu();
        await deals.clickonDeals();
        await deals.clickonGoGoDealslink();

        
    });


    test('Verify navigation to Deals page from the menu', async () => {
        Logger.info('Testing navigation to Deals page');
        await deals.verifyDealsPageLoaded();
        Logger.success('Navigation to Deals page verified successfully');
    });

    test('Verify GoGo Deals link is clickable and navigates correctly', async () => {
        Logger.info('Testing GoGo Deals link functionality');
        await deals.verifyDealsPageLoaded();
        Logger.success('GoGo Deals link functionality verified successfully');
    });

    test('Verify price text is fetched correctly', async () => {
        Logger.info('Testing price text fetching functionality');
        const price = await deals.getPriceText();
        expect(price).toBeGreaterThan(0); 
        Logger.success(`Price text verified successfully: ${price}`);
    });

    test('Verify Request A Quote button functionality', async () => {
        Logger.info('Testing Request A Quote button functionality');
        await deals.clickRequestQuoteByPrice()
        Logger.success('Request A Quote button clicked successfully');
        
    });

    test('Verify Fill Request Quote Form', async () => {
        Logger.info('Testing Request A Quote Form functionality');
        await deals.clickRequestQuoteByPrice()
        await deals.fillRequestForm();
        Logger.success('Request A Quote Form filled successfully');
        
    });


    test('Verify Offer Terms and Conditions section', async () => {
        Logger.info('Testing Terms and Conditions functionality');
        await deals.verifyOfferTermsSection()
        Logger.success('Terms and conditions verified successfully');
        
    });

    test('Verify all banners are visible and count them', async () => {
        await deals.verifyAllBannersVisible();
    });
      
});