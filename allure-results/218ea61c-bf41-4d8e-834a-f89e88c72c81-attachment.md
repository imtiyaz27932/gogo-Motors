# Test info

- Name: Car Tinting - Mobile Web >> Validate Perfect Fit section and Tinting Steps
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:49:9

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: getByText('Perfect Fit, Every Time', { exact: true }) resolved to 2 elements:
    1) <p class="text-[#000000DE] text-[15px] font-semibold ltr:text-left rtl:text-right">Perfect Fit, Every Time</p> aka getByText('Perfect Fit, Every Time').first()
    2) <p class="text-[#000000DE] text-[32px] font-semibold ltr:text-left rtl:text-right">Perfect Fit, Every Time</p> aka getByRole('paragraph').filter({ hasText: 'Perfect Fit, Every Time' })

Call log:
  - expect.toBeVisible with timeout 45000ms
  - waiting for getByText('Perfect Fit, Every Time', { exact: true })

    at CarTinting.verifyPerfectFitSection (D:\gogomotor\pages\CarTinting\tinting.ts:519:44)
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
  - img "shade-4"
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
  419 |
  420 |   async verifyHeadingText() {
  421 |     Logger.info('Verifying main heading text');
  422 |     await expect(this.heading()).toBeVisible();
  423 |     await expect(this.heading()).toHaveText('Tint your car to');
  424 |   }
  425 |
  426 |   async verifyAnimatedTextExists() {
  427 |     Logger.info('Checking at least one visible animated benefit');
  428 |
  429 |     // Look for any span with class=block that is visible (currently shown text)
  430 |     const visibleText = this.page.locator('span.block');
  431 |     await expect(visibleText).toBeVisible();
  432 |
  433 |     const text = await visibleText.textContent();
  434 |     Logger.info(`Visible animated text found: "${text?.trim()}"`);
  435 |   }
  436 |
  437 |
  438 |
  439 |   async verifyStartsFromPrice(expectedPrice: string) {
  440 |     Logger.info(`Validating "Starts from" price: ₹${expectedPrice}`);
  441 |     await expect(this.priceText()).toBeVisible();
  442 |     await expect(this.priceText()).toHaveText(expectedPrice);
  443 |   }
  444 |
  445 |   async verifyTintMyCarCTA() {
  446 |     Logger.info('Verifying "Tint My Car" CTA button');
  447 |     await expect(this.tintMyCarButton()).toBeVisible();
  448 |     await expect(this.tintMyCarButton()).toBeEnabled();
  449 |   }
  450 |
  451 |   async verifyHeroCarImageVisibleOnDesktop() {
  452 |     Logger.info('Verifying hero car image visibility on desktop');
  453 |
  454 |     // Ensure it's only visible on desktop (not mobile)
  455 |     const viewport = this.page.viewportSize();
  456 |     if (viewport && viewport.width >= 768) {
  457 |       await expect(this.heroCarImage()).toBeVisible();
  458 |       Logger.info('Hero car image is visible on desktop');
  459 |     } else {
  460 |       Logger.info('Skipping image check since viewport is not desktop');
  461 |     }
  462 |   }
  463 |
  464 |
  465 |   async verifyGogoPromiseSection() {
  466 |     Logger.info('Verifying "GoGo Motor\'s promise" section');
  467 |
  468 |     // Heading should be visible
  469 |     await expect(this.gogoPromiseHeading()).toBeVisible();
  470 |
  471 |     // Tags should be visible and count should match expected
  472 |     const expectedTags = ['Trusted Expertise', 'Top-Quality Materials', 'Customer First'];
  473 |
  474 |     for (const tagText of expectedTags) {
  475 |       const tag = this.page.getByText(tagText, { exact: true });
  476 |       await expect(tag).toBeVisible();
  477 |       Logger.info(`Verified tag: ${tagText}`);
  478 |     }
  479 |
  480 |     // Or: check total count is 3
  481 |     await expect(this.gogoPromiseTags()).toHaveCount(3);
  482 |   }
  483 |
  484 |   
  485 |   async verifyTintFilmSpecsSection() {
  486 |     Logger.info('Verifying tint film specs section');
  487 |
  488 |     await expect(this.glareReductionHeading()).toBeVisible();
  489 |     Logger.info('Verified glare reduction heading');
  490 |
  491 |     await expect(this.tintDesc()).toBeVisible();
  492 |     Logger.info('Verified tint description text');
  493 |
  494 |     await expect(this.performancePoints()).toHaveCount(7);
  495 |     Logger.info('Verified all 8 performance metric lines');
  496 |
  497 |     await expect(this.tintShadeImages()).toHaveCount(5);
  498 |     Logger.info('Verified 5 tint shade images');
  499 |
  500 |     await expect(this.filmSpecsFooter()).toBeVisible();
  501 |     Logger.info('Verified footer line with MIL, UV, IR specs');
  502 |   }
  503 |
  504 |   // async verifyPerfectFitSection() {
  505 |   //   Logger.info('Validating "Perfect Fit, Every Time" section heading');
  506 |   //   await expect(this.perfectFitSection()).toBeVisible();
  507 |
  508 |   //   Logger.info('Validating presence of all 3 step titles');
  509 |   //   await expect(this.stepTitles()).toHaveCount(3);
  510 |
  511 |   //   Logger.info('Validating presence of all 3 step descriptions');
  512 |   //   await expect(this.stepDescriptions()).toHaveCount(3);
  513 |
  514 |   //   Logger.info('Validating CTA button');
  515 |   //   await expect(this.tintMyCarCTA()).toBeVisible();
  516 |   // }
  517 |   async verifyPerfectFitSection() {
  518 |     Logger.info('Validating "Perfect Fit, Every Time" section heading');
> 519 |     await expect(this.perfectFitHeading()).toBeVisible();
      |                                            ^ Error: expect.toBeVisible: Error: strict mode violation: getByText('Perfect Fit, Every Time', { exact: true }) resolved to 2 elements:
  520 |
  521 |     Logger.info('Validating presence of all 3 step titles');
  522 |     await expect(this.stepTitles()).toHaveCount(3);
  523 |
  524 |     Logger.info('Validating presence of all 3 step descriptions');
  525 |     await expect(this.stepDescriptions()).toHaveCount(3);
  526 |
  527 |     Logger.info('Validating CTA button');
  528 |     await expect(this.tintMyCarCTA()).toBeVisible();
  529 |   }
  530 |
  531 |
  532 |
  533 |
  534 |   async verifyHeroVideoIsVisible() {
  535 |     Logger.info('Validating presence of hero video element');
  536 |     await expect(this.heroVideo()).toBeVisible();
  537 |     Logger.info('Hero video is visible');
  538 |   }
  539 |
  540 |   async verifyBenefitsOfTintingSection() {
  541 |     Logger.info('Validating "Benefits of tinting" heading');
  542 |     await expect(this.benefitsHeading()).toBeVisible();
  543 |
  544 |     Logger.info('Validating "Benefits of tinting" description');
  545 |     await expect(this.benefitsDescription()).toBeVisible();
  546 |
  547 |     Logger.info('"Benefits of tinting" section validated successfully');
  548 |   }
  549 |
  550 | }
```