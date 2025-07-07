# Test info

- Name: Car Tinting - Mobile Web >> Validate Perfect Fit section and Tinting Steps
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:49:9

# Error details

```
Error: Timed out 45000ms waiting for expect(locator).toBeVisible()

Locator: getByText('Perfect Fit, Every Time', { exact: true }).first()
Expected: visible
Received: hidden
Call log:
  - expect.toBeVisible with timeout 45000ms
  - waiting for getByText('Perfect Fit, Every Time', { exact: true }).first()
    31 × locator resolved to <p class="text-[#000000DE] text-[15px] font-semibold ltr:text-left rtl:text-right">Perfect Fit, Every Time</p>
       - unexpected value "hidden"

    at CarTinting.verifyPerfectFitSection (D:\gogomotor\pages\CarTinting\tinting.ts:520:44)
    at D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:50:23
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
  - text: Keep it cool Starts from
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
  - paragraph: 75 glare reduction
  - paragraph: We use advanced ceramic films with precision-fit application and lasting performance
  - paragraph: 25% Solar energy transmittance
  - paragraph: 38% Visible light transmittance
  - paragraph: 0.51 Shading coefficient
  - paragraph: 69% Solar energy absorbance
  - paragraph: 25% Solar energy transmittance
  - paragraph: 7% Visible light reflectance
  - paragraph: 56% Total solar energy rejection
  - paragraph: Autotek IR 35
  - img "Shade 1"
  - img "Shade 2"
  - img "Shade 3"
  - img "Shade 4"
  - img "Shade 5"
  - paragraph: 2 MIL Thickness, 99.58% Ultraviolet reject, 86% Infrared radiation
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
  420 |
  421 |   async verifyHeadingText() {
  422 |     Logger.info('Verifying main heading text');
  423 |     await expect(this.heading()).toBeVisible();
  424 |     await expect(this.heading()).toHaveText('Tint your car to');
  425 |   }
  426 |
  427 |   async verifyAnimatedTextExists() {
  428 |     Logger.info('Checking at least one visible animated benefit');
  429 |
  430 |     // Look for any span with class=block that is visible (currently shown text)
  431 |     const visibleText = this.page.locator('span.block');
  432 |     await expect(visibleText).toBeVisible();
  433 |
  434 |     const text = await visibleText.textContent();
  435 |     Logger.info(`Visible animated text found: "${text?.trim()}"`);
  436 |   }
  437 |
  438 |
  439 |
  440 |   async verifyStartsFromPrice(expectedPrice: string) {
  441 |     Logger.info(`Validating "Starts from" price: ₹${expectedPrice}`);
  442 |     await expect(this.priceText()).toBeVisible();
  443 |     await expect(this.priceText()).toHaveText(expectedPrice);
  444 |   }
  445 |
  446 |   async verifyTintMyCarCTA() {
  447 |     Logger.info('Verifying "Tint My Car" CTA button');
  448 |     await expect(this.tintMyCarButton()).toBeVisible();
  449 |     await expect(this.tintMyCarButton()).toBeEnabled();
  450 |   }
  451 |
  452 |   async verifyHeroCarImageVisibleOnDesktop() {
  453 |     Logger.info('Verifying hero car image visibility on desktop');
  454 |
  455 |     // Ensure it's only visible on desktop (not mobile)
  456 |     const viewport = this.page.viewportSize();
  457 |     if (viewport && viewport.width >= 768) {
  458 |       await expect(this.heroCarImage()).toBeVisible();
  459 |       Logger.info('Hero car image is visible on desktop');
  460 |     } else {
  461 |       Logger.info('Skipping image check since viewport is not desktop');
  462 |     }
  463 |   }
  464 |
  465 |
  466 |   async verifyGogoPromiseSection() {
  467 |     Logger.info('Verifying "GoGo Motor\'s promise" section');
  468 |
  469 |     // Heading should be visible
  470 |     await expect(this.gogoPromiseHeading()).toBeVisible();
  471 |
  472 |     // Tags should be visible and count should match expected
  473 |     const expectedTags = ['Trusted Expertise', 'Top-Quality Materials', 'Customer First'];
  474 |
  475 |     for (const tagText of expectedTags) {
  476 |       const tag = this.page.getByText(tagText, { exact: true });
  477 |       await expect(tag).toBeVisible();
  478 |       Logger.info(`Verified tag: ${tagText}`);
  479 |     }
  480 |
  481 |     // Or: check total count is 3
  482 |     await expect(this.gogoPromiseTags()).toHaveCount(3);
  483 |   }
  484 |
  485 |   
  486 |   async verifyTintFilmSpecsSection() {
  487 |     Logger.info('Verifying tint film specs section');
  488 |
  489 |     await expect(this.glareReductionHeading()).toBeVisible();
  490 |     Logger.info('Verified glare reduction heading');
  491 |
  492 |     await expect(this.tintDesc()).toBeVisible();
  493 |     Logger.info('Verified tint description text');
  494 |
  495 |     await expect(this.performancePoints()).toHaveCount(7);
  496 |     Logger.info('Verified all 8 performance metric lines');
  497 |
  498 |     await expect(this.tintShadeImages()).toHaveCount(5);
  499 |     Logger.info('Verified 5 tint shade images');
  500 |
  501 |     await expect(this.filmSpecsFooter()).toBeVisible();
  502 |     Logger.info('Verified footer line with MIL, UV, IR specs');
  503 |   }
  504 |
  505 |   // async verifyPerfectFitSection() {
  506 |   //   Logger.info('Validating "Perfect Fit, Every Time" section heading');
  507 |   //   await expect(this.perfectFitSection()).toBeVisible();
  508 |
  509 |   //   Logger.info('Validating presence of all 3 step titles');
  510 |   //   await expect(this.stepTitles()).toHaveCount(3);
  511 |
  512 |   //   Logger.info('Validating presence of all 3 step descriptions');
  513 |   //   await expect(this.stepDescriptions()).toHaveCount(3);
  514 |
  515 |   //   Logger.info('Validating CTA button');
  516 |   //   await expect(this.tintMyCarCTA()).toBeVisible();
  517 |   // }
  518 |   async verifyPerfectFitSection() {
  519 |     Logger.info('Validating "Perfect Fit, Every Time" section heading');
> 520 |     await expect(this.perfectFitHeading()).toBeVisible();
      |                                            ^ Error: Timed out 45000ms waiting for expect(locator).toBeVisible()
  521 |
  522 |     Logger.info('Validating presence of all 3 step titles');
  523 |     await expect(this.stepTitles()).toHaveCount(3);
  524 |
  525 |     Logger.info('Validating presence of all 3 step descriptions');
  526 |     await expect(this.stepDescriptions()).toHaveCount(3);
  527 |
  528 |     Logger.info('Validating CTA button');
  529 |     await expect(this.tintMyCarCTA()).toBeVisible();
  530 |   }
  531 |
  532 |
  533 |
  534 |
  535 |   async verifyHeroVideoIsVisible() {
  536 |     Logger.info('Validating presence of hero video element');
  537 |     await expect(this.heroVideo()).toBeVisible();
  538 |     Logger.info('Hero video is visible');
  539 |   }
  540 |
  541 |   async verifyBenefitsOfTintingSection() {
  542 |     Logger.info('Validating "Benefits of tinting" heading');
  543 |     await expect(this.benefitsHeading()).toBeVisible();
  544 |
  545 |     Logger.info('Validating "Benefits of tinting" description');
  546 |     await expect(this.benefitsDescription()).toBeVisible();
  547 |
  548 |     Logger.info('"Benefits of tinting" section validated successfully');
  549 |   }
  550 |
  551 | }
```