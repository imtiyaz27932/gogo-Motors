# Test info

- Name: Car Tinting - Mobile Web >> Validate Tinting Benefits section
- Location: D:\gogomotor\tests\CarTinting\windowTinting.spec.ts:57:9

# Error details

```
Error: Timed out 45000ms waiting for expect(locator).toBeVisible()

Locator: locator('p.font-semibold').filter({ hasText: 'Benefits of tinting' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 45000ms
  - waiting for locator('p.font-semibold').filter({ hasText: 'Benefits of tinting' })

    at CarTinting.verifyBenefitsOfTintingSection (D:\gogomotor\pages\CarTinting\tinting.ts:552:42)
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
  529 |     await expect(this.perfectFitSectionHeading()).toBeVisible();
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
> 552 |     await expect(this.benefitsHeading()).toBeVisible();
      |                                          ^ Error: Timed out 45000ms waiting for expect(locator).toBeVisible()
  553 |
  554 |     Logger.info('Validating "Benefits of tinting" description');
  555 |     await expect(this.benefitsDescription()).toBeVisible();
  556 |
  557 |     Logger.info('"Benefits of tinting" section validated successfully');
  558 |   }
  559 |
  560 | }
```