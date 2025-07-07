# Test info

- Name: Car Tinting - Mobile Web >> Validate Perfect Fit section and Tinting Steps
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:49:9

# Error details

```
Error: Timed out 45000ms waiting for expect(locator).toHaveCount(expected)

Locator: locator('p').filter({ hasText: /Clean & Prep|Cut & Shape|Apply & Smooth/ })
Expected: 3
Received: 6
Call log:
  - expect.toHaveCount with timeout 45000ms
  - waiting for locator('p').filter({ hasText: /Clean & Prep|Cut & Shape|Apply & Smooth/ })
    48 × locator resolved to 6 elements
       - unexpected value "6"

    at CarTinting.verifyPerfectFitSection (D:\gogomotor\pages\CarTinting\tinting.ts:503:37)
    at D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:50:9
```

# Page snapshot

```yaml
- banner:
  - link "GoGo Motor - Buy and Sell New & Used Cars in Saudi Arabia":
    - /url: /en
    - img "GoGo Motor - Buy and Sell New & Used Cars in Saudi Arabia"
  - button "Riyadh":
    - img
    - text: Riyadh
    - img
  - button "1":
    - img
    - text: "1"
  - text: Hello, Customer Firstname
  - button "open profile menu":
    - img
  - button "Switch to Arabic":
    - img "Arabic icon"
    - text: عربى
  - navigation "Global": New Cars Buy & Sell Used Cars Deals Services
- main:
  - img "hero"
  - img "hero car"
  - img "hero car glass"
  - img "hero"
  - img "hero"
  - paragraph: Tint your car to
  - text: Improve fuel efficiency Starts from
  - img
  - paragraph: "800"
  - button "Tint My Car"
  - img "Get 5 Years Warranty"
  - text: Get 5 Years Warranty
  - img "Advanced Heat Rejection"
  - text: Advanced Heat Rejection
  - img "Powered by AutoTech"
  - text: Powered by AutoTech
  - img "flower-left"
  - paragraph: GoGo Motor's promise
  - img "flower-right"
  - img
  - paragraph: Trusted Expertise
  - img
  - paragraph: Top-Quality Materials
  - img
  - paragraph: Customer First
  - paragraph: Tint your car in 3 easy steps
  - img
  - paragraph: Configure tint choice
  - paragraph: Blocks up to 60% of solar energy to keep your car cool.
  - img
  - paragraph: Make the Payment and book appointment.
  - paragraph: A trusted dealer picks up your vehicle and applies the tint professionally.
  - img
  - paragraph: Get your car tinted from authorised centre
  - paragraph: Your car is returned with a flawless tint, ready to go.
  - img "glare image"
  - img "shade-1"
  - img "shade-2"
  - img "shade-3"
  - paragraph: 82 glare reduction
  - paragraph: We use advanced ceramic films with precision-fit application and lasting performance
  - paragraph: 16% Solar energy transmittance
  - paragraph: 18% Visible light transmittance
  - paragraph: 0.44 Shading coefficient
  - paragraph: 66% Solar energy absorbance
  - paragraph: 16% Solar energy transmittance
  - paragraph: 16% Visible light reflectance
  - paragraph: 62% Total solar energy rejection
  - paragraph: Autotek IR 20
  - img "Shade 1"
  - img "Shade 2"
  - img "Shade 3"
  - img "Shade 4"
  - img "Shade 5"
  - paragraph: 2 MIL Thickness, 99.9% Ultraviolet reject, 86% Infrared radiation
  - text: Your browser does not support the video tag.
  - paragraph: Perfect Fit, Every Time
  - paragraph: We use advanced tools and computer-cut technology to ensure each tint film fits your car’s windows perfectly—delivering a smooth, bubble-free, factory-finish look with no gaps or imperfections.
  - paragraph: Tint your car in 4 easy steps
  - img "brush"
  - paragraph: Clean & Prep
  - paragraph: Clean windows to remove dust and debris
  - img "brush"
  - paragraph: Cut & Shape
  - paragraph: Trim film to fit and heat-shrink if needed
  - img "brush"
  - paragraph: Apply & Smooth
  - paragraph: Spray solution, apply film, and smooth out bubbles
  - button "Tint my Car"
  - paragraph: Benefits of tinting
  - paragraph: Protect your car from expensive surprises with GoGo ProShield.
  - img
  - paragraph: Privacy & Security
  - paragraph: Keep prying eyes away and protect your valuables
  - img
  - paragraph: Improved Comfort
  - paragraph: Reduce heat, keeping your car cooler and more pleasant inside
  - img
  - paragraph: UV Ray’s protection
  - paragraph: Blocks harmful UV rays that can damage skin and car interiors.
  - img
  - paragraph: Better visibility
  - paragraph: Minimises sun and headlight glare for better visibility.
  - heading "FAQ's" [level=2]
  - paragraph: Got questions? We have Answers
  - button "How long does it take to tint windows on my vehicle?":
    - text: How long does it take to tint windows on my vehicle?
    - img
  - paragraph: "Vehicles vary from one to the next. The average installation time is about an hour. Some factors that may play a part in the time involved are: what kind of vehicle it is; the number of installers working on the vehicle; if there are any unforeseen scenarios that come up, such as a rear deck lid needs to come out; or If old tint removal is involved."
  - button "Why do I see bubbles right after install?":
    - text: Why do I see bubbles right after install?
    - img
  - paragraph: The moisture we use for installation can remain between the film and windows for up to 2 to 3 weeks and sometimes longer in colder climates. Moisture or condensation comes in the forms of haziness and water bubbles or pockets. They clear up and the moisture simply evaporates. Never try to push around any of these water pockets, for this can create air pockets which don’t go away on their own
- region "Notifications Alt+T"
- alert
```

# Test source

```ts
  403 |     await this.page.waitForTimeout(2000);
  404 |   }
  405 |
  406 |   async continueToGoGoMotor() {
  407 |     Logger.info('Clicking Continue to GoGo Motor button');
  408 |     const continueBtn = this.continuetoGoGobutton();
  409 |     await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
  410 |     await continueBtn.click();
  411 |     Logger.success('Continue to GoGo Motor button clicked successfully');
  412 |   }
  413 |
  414 |   async verifyHeadingText() {
  415 |     Logger.info('Verifying main heading text');
  416 |     await expect(this.heading()).toBeVisible();
  417 |     await expect(this.heading()).toHaveText('Tint your car to');
  418 |   }
  419 |
  420 |   async verifyAnimatedTextExists() {
  421 |     Logger.info('Checking at least one visible animated benefit');
  422 |
  423 |     // Look for any span with class=block that is visible (currently shown text)
  424 |     const visibleText = this.page.locator('span.block');
  425 |     await expect(visibleText).toBeVisible();
  426 |
  427 |     const text = await visibleText.textContent();
  428 |     Logger.info(`Visible animated text found: "${text?.trim()}"`);
  429 |   }
  430 |
  431 |
  432 |
  433 |   async verifyStartsFromPrice(expectedPrice: string) {
  434 |     Logger.info(`Validating "Starts from" price: ₹${expectedPrice}`);
  435 |     await expect(this.priceText()).toBeVisible();
  436 |     await expect(this.priceText()).toHaveText(expectedPrice);
  437 |   }
  438 |
  439 |   async verifyTintMyCarCTA() {
  440 |     Logger.info('Verifying "Tint My Car" CTA button');
  441 |     await expect(this.tintMyCarButton()).toBeVisible();
  442 |     await expect(this.tintMyCarButton()).toBeEnabled();
  443 |   }
  444 |
  445 |   async verifyHeroCarImageVisibleOnDesktop() {
  446 |     Logger.info('Verifying hero car image visibility on desktop');
  447 |
  448 |     // Ensure it's only visible on desktop (not mobile)
  449 |     const viewport = this.page.viewportSize();
  450 |     if (viewport && viewport.width >= 768) {
  451 |       await expect(this.heroCarImage()).toBeVisible();
  452 |       Logger.info('Hero car image is visible on desktop');
  453 |     } else {
  454 |       Logger.info('Skipping image check since viewport is not desktop');
  455 |     }
  456 |   }
  457 |
  458 |
  459 |   async verifyGogoPromiseSection() {
  460 |     Logger.info('Verifying "GoGo Motor\'s promise" section');
  461 |
  462 |     // Heading should be visible
  463 |     await expect(this.gogoPromiseHeading()).toBeVisible();
  464 |
  465 |     // Tags should be visible and count should match expected
  466 |     const expectedTags = ['Trusted Expertise', 'Top-Quality Materials', 'Customer First'];
  467 |
  468 |     for (const tagText of expectedTags) {
  469 |       const tag = this.page.getByText(tagText, { exact: true });
  470 |       await expect(tag).toBeVisible();
  471 |       Logger.info(`Verified tag: ${tagText}`);
  472 |     }
  473 |
  474 |     // Or: check total count is 3
  475 |     await expect(this.gogoPromiseTags()).toHaveCount(3);
  476 |   }
  477 |
  478 |   
  479 |   async verifyTintFilmSpecsSection() {
  480 |     Logger.info('Verifying tint film specs section');
  481 |
  482 |     await expect(this.glareReductionHeading()).toBeVisible();
  483 |     Logger.info('Verified glare reduction heading');
  484 |
  485 |     await expect(this.tintDesc()).toBeVisible();
  486 |     Logger.info('Verified tint description text');
  487 |
  488 |     await expect(this.performancePoints()).toHaveCount(7);
  489 |     Logger.info('Verified all 8 performance metric lines');
  490 |
  491 |     await expect(this.tintShadeImages()).toHaveCount(5);
  492 |     Logger.info('Verified 5 tint shade images');
  493 |
  494 |     await expect(this.filmSpecsFooter()).toBeVisible();
  495 |     Logger.info('Verified footer line with MIL, UV, IR specs');
  496 |   }
  497 |
  498 |   async verifyPerfectFitSection() {
  499 |     Logger.info('Validating "Perfect Fit, Every Time" section heading');
  500 |     await expect(this.perfectFitSection()).toBeVisible();
  501 |
  502 |     Logger.info('Validating presence of all 3 step titles');
> 503 |     await expect(this.stepTitles()).toHaveCount(3);
      |                                     ^ Error: Timed out 45000ms waiting for expect(locator).toHaveCount(expected)
  504 |
  505 |     Logger.info('Validating presence of all 3 step descriptions');
  506 |     await expect(this.stepDescriptions()).toHaveCount(3);
  507 |
  508 |     Logger.info('Validating CTA button');
  509 |     await expect(this.tintMyCarCTA()).toBeVisible();
  510 |   }
  511 |
  512 |
  513 |
  514 |   async verifyHeroVideoIsVisible() {
  515 |     Logger.info('Validating presence of hero video element');
  516 |     await expect(this.heroVideo()).toBeVisible();
  517 |     Logger.info('Hero video is visible');
  518 |   }
  519 |
  520 |   async verifyBenefitsOfTintingSection() {
  521 |     Logger.info('Validating "Benefits of tinting" heading');
  522 |     await expect(this.benefitsHeading()).toBeVisible();
  523 |
  524 |     Logger.info('Validating "Benefits of tinting" description');
  525 |     await expect(this.benefitsDescription()).toBeVisible();
  526 |
  527 |     Logger.info('"Benefits of tinting" section validated successfully');
  528 |   }
  529 |
  530 | }
```