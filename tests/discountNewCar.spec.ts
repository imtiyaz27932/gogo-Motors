import { test } from '../utils/testSetup';
import { DiscountNewCars } from '../pages/discountNewCarsPage';
import { Logger } from '../utils/logger';

test.describe('Header and Discounted New Cars Tests', () => {
    let discountNewCars: DiscountNewCars;

    test.beforeEach(async ({ page,headerPage }) => {
        await Logger.info('Navigating to Mojaz Reports section...');
        discountNewCars = new DiscountNewCars(page);
    });

    test('Verify Discounted New Cars section visibility', async () => {
        await Logger.info('Verifying Discounted New Cars section visibility...');
        await discountNewCars.verifyDiscountCarsSectionVisible();
        await Logger.success('✅ Discounted New Cars section is visible.');
    });

    test('Verify Explore button redirects to the correct page', async () => {
        await Logger.info('Clicking Explore button on first card...');
        await discountNewCars.clickFirstCardExploreButton();

        await Logger.info('Checking eligibility banner...');
        await discountNewCars.checkEligibility();

        await Logger.info('Filling car form details...');
        await discountNewCars.verifyCarForm();

        await Logger.info('Confirming car details...');
        await discountNewCars.ConfirmCarDetails(); 

        await Logger.info('Filling phone number and OTP...');
        await discountNewCars.fillPhoneDetails();

        await Logger.success('✅ Closing the modal...');
        await discountNewCars.closeModal();
    });

    test('Verify viewing all FAQs', async () => {
        await Logger.info('Navigating to FAQ section...');
        await discountNewCars.clickFirstCardExploreButton();

        await Logger.info('Scrolling and previewing FAQs...');
        await discountNewCars.previewFAQs();

        await Logger.success('✅ FAQs preview verified successfully.');
    });

    test.skip('Verify discount on Used Cars', async () => {
        await Logger.info('Clicking Explore for Used Cars Discount...');
        await discountNewCars.clickFirstCardExploreButton();

        await Logger.info('Checking eligibility for Used Cars...');
        await discountNewCars.checkEligibility();

        await Logger.info('Applying Used Cars Discount...');
        await discountNewCars.usedCarsDiscount();

        await Logger.info('Confirming Used Car details...');
        await discountNewCars.ConfirmCarDetails(); 

        await Logger.info('Filling phone details and OTP...');
        await discountNewCars.fillPhoneDetails();

        await Logger.success('✅ Closing modal after Used Cars discount flow...');
        await discountNewCars.closeModal();
    });
});
