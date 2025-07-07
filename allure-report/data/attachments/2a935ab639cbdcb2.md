# Test info

- Name: Car Tinting - Mobile Web >> Validate Tinting Benefits section
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:57:9

# Error details

```
Error: Timed out 45000ms waiting for expect(locator).toBeVisible()

Locator: locator('p').filter({ hasText: 'Benefits of tinting' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 45000ms
  - waiting for locator('p').filter({ hasText: 'Benefits of tinting' })

    at CarTinting.verifyBenefitsOfTintingSection (D:\gogomotor\pages\CarTinting\tinting.ts:516:42)
    at D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:58:23
```

# Page snapshot

```yaml
- banner:
  - link:
    - /url: /en
    - img
  - button "wishlist": Save
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
  416 |
  417 |     // Look for any span with class=block that is visible (currently shown text)
  418 |     const visibleText = this.page.locator('span.block');
  419 |     await expect(visibleText).toBeVisible();
  420 |
  421 |     const text = await visibleText.textContent();
  422 |     Logger.info(`Visible animated text found: "${text?.trim()}"`);
  423 |   }
  424 |
  425 |
  426 |
  427 |   async verifyStartsFromPrice(expectedPrice: string) {
  428 |     Logger.info(`Validating "Starts from" price: ₹${expectedPrice}`);
  429 |     await expect(this.priceText()).toBeVisible();
  430 |     await expect(this.priceText()).toHaveText(expectedPrice);
  431 |   }
  432 |
  433 |   async verifyTintMyCarCTA() {
  434 |     Logger.info('Verifying "Tint My Car" CTA button');
  435 |     await expect(this.tintMyCarButton()).toBeVisible();
  436 |     await expect(this.tintMyCarButton()).toBeEnabled();
  437 |   }
  438 |
  439 |   async verifyHeroCarImageVisibleOnDesktop() {
  440 |     Logger.info('Verifying hero car image visibility on desktop');
  441 |
  442 |     // Ensure it's only visible on desktop (not mobile)
  443 |     const viewport = this.page.viewportSize();
  444 |     if (viewport && viewport.width >= 768) {
  445 |       await expect(this.heroCarImage()).toBeVisible();
  446 |       Logger.info('Hero car image is visible on desktop');
  447 |     } else {
  448 |       Logger.info('Skipping image check since viewport is not desktop');
  449 |     }
  450 |   }
  451 |
  452 |
  453 |   async verifyGogoPromiseSection() {
  454 |     Logger.info('Verifying "GoGo Motor\'s promise" section');
  455 |
  456 |     // Heading should be visible
  457 |     await expect(this.gogoPromiseHeading()).toBeVisible();
  458 |
  459 |     // Tags should be visible and count should match expected
  460 |     const expectedTags = ['Trusted Expertise', 'Top-Quality Materials', 'Customer First'];
  461 |
  462 |     for (const tagText of expectedTags) {
  463 |       const tag = this.page.getByText(tagText, { exact: true });
  464 |       await expect(tag).toBeVisible();
  465 |       Logger.info(`Verified tag: ${tagText}`);
  466 |     }
  467 |
  468 |     // Or: check total count is 3
  469 |     await expect(this.gogoPromiseTags()).toHaveCount(3);
  470 |   }
  471 |
  472 |   
  473 |   async verifyTintFilmSpecsSection() {
  474 |     Logger.info('Verifying tint film specs section');
  475 |
  476 |     await expect(this.glareReductionHeading()).toBeVisible();
  477 |     Logger.info('Verified glare reduction heading');
  478 |
  479 |     await expect(this.tintDesc()).toBeVisible();
  480 |     Logger.info('Verified tint description text');
  481 |
  482 |     await expect(this.performancePoints()).toHaveCount(7);
  483 |     Logger.info('Verified all 8 performance metric lines');
  484 |
  485 |     await expect(this.tintShadeImages()).toHaveCount(5);
  486 |     Logger.info('Verified 5 tint shade images');
  487 |
  488 |     await expect(this.filmSpecsFooter()).toBeVisible();
  489 |     Logger.info('Verified footer line with MIL, UV, IR specs');
  490 |   }
  491 |
  492 |
  493 |   async verifyPerfectFitSection() {
  494 |     Logger.info('Validating "Perfect Fit, Every Time" section heading');
  495 |     await expect(this.perfectFitSection()).toBeVisible();
  496 |
  497 |     Logger.info('Validating presence of all 3 step titles');
  498 |     await expect(this.stepTitles()).toHaveCount(3);
  499 |
  500 |     Logger.info('Validating presence of all 3 step descriptions');
  501 |     await expect(this.stepDescriptions()).toHaveCount(3);
  502 |
  503 |     Logger.info('Validating CTA button "Tint my Car" is visible and enabled');
  504 |     await expect(this.tintMyCarCTA()).toBeVisible();
  505 |     await expect(this.tintMyCarCTA()).toBeEnabled();
  506 |   }
  507 |
  508 |   async verifyHeroVideoIsVisible() {
  509 |     Logger.info('Validating presence of hero video element');
  510 |     await expect(this.heroVideo()).toBeVisible();
  511 |     Logger.info('Hero video is visible');
  512 |   }
  513 |
  514 |   async verifyBenefitsOfTintingSection() {
  515 |     Logger.info('Validating "Benefits of tinting" heading');
> 516 |     await expect(this.benefitsHeading()).toBeVisible();
      |                                          ^ Error: Timed out 45000ms waiting for expect(locator).toBeVisible()
  517 |
  518 |     Logger.info('Validating "Benefits of tinting" description');
  519 |     await expect(this.benefitsDescription()).toBeVisible();
  520 |
  521 |     Logger.info('"Benefits of tinting" section validated successfully');
  522 |   }
  523 |
  524 | }
```