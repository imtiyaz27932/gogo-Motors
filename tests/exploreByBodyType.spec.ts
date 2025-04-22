import { test } from '../utils/testSetup'
import { ExploreByBodyTypePage } from '../pages/exploreByBodyType';
import { Logger } from '../utils/logger';

test.describe('Explore By Body Type Section', () => {
    let explorePage: ExploreByBodyTypePage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and initializing Explore By Body Type Page');
        explorePage = new ExploreByBodyTypePage(page);
    });


    test('Verify the section visibility', async () => {
        Logger.info('Check the explore body type car section')
        await explorePage.verifySectionVisibility();
    });

    test('Verify all categories are displayed', async () => {
        Logger.info('Counts total number of body car types in a card')
        await explorePage.getCarBodyTypeCount();
    });

    test('Verify category navigation', async () => {
        Logger.info('Clicking on Each body type car one by one')
        await explorePage.clickEachCarBodyType();
    });

    test('Validate swiper navigation functionality', async () => {
        Logger.info('Checking the swipper funcationality')
        await explorePage.validateSwiperNavigation();
    });
});
