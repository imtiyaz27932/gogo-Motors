# Test info

- Name: Car Tinting - Mobile Web >> Validate Perfect Fit section and Tinting Steps
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:49:9

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('p').filter({ hasText: /^Perfect Fit, Every Time$/ }) resolved to 2 elements:
    1) <p class="text-[#000000DE] text-[15px] font-semibold ltr:text-left rtl:text-right">Perfect Fit, Every Time</p> aka getByText('Perfect Fit, Every Time').first()
    2) <p class="text-[#000000DE] text-[32px] font-semibold ltr:text-left rtl:text-right">Perfect Fit, Every Time</p> aka getByRole('paragraph').filter({ hasText: 'Perfect Fit, Every Time' })

Call log:
  - expect.toBeVisible with timeout 45000ms
  - waiting for locator('p').filter({ hasText: /^Perfect Fit, Every Time$/ })

    at CarTinting.verifyPerfectFitSection (D:\gogomotor\pages\CarTinting\tinting.ts:529:44)
    at D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:50:23
```

# Page snapshot

```yaml
- banner:
  - link "GoGo Motor - Buy and Sell New & Used Cars in Saudi Arabia":
    - /url: /en
    - img "GoGo Motor - Buy and Sell New & Used Cars in Saudi Arabia"
  - button "login":
    - img
    - text: Login
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
  - img "shade-3"
  - img "shade-4"
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
  429 |   async verifyHeadingText() {
  430 |     Logger.info('Verifying main heading text');
  431 |     await expect(this.heading()).toBeVisible();
  432 |     await expect(this.heading()).toHaveText('Tint your car to');
  433 |   }
  434 |
  435 |   async verifyAnimatedTextExists() {
  436 |     Logger.info('Checking at least one visible animated benefit');
  437 |
  438 |     // Look for any span with class=block that is visible (currently shown text)
  439 |     const visibleText = this.page.locator('span.block');
  440 |     await expect(visibleText).toBeVisible();
  441 |
  442 |     const text = await visibleText.textContent();
  443 |     Logger.info(`Visible animated text found: "${text?.trim()}"`);
  444 |   }
  445 |
  446 |
  447 |
  448 |   async verifyStartsFromPrice(expectedPrice: string) {
  449 |     Logger.info(`Validating "Starts from" price: ₹${expectedPrice}`);
  450 |     await expect(this.priceText()).toBeVisible();
  451 |     await expect(this.priceText()).toHaveText(expectedPrice);
  452 |   }
  453 |
  454 |   async verifyTintMyCarCTA() {
  455 |     Logger.info('Verifying "Tint My Car" CTA button');
  456 |     await expect(this.tintMyCarButton()).toBeVisible();
  457 |     await expect(this.tintMyCarButton()).toBeEnabled();
  458 |   }
  459 |
  460 |   async verifyHeroCarImageVisibleOnDesktop() {
  461 |     Logger.info('Verifying hero car image visibility on desktop');
  462 |
  463 |     // Ensure it's only visible on desktop (not mobile)
  464 |     const viewport = this.page.viewportSize();
  465 |     if (viewport && viewport.width >= 768) {
  466 |       await expect(this.heroCarImage()).toBeVisible();
  467 |       Logger.info('Hero car image is visible on desktop');
  468 |     } else {
  469 |       Logger.info('Skipping image check since viewport is not desktop');
  470 |     }
  471 |   }
  472 |
  473 |
  474 |   async verifyGogoPromiseSection() {
  475 |     Logger.info('Verifying "GoGo Motor\'s promise" section');
  476 |
  477 |     // Heading should be visible
  478 |     await expect(this.gogoPromiseHeading()).toBeVisible();
  479 |
  480 |     // Tags should be visible and count should match expected
  481 |     const expectedTags = ['Trusted Expertise', 'Top-Quality Materials', 'Customer First'];
  482 |
  483 |     for (const tagText of expectedTags) {
  484 |       const tag = this.page.getByText(tagText, { exact: true });
  485 |       await expect(tag).toBeVisible();
  486 |       Logger.info(`Verified tag: ${tagText}`);
  487 |     }
  488 |
  489 |     // Or: check total count is 3
  490 |     await expect(this.gogoPromiseTags()).toHaveCount(3);
  491 |   }
  492 |
  493 |   
  494 |   async verifyTintFilmSpecsSection() {
  495 |     Logger.info('Verifying tint film specs section');
  496 |
  497 |     await expect(this.glareReductionHeading()).toBeVisible();
  498 |     Logger.info('Verified glare reduction heading');
  499 |
  500 |     await expect(this.tintDesc()).toBeVisible();
  501 |     Logger.info('Verified tint description text');
  502 |
  503 |     await expect(this.performancePoints()).toHaveCount(7);
  504 |     Logger.info('Verified all 8 performance metric lines');
  505 |
  506 |     await expect(this.tintShadeImages()).toHaveCount(5);
  507 |     Logger.info('Verified 5 tint shade images');
  508 |
  509 |     await expect(this.filmSpecsFooter()).toBeVisible();
  510 |     Logger.info('Verified footer line with MIL, UV, IR specs');
  511 |   }
  512 |
  513 |   // async verifyPerfectFitSection() {
  514 |   //   Logger.info('Validating "Perfect Fit, Every Time" section heading');
  515 |   //   await expect(this.perfectFitSection()).toBeVisible();
  516 |
  517 |   //   Logger.info('Validating presence of all 3 step titles');
  518 |   //   await expect(this.stepTitles()).toHaveCount(3);
  519 |
  520 |   //   Logger.info('Validating presence of all 3 step descriptions');
  521 |   //   await expect(this.stepDescriptions()).toHaveCount(3);
  522 |
  523 |   //   Logger.info('Validating CTA button');
  524 |   //   await expect(this.tintMyCarCTA()).toBeVisible();
  525 |   // }
  526 |
  527 |   async verifyPerfectFitSection() {
  528 |     Logger.info('Validating "Perfect Fit, Every Time" section heading');
> 529 |     await expect(this.perfectFitHeading()).toBeVisible();
      |                                            ^ Error: expect.toBeVisible: Error: strict mode violation: locator('p').filter({ hasText: /^Perfect Fit, Every Time$/ }) resolved to 2 elements:
  530 |
  531 |     Logger.info('Validating presence of all 3 step titles');
  532 |     await expect(this.stepTitles()).toHaveCount(3);
  533 |
  534 |     Logger.info('Validating presence of all 3 step descriptions');
  535 |     await expect(this.stepDescriptions()).toHaveCount(3);
  536 |
  537 |     Logger.info('Validating CTA button');
  538 |     await expect(this.tintMyCarCTA()).toBeVisible();
  539 |   }
  540 |
  541 |
  542 |
  543 |
  544 |   async verifyHeroVideoIsVisible() {
  545 |     Logger.info('Validating presence of hero video element');
  546 |     await expect(this.heroVideo()).toBeVisible();
  547 |     Logger.info('Hero video is visible');
  548 |   }
  549 |
  550 |   async verifyBenefitsOfTintingSection() {
  551 |     Logger.info('Validating "Benefits of tinting" heading');
  552 |     await expect(this.benefitsHeading()).toBeVisible();
  553 |
  554 |     Logger.info('Validating "Benefits of tinting" description');
  555 |     await expect(this.benefitsDescription()).toBeVisible();
  556 |
  557 |     Logger.info('"Benefits of tinting" section validated successfully');
  558 |   }
  559 |
  560 | }
```