# Test info

- Name: Car Tinting - Mobile Web >> Verify hero image is visible on desktop
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:36:9

# Error details

```
Error: Timed out 45000ms waiting for expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected pattern: /.*\/tinting/
Received: <element(s) not found>
Call log:
  - expect.toHaveURL with timeout 45000ms
  - waiting for locator(':root')

    at CarTinting.navigateToCarTinting (D:\gogomotor\pages\CarTinting\tinting.ts:280:29)
    at D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:25:9
```

# Test source

```ts
  180 | //     await continueBtn.click();
  181 | //     Logger.success('Continue to GoGo Motor button clicked successfully');
  182 | //   }
  183 | // }
  184 |
  185 |
  186 | import { expect, Page } from "@playwright/test";
  187 | import { Logger } from "../../utils/logger";
  188 |
  189 | export class CarTinting {
  190 |   private page: Page;
  191 |
  192 |   constructor(page: Page) {
  193 |     this.page = page;
  194 |   }
  195 |
  196 |   // Selectors
  197 |   private serviceTab = () => this.page.getByRole("navigation").getByText("Services");
  198 |   private carTintingLink = () => this.page.getByRole('link', { name: 'Window Tinting Get cooler' })
  199 |   private tintmycarButton = () => this.page.getByRole("button", { name: "Tint My Car" }).first();
  200 |   private sedanButton = () => this.page.locator('button:has-text("Sedan")');
  201 |   private suvButton = () => this.page.locator('button:has-text("SUV")');
  202 |   private glassTitle = () => this.page.locator('h2.text-lg');
  203 |   private amountPayable = () => this.page.locator('div:has-text("Amount Payable") div.flex.items-center >> text=800.00');
  204 |   private checkoutButton = () => this.page.getByRole('button', { name: /Checkout/i });
  205 |   private proceedtopayButton = () => this.page.getByRole('button', { name: 'Proceed to pay' });
  206 |   private continuebutton = () => this.page.getByRole('button', { name: 'Continue' })
  207 |   private continuetoGoGobutton = () => this.page.getByRole('button', { name: 'Continue to GoGo Motor' })
  208 |
  209 |   // Landing Page selectors
  210 |
  211 |   private heading = () => this.page.locator('p', { hasText: 'Tint your car to' });
  212 |
  213 |
  214 |   private animatedTextContainer = () => this.page.locator('div').filter({ hasText: 'Improve fuel efficiency' }).first();
  215 |   private animatedTexts = () => this.animatedTextContainer().locator('span');
  216 |
  217 |   private priceText = () => this.page.locator('p', { hasText: '800' });
  218 |   private tintMyCarButton = () => this.page.getByRole('button', { name: 'Tint My Car', exact: true });
  219 |   private heroCarImage = () => this.page.locator('img[src*="hero-car-with-shadow.png"]');
  220 |
  221 |
  222 |   private gogoPromiseHeading = () => this.page.locator('text=GoGo Motor\'s promise');
  223 |   private gogoPromiseTags = () => this.page.locator('div.flex.flex-row.flex-wrap >> div.rounded-full');
  224 |
  225 |   private glareReductionHeading = () => this.page.getByText(/glare reduction/i);
  226 |   private tintDesc = () => this.page.locator('text=We use advanced ceramic films');
  227 |  
  228 |   
  229 |   private performancePoints = () => this.page.locator('p[class*="text-[15px]"]', { hasText: '%' });
  230 |
  231 |
  232 |   // Shade images (5 total)
  233 |   private tintShadeImages = () => this.page.locator('img[alt^="Shade"]');
  234 |   private filmSpecsFooter = () => this.page.locator('text=MIL Thickness');
  235 |
  236 |   // Hero Section Container
  237 |  // private perfectFitSection = () => this.page.locator('div').filter({ hasText: 'Perfect Fit, Every Time' }).first();
  238 |   private perfectFitHeading = () =>
  239 |     this.page.getByText('Perfect Fit, Every Time', { exact: true });
  240 |
  241 |   // Scoped container
  242 |   private perfectFitContainer = () =>
  243 |     this.perfectFitHeading().locator('xpath=ancestor::div[contains(@class,"rounded-[26px]")]');
  244 |
  245 |   // Correct selector with escaped square brackets for step titles
  246 |   private stepTitles = () =>
  247 |     this.perfectFitContainer().locator('p.text-\\[15px\\].font-semibold');
  248 |
  249 |   // Step descriptions (escaped square brackets)
  250 |   private stepDescriptions = () =>
  251 |     this.perfectFitContainer().locator('p.text-\\[13px\\]').filter({
  252 |       hasText: /Clean windows|Trim film|Spray solution/,
  253 |     });
  254 |   
  255 |
  256 |   // CTA Button
  257 |   private tintMyCarCTA = () => this.page.getByRole('button', { name: /Tint my Car/i });
  258 |   private heroVideo = () => this.page.locator('video');
  259 |
  260 |   // Benefits of Tinting Heading
  261 |   private benefitsHeading = () =>
  262 |     this.page.getByText('Benefits of tinting')
  263 |
  264 |   // Benefits of Tinting Description
  265 |   private benefitsDescription = () =>  this.page.locator('p').filter({ hasText: 'Protect your car from expensive surprises with GoGo ProShield.' });
  266 |
  267 |
  268 |
  269 |
  270 |
  271 |
  272 |
  273 |   // Navigation & Flow
  274 |   async navigateToCarTinting() {
  275 |     Logger.info("Navigating to Car Tinting page");
  276 |     await this.serviceTab().waitFor({ state: "visible", timeout: 15000 });
  277 |     await this.serviceTab().click();
  278 |     await this.carTintingLink().waitFor({ state: "visible", timeout: 15000 });
  279 |     await this.carTintingLink().click();
> 280 |     await expect(this.page).toHaveURL(/.*\/tinting/);
      |                             ^ Error: Timed out 45000ms waiting for expect(locator).toHaveURL(expected)
  281 |     Logger.success("Car Tinting page opened successfully");
  282 |   }
  283 |
  284 |   async clickTintMyCarButton() {
  285 |     Logger.info("Clicking on Tint My Car button");
  286 |     await this.tintmycarButton().waitFor({ state: "visible", timeout: 15000 });
  287 |     await this.tintmycarButton().click();
  288 |     await expect(this.page).toHaveURL(/.*tinting\/simulator/);
  289 |     await this.page.waitForTimeout(2000);
  290 |     Logger.success("Navigated to Tinting Simulator");
  291 |   }
  292 |
  293 |   async clickSedan() {
  294 |     Logger.info("Clicking on Sedan car type");
  295 |     await this.sedanButton().waitFor({ state: "visible", timeout: 15000 });
  296 |     await this.sedanButton().click();
  297 |     await this.page.waitForTimeout(2000);
  298 |     Logger.success("Sedan car type selected");
  299 |   }
  300 |
  301 |   async clickSUV() {
  302 |     Logger.info("Clicking on SUV car type");
  303 |     await this.suvButton().waitFor({ state: "visible", timeout: 15000 });
  304 |     await this.suvButton().click();
  305 |     await this.page.waitForTimeout(2000);
  306 |     Logger.success("SUV car type selected");
  307 |   }
  308 |
  309 |   async selectGlassAndVisibility() {
  310 |     Logger.info("Selecting glass options and visibility percentages");
  311 |     await this.page.getByRole('img', { name: 'Front side glass visibility' }).click()
  312 |     await this.page.getByText('50%').first().click();
  313 |     await this.page.waitForTimeout(2000)
  314 |     Logger.info("Front side glass visibility selected");
  315 |
  316 |     // Select back side glass visibility
  317 |     Logger.info("Selecting back side glass visibility");
  318 |     await this.page.getByRole('img', { name: 'Back side glass visibility' }).click()
  319 |     await this.page.getByText('40%').first().click();
  320 |     Logger.info("Back side glass visibility selected");
  321 |
  322 |     // Select rear glass visibility
  323 |     Logger.info("Selecting rear glass visibility");
  324 |     await this.page.getByRole('img', { name: 'Rear glass visibility' }).click()
  325 |     await this.page.getByText('50%').first().click();
  326 |     Logger.info("Rear glass visibility selected");
  327 |
  328 |     // Select windshield glass visibility
  329 |     Logger.info("Selecting windshield glass visibility");
  330 |     await this.page.getByRole('img', { name: 'Windshield glass visibility' }).click()
  331 |     await this.page.getByText('85%').first().click();
  332 |     Logger.success("Glass options and visibility percentages selected successfully");
  333 |
  334 |
  335 |   }
  336 |
  337 |   async validateAmount(expectedAmount: string) {
  338 |     Logger.info(`Validating payable amount is: ${expectedAmount}`);
  339 |     const amountText = await this.amountPayable().textContent();
  340 |     expect(amountText?.trim()).toBe(expectedAmount);
  341 |     Logger.success(`Amount payable is correctly displayed as ${expectedAmount}`);
  342 |   }
  343 |
  344 |   async clickCheckoutButton() {
  345 |     Logger.info('Clicking the Checkout button');
  346 |     const checkoutBtn = this.checkoutButton();
  347 |     await checkoutBtn.waitFor({ state: 'visible', timeout: 10000 });
  348 |     await checkoutBtn.click();
  349 |     Logger.success('Checkout button clicked successfully');
  350 |   }
  351 |
  352 |   async clickProceedToPayButton() {
  353 |     Logger.info('Clicking the Proceed to Pay button');
  354 |     const proceedBtn = this.proceedtopayButton();
  355 |     await proceedBtn.waitFor({ state: 'visible', timeout: 10000 });
  356 |     await proceedBtn.click();
  357 |     Logger.success('Proceed to Pay button clicked successfully');
  358 |   }
  359 |
  360 |   async clickContinueButton() {
  361 |     Logger.info('Clicking the Continue button');
  362 |     const continueBtn = this.continuebutton();
  363 |     await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
  364 |     await continueBtn.click();
  365 |     Logger.success('Continue button clicked successfully');
  366 |   }
  367 |
  368 |   async selectNextAvailableDay() {
  369 |     const dayCards = this.page.locator('label >> input[name="eachDay"]');
  370 |     const count = await dayCards.count();
  371 |
  372 |     for (let i = 0; i < count; i++) {
  373 |       const input = dayCards.nth(i);
  374 |       const isChecked = await input.isChecked();
  375 |       if (!isChecked) {
  376 |         const card = input.locator('xpath=..');
  377 |         await card.scrollIntoViewIfNeeded();
  378 |         await card.click();
  379 |         Logger.success(`Selected next available day`);
  380 |         break;
```