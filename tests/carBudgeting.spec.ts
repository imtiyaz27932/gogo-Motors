import { test } from '../utils/testSetup'
import { CarBudgetingPage } from '../pages/carBudgeting';
import { Logger } from '../utils/logger';

test.describe('Car Budgeting Functionality', () => {
    let carBudgeting: CarBudgetingPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and checking the car budgeting functionality');
        carBudgeting = new CarBudgetingPage(page);
    });

    test('Verify increment EMI button', async ({ page }) => {
        Logger.info('Setting the EMI in input field')
        await carBudgeting.setEMI(7000);
      
    });
    
    test('Increase EMI by 500', async () => {
        Logger.info('Incresing the EMI')
        await carBudgeting.increaseEMI();
    });

    test('Select loan duration', async () => {
        Logger.info('selecting the duration in years one by one')
        await carBudgeting.selectDurationWithDelay();
    });
    });

  