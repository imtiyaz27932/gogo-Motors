import { test } from '../../utils/testSetup';
import { ExtendedWarranty } from '../../pages/services/extendedWarranty';
import { DiscountNewCars } from '../../pages/discountNewCarsPage';
import { Logger } from '../../utils/logger';
import { devices, expect } from '@playwright/test';
import { RoadsideAssistantPage } from '../../pages/services/roadsideAssistant';



test.use({
    ...devices['iPhone 15'],
    storageState: './storage/auth.json',
});

test.describe('Extended Warranty - Mobile Web', () => {

    let warranty: ExtendedWarranty;
    let discountNewCars: DiscountNewCars;
    let roadsideAssistant: RoadsideAssistantPage;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('➡ Initializing MOBILE page objects');
        discountNewCars = new DiscountNewCars(page);
        warranty = new ExtendedWarranty(page, discountNewCars);
        roadsideAssistant = new RoadsideAssistantPage(page);

        await warranty.humberginiclick()
        await warranty.services();
        await roadsideAssistant.clickonRoadsideAssistantlink();

        // await warranty.ServiceTab();
    });


    test('Verify E2E flow of Roadside Assistance', async () => {
        Logger.info('✅ Services Tab Clicked Successfully');
        await roadsideAssistant.enterVINDetails();
        await roadsideAssistant.clickBuyCovergatebutton();
        await roadsideAssistant.selectCarBrand();
        await roadsideAssistant.selectcarYear();
        await roadsideAssistant.selectCar();
        await roadsideAssistant.clickPayNowButton();
        await roadsideAssistant.enterCardDetails()
    });

    test('Should verify Roadside Assistant Herosection Elements', async () => {
        Logger.info('➡ Starting Roadside Assistant Hero Section Validation');
        await roadsideAssistant.validateHeroSection();
        Logger.success('✅ Hero Section validated successfully');
    })

    const expectedServiceCards = [
        {
            title: "Battery boost",
            description: "Jump-start support in case of battery failure",
        },
        {
            title: "Tyre change",
            description: "Spare tyre replacement in case of a flat",
        },
        {
            title: "Fuel backup",
            description: "Emergency fuel top-up to reach the nearest station",
        },
        {
            title: "Chauffeur service",
            description: "Free drop-off from tow (out-of-service area)",
        },
        {
            title: "Lockout assistance",
            description: "Door unlocking (major cities, non-damaging only)",
        },
        {
            title: "Limousine service",
            description: "Arranges transport for breakdowns outside the city",
        },
        {
            title: "Towing assistance",
            description: "Towing due to breakdown",
        },
    ];

    test("Validate Roadside Assistance service cards", async ({ page }) => {
        Logger.info("➡ Starting Roadside Assistance service cards validation");
        await roadsideAssistant.validateServiceCards(expectedServiceCards);
    });

    test('should validate all feature cards with correct content', async ({ page }) => {
        await roadsideAssistant.validateTopFeaturesSection();
    });


    test('Validate exclusions section in Roadside Assistance', async ({ browser }) => {

        Logger.info('Waiting for exclusions section to be visible');
        await roadsideAssistant.waitForSectionVisible();

        Logger.info('Validating the count of exclusion items');
        const count = await roadsideAssistant.getExclusionItemsCount();
        expect(count).toBe(6); // Update if the count is expected to change

        Logger.info('Verifying the exclusion text content');
        const exclusionTexts = await roadsideAssistant.getExclusionTexts();
        const expectedTexts = [
            'Accidents or crash-related recovery',
            'Repeat requests for same issue within 72 hrs',
            'Transferring policy to another car',
            'Towing between two garages',
            'Force majeure (flood, fire, riot, war, sandstorm, etc.)',
            'Service without owner’s presence'
        ];

        for (const expectedText of expectedTexts) {
            expect(exclusionTexts).toContain(expectedText);
            Logger.info(`Verified: ${expectedText}`);
        }

    });


    test('Validate 3 steps section in Roadside Assistance', async ({ page }) => {
        Logger.info('Validating section title');
        await roadsideAssistant.validateThreeStepSection();
        await expect(roadsideAssistant.getThreeStepsTitle()).toHaveText('Get roadside assistance in 3 easy steps');

        const expectedStepTitles = ['Enter car details', 'Make payment', 'Get assistance'];
        const actualStepTitles = await roadsideAssistant.getStepTitleTexts();

        Logger.info('Validating step titles');
        for (const step of expectedStepTitles) {
            expect(actualStepTitles).toContain(step);
            Logger.info(`Verified step: ${step}`);
        }

        const expectedDescriptions = [
            'Enter name, contact and car VIN',
            'Pay service amount',
            'Receive our RSA policy and get assistance anytime anywhere',
        ];
        const actualDescriptions = await roadsideAssistant.getStepDescriptionTexts();

        Logger.info('Validating step descriptions');
        for (const desc of expectedDescriptions) {
            expect(actualDescriptions).toContain(desc);
            Logger.info(`Verified description: ${desc}`);
        }
    });
});
