
import { test } from '../utils/testSetup';
import { SellCarPage } from '../pages/sellCarPage';
import { Logger } from '../utils/logger';

test.describe('Footer Test Cases', () => {

    let sellcar: SellCarPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and checking functionality of Footer');
        sellcar = new SellCarPage(page);
    });

    test('Validate car image is visible', async () => {
        Logger.info('Clicking on the list your car button')
        await sellcar.carImageVisibility();
    })

    test('validate sell car Heading', async () => {
        Logger.info('Checking the sell car heading');
        await sellcar.sellCarHeadingVisibility();

    });

    test('Validate the sell Car Functionality', async () => {
        Logger.info('Clicking on the sell car button');
        await sellcar.clicklistCarButton();

        Logger.info('Filling the Details')
        await sellcar.fillDetails();

        Logger.info('Filling the Phone Number details')
        await sellcar.fillingPhoneDetails();


    })
});