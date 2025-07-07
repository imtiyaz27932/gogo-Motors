


import { Page, expect, Locator } from "@playwright/test";
import { DiscountNewCars } from "../discountNewCarsPage";
import { Logger } from "../../utils/logger";
import customerDetails from '../../testData/customerDetails.json'
import emailDetails from '../../testData/emailDetails.json'
import { CardUtils } from "../../utils/cardDetails";
import promoCode from '../../testData/promoCode.json'
import kilometerDetails from '../../testData/kilometerDetails.json'
import contactUsDetails from '../../testData/contactUsDetails.json'
import carDetails from '../../testData/carDetails.json'
import vinDetails from '../../testData/vinDetails.json'


export class ExtendedWarranty {
    private page: Page;
    private discountNewCars: DiscountNewCars;

    constructor(page: Page, discountNewCars: DiscountNewCars) {
        this.page = page;
        this.discountNewCars = discountNewCars;

    }

    // Selectors
    private serviceTab = () => this.page.getByRole('navigation').getByText('Services');
    private extendedwarntylink = (name: string) => this.page.getByRole('link', { name, exact: true });
    private additionalDetailsFields = (fields: string) => this.page.locator(`input[name="${fields}"]`)
    private headingByName = (name: string) => this.page.getByRole('heading', { name, exact: true });
    private inputBykilometers = (kilometer: string) => this.page.locator(`input[name="${kilometer}"]`);
    private paynowbtn = () => this.page.locator(`//*[text()="Pay Now"]`)
    private writeToUsEmail = () => this.page.locator('a[href^="mailto:"]').first()

    // ContactUs Locator
    private callText = (text: string) => this.page.locator('p', { hasText: text });
    private storeBadgeImg = (platform: 'google' | 'apple') => this.page.locator(`img[src*="${platform === 'google' ? 'google_play.png' : 'app_store.png'}"]`);
    private emailDetailsFields = (addressFields: string) => this.page.getByRole('textbox', { name: addressFields, exact: true });
    private buttonNames = (buttonNames: string) => this.page.getByRole('button', { name: buttonNames, exact: true })


    // Mobile locator
    private extendedwarn = () => this.page.getByText('Extended Warranty', { exact: true }).nth(2)

    // DROPDOWNS

    private selectDropdown = (label: string) => this.page.locator(`label:text("${label}")`).locator('..').locator('.select-area');
    private selectMakeDropdown = () => this.selectDropdown('Select Make *');
    private selectModelDropdown = () => this.selectDropdown('Select Model *');
    private manufacturerYearDropdown = () => this.selectDropdown('Manufacturing Year *');
    private trimDropdown = () => this.selectDropdown('Trim *');

    // Dropdown options 
    private dropdownOption = (optionText: string) => this.page.getByRole('option', { name: optionText }).or(this.page.locator(`text="${optionText}"`));

    private makeOption = (make: string) => this.dropdownOption(make);
    private modelOption = (model: string) => this.dropdownOption(model);
    private yearOption = (year: string) => this.dropdownOption(year);
    private trimOption = (trim: string) => this.dropdownOption(trim);

    // Promise locators
    private featureCard = (text: string) => this.page.getByText(text, { exact: true });

    // Protect ur car locators
    private sectionContainer = () => this.page.locator('div.gogo-container:has(h2:text("Protect your car in 4 easy steps"))');
    private sectionHeading = () => this.sectionContainer().locator('h2');
    private stepItems = () => this.sectionContainer().locator('div.grid > div.relative');

    // Fast Claim locators
    private fastcalimtexts = (texts: string) => this.page.locator(`text=${texts}`)


    //VIN Details 

    private vinDetailsfields(placeholderText: string) {
        return this.page.getByPlaceholder(placeholderText);
    }

    // used cars button
    private usedcarbtn = () => this.page.getByRole('link', { name: 'Explore used cars' });









    async ServiceTab() {
        await this.serviceTab().hover();
        await this.extendedwarntylink('Extended Warranty Get').click();
        await this.page.waitForTimeout(2000);
    }

    async getCovergabtn() {
        await this.buttonNames('Get Coverage Now').click()

    }

    // async clickonNewTabButton() {
    //     await this.page.waitForTimeout(3000)
    //     await this.buttonNames('New').click();
    //     await this.page.waitForTimeout(1000)
    // }
    async verifyCarForm() {
        await this.discountNewCars.verifyCarForm();
    }

    async ConfirmCarDetails() {
        await this.discountNewCars.ConfirmCarDetails();
    }

    async enterVINDetails() {
        Logger.info('Filling VIN details...');
        const vinField = this.vinDetailsfields('eg: 1HGBH41JXH1000000');
        await vinField.waitFor({ state: 'visible', timeout: 10000 });
        await vinField.fill(vinDetails.VIN);

        const dateField = this.vinDetailsfields('eg: MM/DD/YYYY');
        await dateField.waitFor({ state: 'visible', timeout: 10000 });
        await dateField.click();

        await this.page.waitForSelector('.rmdp-calendar', { state: 'visible', timeout: 10000 });
        const today = new Date();
        const currentDay = today.getDate().toString();
        const calendarDay = this.page.locator('.rmdp-calendar').locator(`text="${currentDay}"`);
        await calendarDay.waitFor({ state: 'visible', timeout: 5000 });
        await calendarDay.click();

        const kmField = this.vinDetailsfields('eg: 42000');
        await kmField.waitFor({ state: 'visible', timeout: 10000 });
        await kmField.fill(kilometerDetails.endKilometer);

        const confirmBtn = this.buttonNames('Confirm');
        await confirmBtn.waitFor({ state: 'visible', timeout: 10000 });
        await confirmBtn.click();

        Logger.success('VIN details entered and confirmed.');
    }

    async NationalID() {
        Logger.info('Filling National ID and DOB...');
        const nationalIdField = this.additionalDetailsFields('customerNationalId');
        await nationalIdField.waitFor({ state: 'visible', timeout: 10000 });
        await nationalIdField.fill(customerDetails.nationalId);

        const dobField = this.additionalDetailsFields('dateOfBirth');
        await dobField.waitFor({ state: 'visible', timeout: 10000 });
        await dobField.fill(customerDetails.dateOfBirth);

        const confirmBtn = this.buttonNames('Confirm');
        await confirmBtn.scrollIntoViewIfNeeded();
        await confirmBtn.waitFor({ state: 'visible', timeout: 10000 });
        await confirmBtn.click();

        Logger.success('National ID and DOB submitted.');
    }

    async KmDetails() {
        await this.inputBykilometers('kms_driven').fill(kilometerDetails.kilometerDrivern);
        await this.inputBykilometers('MwEndKm').fill(kilometerDetails.endKilometer);
    }

    private getFutureDate() {
        const today = new Date();
        today.setMonth(today.getMonth() + 1);
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${month}/${day}/${year}`;
    }

    private async checkForBlockingMessages(): Promise<boolean> {
        const alreadyRegisteredMsg = this.page.getByText('Your vehicle is already');
        const selectAnotherCarBtn = this.page.getByRole('button', { name: 'Select Another Car' });

        try {
            await Promise.race([
                expect(alreadyRegisteredMsg).toBeVisible({ timeout: 5000 }),
                expect(selectAnotherCarBtn).toBeVisible({ timeout: 5000 }),
            ]);
            console.log("⚠️ Vehicle already registered or 'Select Another Car' message shown.");
            return true;
        } catch (error) {
            if (
                error instanceof Error &&
                (error.message.includes("expect.toBeVisible") || error.message.includes("Timeout"))
            ) {
                console.log("✅ No registration conflict. Proceeding.");
                return false;
            }
            throw error;
        }
    }

    async selectEndDate(): Promise<boolean> {
        const futureDate = this.getFutureDate();
        console.log(`📅 Selecting end date: ${futureDate}`);

        await this.additionalDetailsFields('MwEndDate').click();
        await this.additionalDetailsFields('MwEndDate').fill(futureDate);
        await this.page.locator('body').click();
        await this.page.locator('body').press('Enter')
        await this.page.waitForTimeout(1000);
        await this.inputBykilometers('MwEndKm').fill(kilometerDetails.endKilometer);
        await this.buttonNames('Get Packages').click();
        await this.page.waitForTimeout(2000)
        const isBlocked = await this.checkForBlockingMessages();
        if (isBlocked) {
            console.log("⛔️ Vehicle already registered. Skipping further steps.");
            return false;
        }

        return true;
    }

    async SelectPlan() {
        await this.buttonNames('Select This Plan').click();
        await this.page.waitForTimeout(4000)
    }

    async applyPromoCode() {
        await this.emailDetailsFields('eg FIRST300').fill(promoCode.promocode);
        await this.page.getByRole('button', { name: 'Apply' }).click();

        await this.page.waitForTimeout(4000);






        // async payWithoutPromoCode() {
        //     await this.paynowbtn.scrollIntoViewIfNeeded();

        //     await Promise.all([
        //       this.page.waitForNavigation({ waitUntil: 'load' }),
        //       this.paynowbtn.click(),
        //     ]);

        //     await this.enterCardDetails();
        //   }


    }

    async usedCarsDiscount() {
        await this.discountNewCars.usedCarsDiscount();
    }

    async kmdeatils(): Promise<boolean> {
        await this.inputBykilometers('kms_driven').fill(kilometerDetails.kilometerDrivern);
        await this.page.waitForTimeout(1000);
        await this.buttonNames('Get Packages').click();
        await this.page.waitForLoadState('networkidle');

        const isBlocked = await this.checkForBlockingMessages();
        if (isBlocked) {
            console.log("⛔️ Vehicle already registered (used car). Skipping further steps.");
            return false;
        }

        return true;
    }


    async skipPromocode() {
        await this.paynowbtn().scrollIntoViewIfNeeded();
        await this.paynowbtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000)
        // await this.buttonNames('Go to Home Page').click();
    }


    async validateContactUsSection() {
        await this.headingByName('Contact Us').scrollIntoViewIfNeeded()
        await expect(this.headingByName('Contact Us')).toBeVisible();
        await expect(this.callText('Write To Us')).toHaveText(contactUsDetails.writeToUsLabel);
        await expect(this.writeToUsEmail()).toHaveText(contactUsDetails.writeToUsEmail);
        await expect(this.callText('Call Us')).toHaveText(contactUsDetails.callUsLabel);
        await expect(this.callText('8002440258')).toHaveText(contactUsDetails.callUsNumber);
    }


    async validateDownloadAppSection() {
        await this.headingByName('Download our app for a more convenient experience!').scrollIntoViewIfNeeded()
        await expect(this.headingByName('Download our app for a more convenient experience!')).toBeVisible();
        await expect(this.callText('Please visit your app store to download the app.')).toBeVisible();
        await expect(this.storeBadgeImg('google')).toBeVisible();
        await expect(this.storeBadgeImg('apple')).toBeVisible();
    }

    async enterEmail() {
        // await this.emailDetailsFields('Email Address').fill(emailDetails.email);
        // Logger.info('Entered email address.');

        // await this.buttonNames('Proceed').click();
        // await this.page.waitForTimeout(2000);

        // await this.emailDetailsFields('Please enter OTP').fill(emailDetails.otp);
        // Logger.info('Entered OTP.');

        // await this.buttonNames('Verify').click();
        // await this.page.waitForTimeout(5000);

        await this.page.mouse.wheel(0, 400);

        Logger.info('Clicking on Pay Now...');
        await this.page.getByRole('button', { name: 'Pay Now' }).waitFor({ state: 'visible' });

        const cardUtils = new CardUtils(this.page);

        await this.page.getByRole('button', { name: 'Pay Now' }).click();
        await this.page.waitForTimeout(10000);

        await cardUtils.fillTestCardDetails();
        await this.page.mouse.wheel(0, 500);
        await this.page.waitForTimeout(4000)
        await this.buttonNames('Pay now').scrollIntoViewIfNeeded();
        await this.buttonNames('Pay now').click();
         await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Pay Now' }).click()
        //await this.page.waitForTimeout(8000);



        // await this.page.waitForLoadState('networkidle', { timeout: 240000 });
        await this.page.locator('a:has-text("Complete Now ->")').scrollIntoViewIfNeeded()
        await this.page.waitForTimeout(2000)
        await this.page.locator('a:has-text("Complete Now ->")').click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('a:has-text("Complete Now ->")').click();

        await this.page.waitForTimeout(4000);
        await this.page.waitForLoadState('load')
        await this.page.getByRole('textbox', { name: 'Enter store password' }).fill(emailDetails.storePassword);
        await this.buttonNames('Enter').click();
        await this.page.waitForLoadState('networkidle')
        Logger.info('Payment method page loaded successfully.');
        Logger.info('Pay Now Button clicked successfully');
    }



    // Mobile methods
    async humberginiclick() {
        //await this.page.getByRole('button', { name: 'mobile menu toggle' }).first().click()
        await this.page.waitForTimeout(3000)
        await this.buttonNames('mobile menu toggle').click()

    }

    async services() {
        await this.page.waitForTimeout(3000)
        await this.buttonNames('Services').first().click();
        await this.page.waitForTimeout(3000)

    }

    async clickonExtendedWarranty() {
        await this.extendedwarn().click();
        await this.page.waitForTimeout(4000);
        // await this.page.waitForLoadState('networkidle');
    }

    async ConfirmCarDetailsMobile() {
        // Select Make
        await this.selectMakeDropdown().scrollIntoViewIfNeeded();
        await this.selectMakeDropdown().click();
        await this.makeOption(carDetails.make).click();
        await this.page.waitForTimeout(500);

        // Select Year
        await this.manufacturerYearDropdown().scrollIntoViewIfNeeded();
        await this.manufacturerYearDropdown().click();
        await this.yearOption(carDetails.year).click();
        await this.page.waitForTimeout(500);

        // Select Model
        await this.selectModelDropdown().scrollIntoViewIfNeeded();
        await this.selectModelDropdown().click();
        await this.modelOption(carDetails.model).click();
        await this.page.waitForTimeout(500);

        // Select Trim
        await this.trimDropdown().scrollIntoViewIfNeeded();
        await this.trimDropdown().click();
        await this.trimOption(carDetails.trim).click();
        await this.page.waitForTimeout(500);

        // Confirm
        Logger.info('Clicking on button 1')
        await this.buttonNames('Confirm').click();


    }

    async Nationalid() {
        await this.additionalDetailsFields('customerNationalId').fill(customerDetails.nationalId);
        await this.page.waitForTimeout(2000);
        await this.additionalDetailsFields('dateOfBirth').fill(customerDetails.dateOfBirth);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(5000)
        // await this.page.getByText('Confirm', { exact: true }).scrollIntoViewIfNeeded();
        await this.page.mouse.wheel(0, 400)
        this.page.locator('//*[text()="Confirm"]').click()
        //await this.page.getByText('Confirm', { exact: true }).click({ force: true });
        await this.page.waitForTimeout(4000);
        //await this.page.waitForLoadState('networkidle');
    }




    async validateGogoPromiseSection() {

        await expect(this.featureCard("GoGo Motor's promise")).toBeVisible({ timeout: 10000 });
        Logger.success('Promise title visible')
        await expect(this.featureCard('Care by Petromin Experts')).toBeVisible();
        Logger.success('Care By Pateromin is visible')
        await expect(this.featureCard('Bank Approved')).toBeVisible()
        Logger.info('Bank Approved is visible')
        await expect(this.featureCard('Comprehensive Coverage')).toBeVisible();
        Logger.info('Covergae is visible')
    }


    async validateSection() {
        Logger.info('Validating Protect your car section');
        await expect(this.sectionHeading()).toBeVisible();
        await expect(this.stepItems()).toHaveCount(4);

        const expectedSteps = [
            {
                title: '1. Add your car',
                desc: 'Provide the necessary vehicle and contact information.'
            },
            {
                title: '2. Buy a Package',
                desc: 'Buy the ProShield warranty package that suits your car'
            },
            {
                title: '3. Schedule Vehicle Survey',
                desc: 'Book a car survey to proceed with policy activation'
            },
            {
                title: '4. Warranty Issued',
                desc: 'Once approved, your policy will be sent to your email and mobile'
            }
        ];
        for (let i = 0; i < expectedSteps.length; i++) {
            const step = this.stepItems().nth(i);
            const titleEl = step.locator('h3');
            const descEl = step.locator('p');
            const imgEl = step.locator('img');

            const titleText = await titleEl.textContent();
            const descText = await descEl.textContent();
            const imgAlt = await imgEl.getAttribute('alt');
            const imgSrc = await imgEl.getAttribute('src');

            Logger.info(`Step ${i + 1}:`);
            Logger.info(`  Title: ${titleText}`);
            Logger.info(`  Description: ${descText}`);
            Logger.info(`  Image ALT: ${imgAlt}`);
            Logger.info(`  Image SRC: ${imgSrc}`);

            await expect(titleEl).toHaveText(expectedSteps[i].title);
            await expect(descEl).toHaveText(expectedSteps[i].desc);
            await expect(imgEl).toBeVisible();
        }

        Logger.success('Protect your car section validated successfully');
    }


    async validateFastClaims() {
        await this.headingByName('Fast claims, no fuss').scrollIntoViewIfNeeded()
        Logger.info('Starting validation for Fast Claims section')
        await expect(this.headingByName('Fast claims, no fuss')).toBeVisible();
        await expect(this.fastcalimtexts('Check Warranty CoverageConfirm if your car is covered under your warranty')).toBeVisible();
        await expect(this.fastcalimtexts('Walk in PetrominNo')).toBeVisible();
        await expect(this.fastcalimtexts('Inspection & RepairWe’ll')).toBeVisible();
        await expect(this.fastcalimtexts('You are on the go againYour')).toBeVisible();

    }

    async CheckEligibility(): Promise<void> {
        Logger.info('Scrolling to the "Check Eligibility Now" button');
        const checkEligibilityButton = this.buttonNames('Check Eligibility Now');

        // Ensure the button is visible and scroll into view
        await checkEligibilityButton.scrollIntoViewIfNeeded();
        await expect(checkEligibilityButton).toBeVisible({ timeout: 5000 });

        Logger.info('Clicking on the "Check Eligibility Now" button');
        await checkEligibilityButton.click();

        // Wait for the page to process the action
        await this.page.waitForLoadState('networkidle');
        Logger.success('"Check Eligibility Now" button clicked successfully');
    }

    async exploreUsedCars(): Promise<void> {
        Logger.info('Scrolling to the "Explore Used Cars" button');


        // Ensure the button is visible and scroll into view
        await this.usedcarbtn().scrollIntoViewIfNeeded();
        await this.page.waitForLoadState('networkidle')
        await expect(this.usedcarbtn()).toBeVisible({ timeout: 10000 });

        Logger.info('Clicking on the "Explore Used Cars" button');
        await this.usedcarbtn().click();

        // Wait for the page to navigate to the expected URL
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/\/used-cars\/riyadh-surveyed/, { timeout: 10000 });
        Logger.success('"Explore Used Cars" button clicked and navigated successfully');
    }

    async buyExtendedWarranty(): Promise<void> {
        Logger.info('Scrolling to the "Buy Extended Warranty" button');

        // Locate the "Buy Extended Warranty" button
        const buyExtendedWarrantyButton = this.page.locator('span').filter({ hasText: 'Buy Extended Warranty' });

        // Ensure the button is visible and scroll into view
        await buyExtendedWarrantyButton.scrollIntoViewIfNeeded();
        await buyExtendedWarrantyButton.waitFor({ state: 'visible' });

        Logger.info('Clicking on the "Buy Extended Warranty" button');
        await buyExtendedWarrantyButton.click();

        // Wait for the page to process the action and navigate
        Logger.success('"Buy Extended Warranty" button clicked successfully');
        Logger.success('Navigated to the Extended Warranty Details page successfully');
    }

    async byNowProcess(): Promise<void> {
        Logger.info('Locating and clicking the "Buy Now" button');

        // Locate and ensure the "Buy Now" button is visible
        const buyNowButton = this.buttonNames('Buy Now');
        await buyNowButton.scrollIntoViewIfNeeded();
        await buyNowButton.waitFor({ state: 'visible' });

        // Click the "Buy Now" button
        await buyNowButton.click();
        Logger.success('"Buy Now" button clicked successfully');

        // Wait for the "Proceed to Checkout" button to appear
        Logger.info('Waiting for the "Proceed to Checkout" button to become visible');
        const proceedToCheckoutButton = this.buttonNames('Proceed to Checkout');
        await proceedToCheckoutButton.scrollIntoViewIfNeeded();
        await proceedToCheckoutButton.waitFor({ state: 'visible' });

        // Click the "Proceed to Checkout" button
        await proceedToCheckoutButton.click();
        Logger.success('"Proceed to Checkout" button clicked successfully');

        // Wait for the page to process the action
        await this.page.waitForLoadState('networkidle');
        Logger.success('Buy Now process completed successfully');
    }
}