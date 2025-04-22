import { test } from '../../utils/testSetup';
import { Logger } from '../../utils/logger';
import { UserProfile } from '../../pages/profile/profilePage';
import { userData } from '../../utils/formData';

test.describe('Mojaz Report Test Cases', () => {
    let profile: UserProfile;

    test.use({ storageState: './storage/auth.json' });

    test.beforeEach(async ({ page, headerPage }) => {
        profile = new UserProfile(page);
        Logger.info('Test Setup: Navigating to User profile section...');
        await profile.clickProfileicon()

    });

    test.afterEach(() => {
        Logger.info('Test Teardown: Cleaning up after test execution.');
        Logger.success('Test Teardown Complete: Ready for next test.');
    });

    test('Verify functionality of User profile', async () => {
        await profile.clickProfileLink()
        await profile.fillForm(userData);

    });

    test('Verify functionality of Bookmark', async () => {  // working
        Logger.info('Bookmark functionality test started');
        await profile.bookmarkIcon()
        Logger.success('Bookmark functionality test completed');
    });

    test('Verify functionality of Wishlist', async () => {   // Working 
        Logger.info('wishlist functionality test started')
        await profile.wishlistIcon();
        await profile.transmissionType()
        await profile.wishlistname()
       // await profile.deletewishlist();
        Logger.info('Wishlist functionality test completed')
    })

    test('Verify Logout Functionality', async () => {    // working
        Logger.info('Logout functionality test started');
        await profile.logout();
        Logger.success('Logout functionality test completed');
    });
});