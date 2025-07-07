



// import { expect, Page } from "@playwright/test";
// import { Logger } from "../../utils/logger";

// export class CarTinting {
//   private page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   // Selectors
//   private serviceTab = () => this.page.getByRole("navigation").getByText("Services");
//   private carTintingLink = () => this.page.getByRole("link", { name: "Tinting Shade your ride," });
//   private tintmycarButton = () => this.page.getByRole("button", { name: "Tint My Car" }).first();
//   private sedanButton = () => this.page.locator('button:has-text("Sedan")');
//   private suvButton = () => this.page.locator('button:has-text("SUV")');
//   private glassTitle = () => this.page.locator('h2.text-lg');
//   private amountPayable = () => this.page.locator('div:has-text("Amount Payable") div.flex.items-center >> text=800.00');
//   private checkoutButton = () => this.page.getByRole('button', { name: /Checkout/i });
//   private proceedtopayButton = () => this.page.getByRole('button', { name: 'Proceed to pay' });
//   private continuebutton = () => this.page.getByRole('button', { name: 'Continue' })
//   private continuetoGoGobutton = () => this.page.getByRole('button', { name: 'Continue to GoGo Motor' })

//   // Navigation & Selection
//   async navigateToCarTinting() {
//     Logger.info("Navigating to Car Tinting page");
//     await this.serviceTab().waitFor({ state: "visible", timeout: 15000 });
//     await this.serviceTab().click();

//     await this.carTintingLink().waitFor({ state: "visible", timeout: 15000 });
//     await this.carTintingLink().click();

//     await expect(this.page).toHaveURL("en/vas/tinting");
//     Logger.success("Car Tinting page opened successfully");
//   }

//   async clickTintMyCarButton() {
//     Logger.info("Clicking on Tint My Car button");
//     await this.tintmycarButton().waitFor({ state: "visible", timeout: 15000 });
//     await this.tintmycarButton().click();
//     await expect(this.page).toHaveURL(/.*tinting\/simulator/);
//     await this.page.waitForTimeout(2000);
//     Logger.success("Navigated to Tinting Simulator");
//   }

//   async clickSedan() {
//     Logger.info("Clicking on Sedan car type");
//     await this.sedanButton().waitFor({ state: "visible", timeout: 15000 });
//     await this.sedanButton().click();
//     await this.page.waitForTimeout(2000);
//     Logger.success("Sedan car type selected");
//   }

//   async clickSUV() {
//     Logger.info("Clicking on SUV car type");
//     await this.suvButton().waitFor({ state: "visible", timeout: 15000 });
//     await this.suvButton().click();
//     await this.page.waitForTimeout(2000);
//     Logger.success("SUV car type selected");
//   }

//   async selectGlassByLabel(label: string) {
//     Logger.info(`Selecting glass option: "${label}"`);

//     const img = this.page.getByRole('img', { name: label });

//     // Wait for image to be visible before interacting
//     await img.waitFor({ state: 'visible', timeout: 10000 });

//     // Go up to the clickable card (2 levels up usually)
//     const card = img.locator('xpath=ancestor::div[contains(@class, "min-h-[74px]")]');

//     // Ensure card is visible and stable
//     await card.scrollIntoViewIfNeeded();
//     await card.hover(); // optional: helps with hover-based UI effects
//     await this.page.waitForTimeout(200); // small delay to stabilize
//     await card.click({ force: true });

//     // Wait for the glass panel header to update correctly
//     const header = this.page.locator('h2.text-lg');
//     await expect(header).toHaveText(new RegExp(label, 'i'), { timeout: 15000 });

//     Logger.success(`Glass option "${label}" selected successfully`);
//   }


//   async selectVisibilityByPercentage(percent: string) {
//     Logger.info(`Selecting visibility percentage: ${percent}`);
//     const tile = this.page.locator(`.text-center:has-text("${percent}")`);
//     await tile.first().click();
//   }

//   async validateGlassOptionHeader(expected: string) {
//     await expect(this.glassTitle()).toHaveText(expected);
//   }

//   async validateAmount(expectedAmount: string) {
//     Logger.info(`Validating payable amount is: ${expectedAmount}`);
//     const amountText = await this.amountPayable().textContent();
//     expect(amountText?.trim()).toBe(expectedAmount);
//     Logger.success(`Amount payable is correctly displayed as ${expectedAmount}`);
//   }

//   async clickCheckoutButton() {
//     Logger.info('Clicking the Checkout button');
//     const checkoutBtn = this.checkoutButton();
//     await checkoutBtn.waitFor({ state: 'visible', timeout: 10000 });
//     await checkoutBtn.click();
//     Logger.success('Checkout button clicked successfully');
//   }

//   async clickProceedToPayButton() {
//     Logger.info('Clicking the Proceed to Pay button');
//     const proceedBtn = this.proceedtopayButton();
//     await proceedBtn.waitFor({ state: 'visible', timeout: 10000 });
//     await proceedBtn.click();
//     Logger.success('Proceed to Pay button clicked successfully');
//   }

//   async clickContinueButton() {
//     Logger.info('Clicking the Continue button');
//     const continueBtn = this.continuebutton();
//     await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
//     await continueBtn.click();
//     Logger.success('Continue button clicked successfully');
//   }

//   async selectNextAvailableDay() {
//     const dayCards = this.page.locator('label >> input[name="eachDay"]');
//     const count = await dayCards.count();

//     for (let i = 0; i < count; i++) {
//       const input = dayCards.nth(i);
//       const isChecked = await input.isChecked();
//       if (!isChecked) {
//         const card = input.locator('xpath=..');
//         await card.scrollIntoViewIfNeeded();
//         await card.click();
//         console.log(`✅ Selected next available day`);
//         break;
//       }
//     }
//   }

//   async selectFirstAvailableTimeSlot() {
//     const timeSlots = this.page.locator('label >> input[name="timeSlot"]');
//     const count = await timeSlots.count();

//     for (let i = 0; i < count; i++) {
//       const slot = timeSlots.nth(i);
//       const isDisabled = await slot.isDisabled();
//       if (!isDisabled) {
//         const card = slot.locator('xpath=..');
//         await card.scrollIntoViewIfNeeded();
//         await card.click();
//         console.log(`✅ Selected available time slot`);
//         return;
//       }
//     }

//     throw new Error('❌ No available time slots found.');
//   }

//   async bookNowButtonShouldBeEnabled() {
//     const bookButton = this.page.getByRole('button', { name: 'BOOK NOW' });
//     await expect(bookButton).toBeEnabled({ timeout: 5000 });
//     console.log(`✅ 'BOOK NOW' button is enabled`);
//     await bookButton.click();
//     await this.page.waitForTimeout(2000);
//   }

//   async continueToGoGoMotor() {
//     Logger.info('Clicking Continue to GoGo Motor button');
//     const continueBtn = this.continuetoGoGobutton();
//     await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
//     await continueBtn.click();
//     Logger.success('Continue to GoGo Motor button clicked successfully');
//   }
// }


import { expect, Page } from "@playwright/test";
import { Logger } from "../../utils/logger";

export class CarTinting {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors
  private serviceTab = () => this.page.getByRole("navigation").getByText("Services");
  private carTintingLink = () => this.page.getByRole('link', { name: 'Window Tinting Get cooler' })
  private tintmycarButton = () => this.page.getByRole("button", { name: "Tint My Car" }).first();
  private sedanButton = () => this.page.locator('button:has-text("Sedan")');
  private suvButton = () => this.page.locator('button:has-text("SUV")');
  private glassTitle = () => this.page.locator('h2.text-lg');
  private amountPayable = () => this.page.locator('div:has-text("Amount Payable") div.flex.items-center >> text=800.00');
  private checkoutButton = () => this.page.getByRole('button', { name: /Checkout/i });
  private proceedtopayButton = () => this.page.getByRole('button', { name: 'Proceed to pay' });
  private continuebutton = () => this.page.getByRole('button', { name: 'Continue' })
  private continuetoGoGobutton = () => this.page.getByRole('button', { name: 'Continue to GoGo Motor' })

  // Landing Page selectors

  private heading = () => this.page.locator('p', { hasText: 'Tint your car to' });


  private animatedTextContainer = () => this.page.locator('div').filter({ hasText: 'Improve fuel efficiency' }).first();
  private animatedTexts = () => this.animatedTextContainer().locator('span');

  private priceText = () => this.page.locator('p', { hasText: '800' });
  private tintMyCarButton = () => this.page.getByRole('button', { name: 'Tint My Car', exact: true });
  private heroCarImage = () => this.page.locator('img[src*="hero-car-with-shadow.png"]');


  private gogoPromiseHeading = () => this.page.locator('text=GoGo Motor\'s promise');
  private gogoPromiseTags = () => this.page.locator('div.flex.flex-row.flex-wrap >> div.rounded-full');

  private glareReductionHeading = () => this.page.getByText(/glare reduction/i);
  private tintDesc = () => this.page.locator('text=We use advanced ceramic films');
 
  
  private performancePoints = () => this.page.locator('p[class*="text-[15px]"]', { hasText: '%' });


  // Shade images (5 total)
  private tintShadeImages = () => this.page.locator('img[alt^="Shade"]');
  private filmSpecsFooter = () => this.page.locator('text=MIL Thickness');

  // Heading locator
  private perfectFitHeading = () =>
    this.page.locator('p.text-\\[32px\\].font-semibold').filter({ hasText: 'Perfect Fit, Every Time' });

  // Container
  private perfectFitContainer = () =>
    this.perfectFitHeading().locator('xpath=ancestor::div[contains(@class,"rounded-[26px]")]');

  // Step Titles (escaped)
  private stepTitles = () =>
    this.perfectFitContainer().locator('p.text-\\[15px\\].font-semibold');

  // Step Descriptions
  private stepDescriptions = () =>
    this.perfectFitContainer().locator('p.text-\\[13px\\]');

  

  // Steps Titles
  //private stepTitles = () => this.page.locator('p').filter({ hasText: /Clean & Prep|Cut & Shape|Apply & Smooth/ })

  // Steps Descriptions
 //private stepDescriptions = () => this.page.locator('p').filter({ hasText: /Clean windows|Trim film|Spray solution/ });




  // CTA Button
  private tintMyCarCTA = () => this.page.getByRole('button', { name: /Tint my Car/i });
  private heroVideo = () => this.page.locator('video');

  // Benefits of Tinting Heading
  private benefitsHeading = () =>
    this.page.getByText('Benefits of tinting')

  // Benefits of Tinting Description
  private benefitsDescription = () =>  this.page.locator('p').filter({ hasText: 'Protect your car from expensive surprises with GoGo ProShield.' });







  // Navigation & Flow
  async navigateToCarTinting() {
    Logger.info("Navigating to Car Tinting page");
    await this.serviceTab().waitFor({ state: "visible", timeout: 15000 });
    await this.serviceTab().click();
    await this.carTintingLink().waitFor({ state: "visible", timeout: 15000 });
    await this.carTintingLink().click();
    await expect(this.page).toHaveURL(/.*\/tinting/);
    Logger.success("Car Tinting page opened successfully");
  }

  async clickTintMyCarButton() {
    Logger.info("Clicking on Tint My Car button");
    await this.tintmycarButton().waitFor({ state: "visible", timeout: 15000 });
    await this.tintmycarButton().click();
    await expect(this.page).toHaveURL(/.*tinting\/simulator/);
    await this.page.waitForTimeout(2000);
    Logger.success("Navigated to Tinting Simulator");
  }

  async clickSedan() {
    Logger.info("Clicking on Sedan car type");
    await this.sedanButton().waitFor({ state: "visible", timeout: 15000 });
    await this.sedanButton().click();
    await this.page.waitForTimeout(2000);
    Logger.success("Sedan car type selected");
  }

  async clickSUV() {
    Logger.info("Clicking on SUV car type");
    await this.suvButton().waitFor({ state: "visible", timeout: 15000 });
    await this.suvButton().click();
    await this.page.waitForTimeout(2000);
    Logger.success("SUV car type selected");
  }

  async selectGlassAndVisibility() {
    Logger.info("Selecting glass options and visibility percentages");
    await this.page.getByRole('img', { name: 'Front side glass visibility' }).click()
    await this.page.getByText('50%').first().click();
    await this.page.waitForTimeout(2000)
    Logger.info("Front side glass visibility selected");

    // Select back side glass visibility
    Logger.info("Selecting back side glass visibility");
    await this.page.getByRole('img', { name: 'Back side glass visibility' }).click()
    await this.page.getByText('40%').first().click();
    Logger.info("Back side glass visibility selected");

    // Select rear glass visibility
    Logger.info("Selecting rear glass visibility");
    await this.page.getByRole('img', { name: 'Rear glass visibility' }).click()
    await this.page.getByText('50%').first().click();
    Logger.info("Rear glass visibility selected");

    // Select windshield glass visibility
    Logger.info("Selecting windshield glass visibility");
    await this.page.getByRole('img', { name: 'Windshield glass visibility' }).click()
    await this.page.getByText('85%').first().click();
    Logger.success("Glass options and visibility percentages selected successfully");


  }

  async validateAmount(expectedAmount: string) {
    Logger.info(`Validating payable amount is: ${expectedAmount}`);
    const amountText = await this.amountPayable().textContent();
    expect(amountText?.trim()).toBe(expectedAmount);
    Logger.success(`Amount payable is correctly displayed as ${expectedAmount}`);
  }

  async clickCheckoutButton() {
    Logger.info('Clicking the Checkout button');
    const checkoutBtn = this.checkoutButton();
    await checkoutBtn.waitFor({ state: 'visible', timeout: 10000 });
    await checkoutBtn.click();
    Logger.success('Checkout button clicked successfully');
  }

  async clickProceedToPayButton() {
    Logger.info('Clicking the Proceed to Pay button');
    const proceedBtn = this.proceedtopayButton();
    await proceedBtn.waitFor({ state: 'visible', timeout: 10000 });
    await proceedBtn.click();
    Logger.success('Proceed to Pay button clicked successfully');
  }

  async clickContinueButton() {
    Logger.info('Clicking the Continue button');
    const continueBtn = this.continuebutton();
    await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await continueBtn.click();
    Logger.success('Continue button clicked successfully');
  }

  async selectNextAvailableDay() {
    const dayCards = this.page.locator('label >> input[name="eachDay"]');
    const count = await dayCards.count();

    for (let i = 0; i < count; i++) {
      const input = dayCards.nth(i);
      const isChecked = await input.isChecked();
      if (!isChecked) {
        const card = input.locator('xpath=..');
        await card.scrollIntoViewIfNeeded();
        await card.click();
        Logger.success(`Selected next available day`);
        break;
      }
    }
  }

  async selectFirstAvailableTimeSlot() {
    const timeSlots = this.page.locator('label >> input[name="timeSlot"]');
    const count = await timeSlots.count();

    for (let i = 0; i < count; i++) {
      const slot = timeSlots.nth(i);
      const isDisabled = await slot.isDisabled();
      if (!isDisabled) {
        const card = slot.locator('xpath=..');
        await card.scrollIntoViewIfNeeded();
        await card.click();
        Logger.success(`Selected available time slot`);
        return;
      }
    }

    throw new Error('❌ No available time slots found.');
  }

  async bookNowButtonShouldBeEnabled() {
    const bookButton = this.page.getByRole('button', { name: 'BOOK NOW' });
    await expect(bookButton).toBeEnabled({ timeout: 5000 });
    Logger.success(`'BOOK NOW' button is enabled`);
    await bookButton.click();
    await this.page.waitForTimeout(2000);
  }

  async continueToGoGoMotor() {
    Logger.info('Clicking Continue to GoGo Motor button');
    const continueBtn = this.continuetoGoGobutton();
    await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await continueBtn.click();
    Logger.success('Continue to GoGo Motor button clicked successfully');
  }

  async verifyHeadingText() {
    Logger.info('Verifying main heading text');
    await expect(this.heading()).toBeVisible();
    await expect(this.heading()).toHaveText('Tint your car to');
  }

  async verifyAnimatedTextExists() {
    Logger.info('Checking at least one visible animated benefit');

    // Look for any span with class=block that is visible (currently shown text)
    const visibleText = this.page.locator('span.block');
    await expect(visibleText).toBeVisible();

    const text = await visibleText.textContent();
    Logger.info(`Visible animated text found: "${text?.trim()}"`);
  }



  async verifyStartsFromPrice(expectedPrice: string) {
    Logger.info(`Validating "Starts from" price: ₹${expectedPrice}`);
    await expect(this.priceText()).toBeVisible();
    await expect(this.priceText()).toHaveText(expectedPrice);
  }

  async verifyTintMyCarCTA() {
    Logger.info('Verifying "Tint My Car" CTA button');
    await expect(this.tintMyCarButton()).toBeVisible();
    await expect(this.tintMyCarButton()).toBeEnabled();
  }

  async verifyHeroCarImageVisibleOnDesktop() {
    Logger.info('Verifying hero car image visibility on desktop');

    // Ensure it's only visible on desktop (not mobile)
    const viewport = this.page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(this.heroCarImage()).toBeVisible();
      Logger.info('Hero car image is visible on desktop');
    } else {
      Logger.info('Skipping image check since viewport is not desktop');
    }
  }


  async verifyGogoPromiseSection() {
    Logger.info('Verifying "GoGo Motor\'s promise" section');

    // Heading should be visible
    await expect(this.gogoPromiseHeading()).toBeVisible();

    // Tags should be visible and count should match expected
    const expectedTags = ['Trusted Expertise', 'Top-Quality Materials', 'Customer First'];

    for (const tagText of expectedTags) {
      const tag = this.page.getByText(tagText, { exact: true });
      await expect(tag).toBeVisible();
      Logger.info(`Verified tag: ${tagText}`);
    }

    // Or: check total count is 3
    await expect(this.gogoPromiseTags()).toHaveCount(3);
  }

  
  async verifyTintFilmSpecsSection() {
    Logger.info('Verifying tint film specs section');

    await expect(this.glareReductionHeading()).toBeVisible();
    Logger.info('Verified glare reduction heading');

    await expect(this.tintDesc()).toBeVisible();
    Logger.info('Verified tint description text');

    await expect(this.performancePoints()).toHaveCount(7);
    Logger.info('Verified all 8 performance metric lines');

    await expect(this.tintShadeImages()).toHaveCount(5);
    Logger.info('Verified 5 tint shade images');

    await expect(this.filmSpecsFooter()).toBeVisible();
    Logger.info('Verified footer line with MIL, UV, IR specs');
  }
  async verifyPerfectFitSection() {
    Logger.info('Validating "Perfect Fit, Every Time" section heading');
    await expect(this.perfectFitHeading()).toBeVisible();

    Logger.info('Validating presence of all 3 step titles');
    await expect(this.stepTitles()).toHaveCount(3);

    Logger.info('Validating presence of all 3 step descriptions');
    await expect(this.stepDescriptions()).toHaveCount(3);

  }

  async verifyHeroVideoIsVisible() {
    Logger.info('Validating presence of hero video element');
    await expect(this.heroVideo()).toBeVisible();
    Logger.info('Hero video is visible');
  }

  async verifyBenefitsOfTintingSection() {
    Logger.info('Validating "Benefits of tinting" heading');
    await expect(this.benefitsHeading()).toBeVisible();

    Logger.info('Validating "Benefits of tinting" description');
    await expect(this.benefitsDescription()).toBeVisible();

    Logger.info('"Benefits of tinting" section validated successfully');
  }

}