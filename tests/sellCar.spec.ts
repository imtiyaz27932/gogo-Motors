
import { test } from '../utils/testSetup';
import { SellCarPage } from '../pages/sellCarPage';
import { Logger } from '../utils/logger';




test.use({ storageState: './storage/auth.json' });
test.describe('Footer Test Cases', () => {

    let sellcar: SellCarPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and checking functionality of sell Car');
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

    test('Validate the sell Car Functionality using owner ID  and Sequence Number ', async () => {
        Logger.info('Clicking on the sell car button');
        await sellcar.clicklistCarButton();
        
        Logger.info('Filling the Details')
        await sellcar.fillDetails();
        await sellcar.kmsDriven();
        await sellcar.uploadCarImage()
        await sellcar.enterPrice();
        await sellcar.weAreListening();
        // await sellcar.fillingPhoneDetails();



    })

    test('Validate the sell car functionality by selecting Brand', async () => {
        await sellcar.hoveronBuyandSellCars()
        await sellcar.SelectCarBrand();
        await sellcar.selectCarYear();
        await sellcar.selectCity();
        await sellcar.kmsDriven()
        await sellcar.uploadCarImage()
        await sellcar.enterPrice();
        await sellcar.weAreListening();
       

    });
});