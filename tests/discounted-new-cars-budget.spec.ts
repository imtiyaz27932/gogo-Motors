import { test } from '../utils/testSetup';
import { Logger } from '../utils/logger';
import { DiscountBudget } from '../pages/carDiscountBudget';
import { Page } from '@playwright/test';

test.describe('Discount New Car Budget Tests', () => {

    let budget: DiscountBudget;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to Discounted New Cars Budget section');
        budget = new DiscountBudget(page);
    });

    test('Verify discounted new cars heading visibility', async () => {
        Logger.info('Checking the visibility of the Discount Cars Budget heading');
        await budget.discountHeadingVisiblity();
    });

    test('Verify the tab list is visible', async () => {
        Logger.info('Checking if the tab list is visible on the page');
        await budget.validateTabListVisible();
    });

    test('Click each budget tab and validate selection', async () => {
        Logger.info('Clicking each budget tab and verifying its selection');
        await budget.validateTabListVisible();
        await budget.clickAllTabs();
    });

    test('Clicking on Discount Cars Links below the cards', async ({ page }) => {
        Logger.info('Clicking on the Link');
        await budget.ClickingOnDiscountCarsLink();

    });

    test('Verify clicking on the first car show the offer deatils', async ({ }) => {
        Logger.info('Clicking on First Car to View the offers');
        await budget.clickFirstCarView();
    })

})


