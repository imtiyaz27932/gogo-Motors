import { test } from '../../utils/testSetup';
import { Logger } from '../../utils/logger';
import { CarTinting } from '../../pages/CarTinting/tinting';
import { RoadsideAssistantPage } from '../../pages/services/roadsideAssistant';

test.use({
    storageState: './storage/auth.json',
});

test.describe('Car Tinting - Mobile Web', () => {
    let tinting: CarTinting;
    let roadassist: RoadsideAssistantPage;

    const glassVisibilityMap = {
        'Front side glass visibility': '50%',
        'Back side glass visibility': '40%',
        'Rear glass visibility': '50%',
        'Windshield glass visibility': '85%',
    };

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('➡ Initializing MOBILE page objects');
        tinting = new CarTinting(page);
        roadassist = new RoadsideAssistantPage(page);
        await tinting.navigateToCarTinting();
    });


    test('Validate hero section content and CTA button', async () => {
        await tinting.verifyHeadingText();
        await tinting.verifyAnimatedTextExists();
        await tinting.verifyStartsFromPrice('800');
        await tinting.verifyTintMyCarCTA();
    });

    test('Verify hero image is visible on desktop', async () => {
        await tinting.verifyHeroCarImageVisibleOnDesktop();
    });

    test('Validate GoGo Promise section', async () => {
        await tinting.verifyGogoPromiseSection();
    });

    test('Validate Tint Film Specs section', async () => {
        await tinting.verifyTintFilmSpecsSection();
    });


    test.skip('Validate Perfect Fit section and Tinting Steps', async () => {
        await tinting.verifyPerfectFitSection();
    });

    test('Validate presence of hero section video', async () => {
        await tinting.verifyHeroVideoIsVisible();
    });

    test('Validate Tinting Benefits section', async () => {
        await tinting.verifyBenefitsOfTintingSection();
    });

    test.skip('E2E flow: Car Tinting flow for SUV', async () => {
        await tinting.clickTintMyCarButton();
        await tinting.clickSUV();

        for (const [glassLabel, percent] of Object.entries(glassVisibilityMap)) {
            await tinting.selectGlassAndVisibility();
            await tinting.validateAmount('800.00');
            await tinting.clickCheckoutButton();
            await tinting.clickProceedToPayButton();
            await tinting.clickContinueButton();
            await tinting.selectNextAvailableDay();
            await tinting.selectFirstAvailableTimeSlot();
            await tinting.bookNowButtonShouldBeEnabled();
            await tinting.clickProceedToPayButton();
            await roadassist.enterCardDetails();
            await tinting.continueToGoGoMotor();
        }
    });

    test.skip('E2E flow: Car Tinting flow for Sedan', async () => {
        await tinting.clickTintMyCarButton();
        await tinting.clickSedan();

        for (const [glassLabel, percent] of Object.entries(glassVisibilityMap)) {
            await tinting.selectGlassAndVisibility();
            await tinting.validateAmount('800.00');
            await tinting.clickCheckoutButton();
            await tinting.clickProceedToPayButton();
            await tinting.clickContinueButton();
            await tinting.selectNextAvailableDay();
            await tinting.selectFirstAvailableTimeSlot();
            await tinting.bookNowButtonShouldBeEnabled();
            await tinting.clickProceedToPayButton();
            await roadassist.enterCardDetails();
            await tinting.continueToGoGoMotor();
        }
    });
});