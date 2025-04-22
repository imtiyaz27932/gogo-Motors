import { test } from '@playwright/test';
import { HeaderPage } from '../../pages/headerPage';



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

    
    test('Verify that user can login', async ({ page }) => {
        test.fail(true, 'Known bug: invalid OTP flow not handled');
        await headerpage.loginWithCountryCode(1, '+966');
        await headerpage.loginWithCountryCode(2, '+91');
    });

    test('Verify loader does not get stuck on invalid OTP', async ({ page }) => {
        test.fail(true, 'Known bug: Loader gets stuck on invalid OTP');
        await headerpage.verifyLoaderStuckOnInvalidOtp();
    });

    test('Verify that un-authenticated user can login through wishlist', async ({ page }) => {
        await headerpage.loginThroughWishlist();

    })

    
});
