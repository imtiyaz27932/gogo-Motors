import { test } from '../utils/testSetup';
import { Logger } from '../utils/logger';

test.describe('Mojaz Report Tests', () => {

    test.beforeEach(async ({ reports,headerPage }) => {
        await Logger.info('Navigating to Mojaz Reports section');
        await reports.clickSecondCardExploreButton();
    });


    test('Verify the Mojaz Report card explore button opens correct page', async ({ page, reports }) => {

        await Logger.info('Checking the heading and cars text or image is visible');
        await reports.CheckTextVisiblity();

        await Logger.info('Filling the VIN Number and getting the reports');
        await reports.FillVinNumber();

        await Logger.info('Filling phone details');
        await reports.EnterPhoneNumber();
    });

    test('Verify user can get full report for 92', async ({ page, reports }) => {

        await Logger.info('Clicking on Get Full Report 92 Button')
        await reports.GetFullReport92();

        await Logger.info('Enter Phone Number')
        await reports.EnterPhoneNumber();
    });

    test('Verify that Get Free Report button is functional', async ({ page, reports }) => {
    
        await Logger.info('clicking on Get Free Reprot button')
        await reports.GetFreeReport();

        await Logger.info('Enter Phone number')
        await reports.EnterPhoneNumber();
    });


    test('Verify Mojaz Report cards are displayed with correct content', async ({ page, reports }) => {

        await Logger.info('Validating all Mojaz Report cards');
        await reports.validateAllReportCards();
        await Logger.info('Mojaz Report cards validated successfully');
    });

    test('Verify Mojaz Report image is displayed', async ({ page, reports }) => {

        await Logger.info('Checking if Mojaz Report image is visible');
        await reports.verifyReportImageVisible();


    });

    test('Verify Mojaz Reports section elements', async ({ page, reports }) => {

        await Logger.info('Checking if Mojaz Report header is displayed');
        await reports.verifyHeader();

        await Logger.info('Checking if Mojaz Report description is visible');
        await reports.verifyDescription();

        await Logger.info('Checking if all expected feature items are present');
        await reports.verifyFeatureCount(15);

        await Logger.info('Checking if both report buttons are visible');
        await reports.verifyButtons();
    });


});


