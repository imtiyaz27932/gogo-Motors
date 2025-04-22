import { test } from '../utils/testSetup'
import { LocationPage } from '../pages/exploreUsedCar';
import { Logger } from '../utils/logger';


test.describe('Explore used  Car by Location Tests', () => {

    let location: LocationPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to Explore used car by Location section');
        location = new LocationPage(page);
    });

    test('Validate location section and click on random city', async ({ page }) => {
      Logger.info('Validate the visibility and click on any random city')
        await location.validateSection();
        await location.clickRandomCity();
    });
    
    test('Loop through all cities and validate navigation', async ({ page }) => {
      Logger.info('Looping cities one by one')
        await location.validateSection();
        await location.loopThroughAllCities();
    });

    test('Verify view all cities link', async ({ page }) => {
        Logger.info('Clicking on the view all cities link');
        await location.verifyAllCityLink();

        
    })
})