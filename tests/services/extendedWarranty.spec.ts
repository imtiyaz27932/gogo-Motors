

import { test } from '../../utils/testSetup';
import { ExtendedWarranty } from '../../pages/services/extendedWarranty';
import { DiscountNewCars } from '../../pages/discountNewCarsPage';
import { Logger } from '../../utils/logger';
import { expect } from '@playwright/test';

test.use({ storageState: './storage/auth.json' });

test.describe('Extended Warranty in Header Test Cases', () => {
	let warranty: ExtendedWarranty;
	let discountNewCars: DiscountNewCars;

	test.beforeEach(async ({ page, headerPage }) => {
		Logger.info('➡ Initializing page objects and navigating to Extended Warranty tab');
		discountNewCars = new DiscountNewCars(page);
		warranty = new ExtendedWarranty(page, discountNewCars);
		await warranty.ServiceTab();
	});

	test('Verify Extended Warranty basic tab click', async () => {
		Logger.info('✅ Services Tab Clicked Successfully');
	});

	test('Verify Extended Warranty Flow for New Cars', async () => {
		Logger.info('➡ Starting New Car Warranty Flow');

		await warranty.checkEligibilityFromDiscountNewCars();
		Logger.info('✅ Eligibility banner clicked');

		await warranty.verifyCarForm();
		Logger.info('✅ Car form verified');

		await warranty.ConfirmCarDetails();
		Logger.info('✅ Car details confirmed');

		await warranty.NationalID();
		Logger.info('✅ National ID and DOB entered');

		await warranty.KmDetails();
		Logger.info('✅ Kilometer details filled');

		const shouldContinue = await warranty.selectEndDate();
		if (!shouldContinue) {
			Logger.warn('⛔ Vehicle already registered. Flow skipped as expected ✅');
			return;
		}

		await warranty.SelectPlan();
		Logger.info('✅ Plan selected');

		await warranty.applyPromoCode();
		Logger.info('✅ Promo code applied and payment completed');

		Logger.info('Enter email details');
		await warranty.enterEmail();
	
		Logger.info('🎉 New car warranty flow completed successfully');

		
	});


	
	test('Verify Extended Warranty Flow for New Cars without Promocode', async () => {
		Logger.info('➡ Starting New Car Warranty Flow without Promocode');

		await warranty.checkEligibilityFromDiscountNewCars();
		Logger.info('✅ Eligibility banner clicked');

		await warranty.verifyCarForm();
		Logger.info('✅ Car form verified');

		await warranty.ConfirmCarDetails();
		Logger.info('✅ Car details confirmed');

		await warranty.NationalID();
		Logger.info('✅ National ID and DOB entered');

		await warranty.KmDetails();
		Logger.info('✅ Kilometer details filled');

		const shouldContinue = await warranty.selectEndDate();
		if (!shouldContinue) {
			Logger.warn('⛔ Vehicle already registered. Flow skipped as expected ✅');
			return;
		}

		await warranty.SelectPlan();
		Logger.info('✅ Plan selected');

        Logger.info('Paying without Promocode')
		await warranty.skipPromocode();

	});
	
	test('Verify Extended Warranty Flow for Used Cars', async () => {
		Logger.info('➡ Starting Used Car Warranty Flow');

		await warranty.checkEligibilityFromDiscountNewCars();
		Logger.info('✅ Eligibility banner clicked');

		await warranty.usedCarsDiscount();
		Logger.info('✅ Switched to Used Car tab');

		await warranty.ConfirmCarDetails();
		Logger.info('✅ Car details confirmed');

		await warranty.NationalID();
		Logger.info('✅ National ID and DOB entered');

		const shouldContinue = await warranty.kmdeatils();
		if (!shouldContinue) {
			Logger.warn('⛔ Vehicle already registered. Skipping the rest of the flow.');
			return;
		}

		await warranty.SelectPlan();
		Logger.info('✅ Plan selected');

		await warranty.applyPromoCode();
		Logger.info('✅ Promo code applied and payment completed');

		Logger.info('🎉 Used car warranty flow completed successfully');
	});



	test('Verify GOGO Proshield heading is visible', async () => {

		Logger.info('Checking the visiblility and Text proshield heading');
		await warranty.gogoProshield();
	});

	test('should display all benefits correctly', async () => {

		await warranty.verifyBenefitsSectionVisible();
		await warranty.verifyAllBenefitsVisible();

	})

	test('Validate Extended Warranty Eligibility Section', async () => {

		Logger.info('Validating the eligibilitysection')
		await warranty.validateEligibilitySection();
	});
	
	test('should display the correct process steps', async () => {

		Logger.info('Validate Section Title')
		await warranty.validateSectiontitle();
	});
	
	test('Validate Contact Us section', async () => {
         
		Logger.info('Validating Contact Us section')
		await warranty.validateContactUsSection();
	});
	
	test('Validate Download App section', async () => {

		Logger.info('Validating the Download app section')
		await warranty.validateDownloadAppSection();
	  });
});
