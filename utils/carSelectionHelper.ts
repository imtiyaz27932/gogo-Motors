import { Page, expect } from "@playwright/test";
import { Logger } from "../utils/logger";

export async function selectCarDetails(
    page: Page,
    {
        brand = 'TOYOTA',
        year = '2024',
        model = 'FORTUNER',
        variant = 'SAutomatic',
        city = 'Riyadh'
    } = {}
) {
    Logger.info(`Selecting car details: Brand=${brand}, Year=${year}, Model=${model}, Variant=${variant}, City=${city}`);

    // Select Brand
    const brandLocator = page.getByRole('img', { name: brand }).first();
    await brandLocator.waitFor({ state: 'visible', timeout: 7000 });
    await expect(brandLocator).toBeVisible();
    await brandLocator.scrollIntoViewIfNeeded();
    await brandLocator.click({ force: true });
    Logger.success(`Brand "${brand}" selected.`);

    // Select Model Year
    const yearLocator = page.getByRole('listitem').filter({ hasText: year });
    await yearLocator.waitFor({ state: 'visible', timeout: 7000 });
    await expect(yearLocator).toBeVisible();
    await yearLocator.click();
    Logger.success(`Model year "${year}" selected.`);

    // Select Car Model
    const modelLocator = page.getByRole('listitem').filter({ hasText: model });
    await modelLocator.waitFor({ state: 'visible', timeout: 7000 });
    await expect(modelLocator).toBeVisible();
    await modelLocator.click();
    Logger.success(`Car model "${model}" selected.`);

    // Select Variant
    const variantLocator = page.getByText(variant);
    await variantLocator.waitFor({ state: 'visible', timeout: 7000 });
    await expect(variantLocator).toBeVisible();
    await variantLocator.click();
    Logger.success(`Variant "${variant}" selected.`);

    // Select City
    const cityLocator = page.getByRole('img', { name: city });
    await cityLocator.waitFor({ state: 'visible', timeout: 7000 });
    await expect(cityLocator).toBeVisible();
    await cityLocator.click();
    Logger.success(`City "${city}" selected.`);
}