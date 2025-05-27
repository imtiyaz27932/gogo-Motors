import { test } from '../../utils/testSetup';
import { Logger } from '../../utils/logger';
import { PaymentFlow } from '../../pages/services/mojazPaymentFlow';
import { mojazTestData } from '../../utils/MojazReportData';

test.describe('Mojaz Report Test Cases', () => {
    let payment: PaymentFlow;

    test.use({ storageState: './storage/auth.json' });

    test.beforeEach(async ({ page, headerPage }) => {
        payment = new PaymentFlow(page);
        Logger.info('Test Setup: Navigating to Mojaz Report page via Service Tab...');
        await payment.useServiceTab();
        Logger.success('Test Setup Complete: Successfully navigated to Mojaz Report page.');
       // await payment.validateBrokenLinksAndImages();
    });

    test.afterEach(() => {
        Logger.info('Test Teardown: Cleaning up after test execution.');
        Logger.success('Test Teardown Complete: Ready for next test.');
    });

    test('Verify header title is displayed correctly', async () => {
        Logger.info('Test Start: Verifying the header title is displayed correctly.');
        await payment.getHeaderTitle();
        Logger.success('Test Passed: Header title is visible.');
    });

    test('Verify sub-header text is displayed correctly', async () => {
        Logger.info('Test Start: Verifying the sub-header text is displayed correctly.');
        await payment.getSubHeaderText();
        Logger.success('Test Passed: Sub-header text is visible.');
    });

    test('Verify car image is displayed correctly', async () => {
        Logger.info('Test Start: Verifying the car image is displayed correctly.');
        await payment.validateCarImage();
        Logger.success('Test Passed: Car image is visible.');
    });

    test('Verify E2E flow of Mojaz Report with Payment Flow', async () => {
        Logger.info('Test Start: Verifying the end-to-end flow of Mojaz Payment.');
        await payment.enterVIN(mojazTestData.validVIN);
        Logger.info('VIN entered successfully.');
        await payment.clickGetFreeReport();
        await payment.clickSelectCar();
        await payment.clickSelectYear();
        await payment.clickSelectCar1();
        await payment.clickSelectAutomatic()
        await payment.clickselectfullreport()
        await payment.selectCity();
        await payment.applyPromoCode();
        await payment.fillEmail();
        await payment.cardDetails();
        await payment.clickDetailedReportAndDownloadPDF();
        await payment.handleDownloadPDF();
        Logger.success('Test Passed: E2E flow of Mojaz Payment completed.');
    });

    test('Invalid VIN disables the button', async () => {
        Logger.info('Test Start: Verifying the button is disabled for an invalid VIN.');
        await payment.enterVIN(mojazTestData.invalidVIN);
        await payment.assertButtonIsDisabled();
        Logger.success('Test Passed: Button is disabled for invalid VIN.');
    });

    test('Empty VIN disables the button', async () => {
        Logger.info('Test Start: Verifying the button is disabled for an empty VIN.');
        await payment.enterVIN('');
        await payment.assertButtonIsDisabled();
        Logger.success('Test Passed: Button is disabled for empty VIN.');
    });

    test('Verify "Why Use Mojaz" section is displayed correctly', async () => {
        Logger.info('Test Start: Verifying the "Why Use Mojaz" section is displayed correctly.');
        await payment.validateWhyUseMojazSection();
        Logger.success('Test Passed: "Why Use Mojaz" section is visible and correctly displayed.');
    });

    test('Validate Car Story Section on Mojaz Report Page', async () => {
        await payment.validateCarStorySection();
    });
    
    test('Should navigate to Mojaz Report and validate About Mojaz section', async () => {
        await payment.validateAboutMojazSection();
    
    });
})

