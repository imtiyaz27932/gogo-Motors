import { Logger } from '../utils/logger';
import { test} from '../utils/testSetup'
import { DreamCarSearch } from '../pages/dreamCarPage';

test.describe('Header tests', () => {
    let dreamcar: DreamCarSearch;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to Home Page and the checking functionality for Dream car section')
        await page.addStyleTag({ content: `* { transition: none !important; animation: none !important; }` });
        dreamcar = new DreamCarSearch(page);
    });

    test('Find Your Dream Car by using New Car Search', async ({ page }) => {
        Logger.info('Selecting the New car toggle')
        await dreamcar.searchForDreamCar();
    });

});
