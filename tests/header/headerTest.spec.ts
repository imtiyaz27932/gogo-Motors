import { test } from '@playwright/test';
import { HeaderPage } from '../../pages/headerPage';
import { Logger } from '../../utils/logger';



test.describe('Header tests', () => {
    let headerpage: HeaderPage;

    test.beforeEach(async ({ page }) => {
        headerpage = new HeaderPage(page);
        await headerpage.navigateToHomePage();
    });

    test('Verify that all the elements are displayed in the header', async ({ page }) => {
        await headerpage.verifyHeaderElements();
    });

    test('Verify that all the elements are clickable in the header top section', async ({ page }) => {
        await headerpage.verifyClickFunctionality()
    });

    test('Verify that all elements in the navigation menu are clickable', async ({ page }) => {
        await headerpage.verifyTabNavigation();
    });
    test('Verify that un-authenticated user can login through wishlist', async ({ page }) => {
        Logger.info('Testing login through Wishlist');
    
        // Check if the user is already logged in
        const isLoggedIn = await headerpage.isLoggedIn();
        if (isLoggedIn) {
            Logger.info('User is already logged in. Logging out first.');
            await headerpage.logout();
        }
    
        // Perform login through Wishlist
        await headerpage.loginThroughWishlist();
        Logger.success('Login through Wishlist and logout functionality verified successfully');
        
    });

});

