# Test info

- Name: Car Tinting - Mobile Web >> Validate Tinting Benefits section
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:57:9

# Error details

```
Error: Timed out 45000ms waiting for expect(locator).toBeVisible()

Locator: locator('//p[text()=\'Benefits of tinting\' and contains(@class, \'text-[32px]\') and contains(@class, \'font-semibold\')]')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 45000ms
  - waiting for locator('//p[text()=\'Benefits of tinting\' and contains(@class, \'text-[32px]\') and contains(@class, \'font-semibold\')]')

    at CarTinting.verifyBenefitsOfTintingSection (D:\gogomotor\pages\CarTinting\tinting.ts:523:42)
    at D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:58:23
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
```

# Test source

```ts
  423 |
  424 |     // Look for any span with class=block that is visible (currently shown text)
  425 |     const visibleText = this.page.locator('span.block');
  426 |     await expect(visibleText).toBeVisible();
  427 |
  428 |     const text = await visibleText.textContent();
  429 |     Logger.info(`Visible animated text found: "${text?.trim()}"`);
  430 |   }
  431 |
  432 |
  433 |
  434 |   async verifyStartsFromPrice(expectedPrice: string) {
  435 |     Logger.info(`Validating "Starts from" price: ₹${expectedPrice}`);
  436 |     await expect(this.priceText()).toBeVisible();
  437 |     await expect(this.priceText()).toHaveText(expectedPrice);
  438 |   }
  439 |
  440 |   async verifyTintMyCarCTA() {
  441 |     Logger.info('Verifying "Tint My Car" CTA button');
  442 |     await expect(this.tintMyCarButton()).toBeVisible();
  443 |     await expect(this.tintMyCarButton()).toBeEnabled();
  444 |   }
  445 |
  446 |   async verifyHeroCarImageVisibleOnDesktop() {
  447 |     Logger.info('Verifying hero car image visibility on desktop');
  448 |
  449 |     // Ensure it's only visible on desktop (not mobile)
  450 |     const viewport = this.page.viewportSize();
  451 |     if (viewport && viewport.width >= 768) {
  452 |       await expect(this.heroCarImage()).toBeVisible();
  453 |       Logger.info('Hero car image is visible on desktop');
  454 |     } else {
  455 |       Logger.info('Skipping image check since viewport is not desktop');
  456 |     }
  457 |   }
  458 |
  459 |
  460 |   async verifyGogoPromiseSection() {
  461 |     Logger.info('Verifying "GoGo Motor\'s promise" section');
  462 |
  463 |     // Heading should be visible
  464 |     await expect(this.gogoPromiseHeading()).toBeVisible();
  465 |
  466 |     // Tags should be visible and count should match expected
  467 |     const expectedTags = ['Trusted Expertise', 'Top-Quality Materials', 'Customer First'];
  468 |
  469 |     for (const tagText of expectedTags) {
  470 |       const tag = this.page.getByText(tagText, { exact: true });
  471 |       await expect(tag).toBeVisible();
  472 |       Logger.info(`Verified tag: ${tagText}`);
  473 |     }
  474 |
  475 |     // Or: check total count is 3
  476 |     await expect(this.gogoPromiseTags()).toHaveCount(3);
  477 |   }
  478 |
  479 |   
  480 |   async verifyTintFilmSpecsSection() {
  481 |     Logger.info('Verifying tint film specs section');
  482 |
  483 |     await expect(this.glareReductionHeading()).toBeVisible();
  484 |     Logger.info('Verified glare reduction heading');
  485 |
  486 |     await expect(this.tintDesc()).toBeVisible();
  487 |     Logger.info('Verified tint description text');
  488 |
  489 |     await expect(this.performancePoints()).toHaveCount(7);
  490 |     Logger.info('Verified all 8 performance metric lines');
  491 |
  492 |     await expect(this.tintShadeImages()).toHaveCount(5);
  493 |     Logger.info('Verified 5 tint shade images');
  494 |
  495 |     await expect(this.filmSpecsFooter()).toBeVisible();
  496 |     Logger.info('Verified footer line with MIL, UV, IR specs');
  497 |   }
  498 |
  499 |   async verifyPerfectFitSection() {
  500 |     Logger.info('Validating "Perfect Fit, Every Time" section heading');
  501 |     await expect(this.perfectFitSection()).toBeVisible();
  502 |
  503 |     Logger.info('Validating presence of all 3 step titles');
  504 |     await expect(this.stepTitles()).toHaveCount(3);
  505 |
  506 |     Logger.info('Validating presence of all 3 step descriptions');
  507 |     await expect(this.stepDescriptions()).toHaveCount(3);
  508 |
  509 |     Logger.info('Validating CTA button');
  510 |     await expect(this.tintMyCarCTA()).toBeVisible();
  511 |   }
  512 |
  513 |
  514 |
  515 |   async verifyHeroVideoIsVisible() {
  516 |     Logger.info('Validating presence of hero video element');
  517 |     await expect(this.heroVideo()).toBeVisible();
  518 |     Logger.info('Hero video is visible');
  519 |   }
  520 |
  521 |   async verifyBenefitsOfTintingSection() {
  522 |     Logger.info('Validating "Benefits of tinting" heading');
> 523 |     await expect(this.benefitsHeading()).toBeVisible();
      |                                          ^ Error: Timed out 45000ms waiting for expect(locator).toBeVisible()
  524 |
  525 |     Logger.info('Validating "Benefits of tinting" description');
  526 |     await expect(this.benefitsDescription()).toBeVisible();
  527 |
  528 |     Logger.info('"Benefits of tinting" section validated successfully');
  529 |   }
  530 |
  531 | }
```