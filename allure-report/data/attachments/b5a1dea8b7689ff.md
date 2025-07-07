# Test info

- Name: Car Tinting - Mobile Web >> Validate Perfect Fit section and Tinting Steps
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:49:9

# Error details

```
Error: Timed out 45000ms waiting for expect(locator).toBeVisible()

Locator: getByText('Perfect Fit, Every Time', { exact: true }).first()
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 45000ms
  - waiting for getByText('Perfect Fit, Every Time', { exact: true }).first()

    at CarTinting.verifyPerfectFitSection (D:\gogomotor\pages\CarTinting\tinting.ts:520:44)
    at D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:50:23
```

# Page snapshot

```yaml
- banner:
  - link:
    - /url: /en
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
  - paragraph
  - img
  - paragraph: "800"
  - button
  - img
  - img
  - img
  - img "flower-left"
  - paragraph
  - img "flower-right"
  - img
  - paragraph
  - img
  - paragraph
  - img
  - paragraph
  - paragraph
  - img
  - paragraph
  - paragraph
  - img
  - paragraph
  - paragraph
  - img
  - paragraph
  - paragraph
  - img "glare image"
  - paragraph: "82"
  - paragraph
  - paragraph: 16%
  - paragraph: 18%
  - paragraph: "0.44"
  - paragraph: 66%
  - paragraph: 16%
  - paragraph: 16%
  - paragraph: 62%
  - paragraph: Autotek IR 20
  - img "Shade 1"
  - img "Shade 2"
  - img "Shade 3"
  - img "Shade 4"
  - img "Shade 5"
  - paragraph: 2 , 99.9% , 86%
  - text: Your browser does not support the video tag.
  - paragraph
  - paragraph
  - paragraph
  - img "brush"
  - paragraph
  - paragraph
  - img "brush"
  - paragraph
  - paragraph
  - img "brush"
  - paragraph
  - paragraph
  - button
  - paragraph
  - paragraph
  - img
  - paragraph
  - paragraph
  - img
  - paragraph
  - paragraph
  - img
  - paragraph
  - paragraph
  - img
  - paragraph
  - paragraph
  - heading [level=2]
  - paragraph
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