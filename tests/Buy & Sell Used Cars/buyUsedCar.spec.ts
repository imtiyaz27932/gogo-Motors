import { BuyUsedCar } from '../../pages/Buy & Sell Used Cars/buyUsedCars';
import { test } from '../../utils/testSetup';
import { Logger } from '../../utils/logger';
import { expect } from '@playwright/test';
import { addAbortListener } from 'events';

test.use({ storageState: './storage/auth.json' });

test.describe('Buy & Sell Used Cars', () => {
    let buyCar: BuyUsedCar;

    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and initializing Buy Used Cars page object');
        buyCar = new BuyUsedCar(page);
        await buyCar.clickBuyUsedCar();
    });

    test('Verify Surveyed Car toggle functionality', async () => {
        Logger.info('Testing enabling and disabling of Surveyed Car toggle');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.pagination();
        Logger.success('Surveyed Car toggle functionality verified successfully');
    });

    test('Verify location is Riyadh and used cars count is displayed', async () => {
        Logger.info('Testing location and used cars count display');
        
        await buyCar.clickonSuryedCarToggle();

        const isLocationCorrect = await buyCar.getUsedCarsCount();
        expect(isLocationCorrect).toBeTruthy();
        Logger.success('Location verified as Riyadh');

        await buyCar.verifyUsedCarsCount('Riyadh');
    });

    test('Sort by Price: Low to High', async () => {
        await buyCar.clickonSuryedCarToggle();
        await buyCar.sortBy('Price: Low to High');
    });

    test('Sort by Price: High to Low', async () => {
        await buyCar.clickonSuryedCarToggle();
        await buyCar.sortBy('Price: High to Low');
    });

    test('Sort by EMI: Low to High', async () => {
        await buyCar.clickonSuryedCarToggle();
        await buyCar.sortBy('EMI: Low to High');
    });

    test('Sort by EMI: High to Low', async () => {
        await buyCar.clickonSuryedCarToggle();
        await buyCar.sortBy('EMI: High to Low');
    });

    test('Sort by Year: Newest to Oldest', async () => {
        await buyCar.clickonSuryedCarToggle();
        await buyCar.sortBy('Year: Newest to Oldest');
    });

    test('Sort by Year: Oldest to Newest', async () => {
        await buyCar.clickonSuryedCarToggle();
        await buyCar.sortBy('Year: Oldest to Newest');
    });

    test('Sort by Default', async () => {
        await buyCar.clickonSuryedCarToggle();
        await buyCar.sortBy('Default');
    });

    test('Search for a used car by name or keyword', async () => {
        Logger.info('Testing search functionality for used cars');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.searchCar();
        Logger.success('Used car search functionality verified successfully');
    });
    
    test('Adjust price range slider and verify results', async () => {
        Logger.info('Testing price range slider adjustment');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.setPriceRange(120, 80);
        Logger.info('Price range slider adjusted successfully');
        await buyCar.ClearFilter();
        Logger.success('Filters cleared successfully after price range adjustment');
    });
    
    test('Set EMI range using slider and verify results', async () => {
        Logger.info('Testing EMI range slider adjustment');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.setEMI();
        Logger.info('EMI option selected successfully');
        await buyCar.setEmiSliderRange(40, 80);
        Logger.info('EMI range slider adjusted successfully');
        await buyCar.ClearFilter();
        Logger.success('Filters cleared successfully after EMI range adjustment');
    });

    test('Verify the Make and Modle Filter funcationality', async () => {
        Logger.info('Testing Make and Model filter funcationality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonMakeAndModel()
    });
    test('Verify filtering used cars by Model Year range', async () => {
        Logger.info('Testing Model Year filter functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonModelYear();
        await buyCar.setYearRangeSlider(2020, 2024);
        Logger.success('Model Year filter functionality verified successfully');
    });
    
    test('Verify filtering used cars by Body Type', async () => {
        Logger.info('Testing Body Type filter functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonBodyType();
        await buyCar.ClearFilter();
        Logger.success('Body Type filter functionality verified successfully');
    });
    
    test('Verify filtering used cars by Fuel Type', async () => {
        Logger.info('Testing Fuel Type filter functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonFuelType();
        await buyCar.ClearFilter();
        Logger.success('Fuel Type filter functionality verified successfully');
    });
    
    test('Verify filtering used cars by Transmission Type', async () => {
        Logger.info('Testing Transmission Type filter functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonTransmissionType();
        await buyCar.ClearFilter();
        Logger.success('Transmission Type filter functionality verified successfully');
    });

    test('Verify the exterior color filter functionality', async () => {
        Logger.info('Testing exterior color filter functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonExteriorColor();
        await buyCar.ClearFilter();
        Logger.success('Exterior color filter functionality verified successfully');
        
    });

    test('Verify the interior color filter functionality', async () => {
        Logger.info('Testing interior color filter functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonInteriorColor();
        await buyCar.ClearFilter();
        Logger.success('interior color filter functionality verified successfully');

    });

    test('Verify the Ownership filter functionality', async () => {
        Logger.info('Testing Ownership filter functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonOwnership();
        await buyCar.ClearFilter();
        Logger.success('Ownership filter functionality verified successfully');
    });

    test('Verify kilometers Driven functionality', async () => {
        Logger.info('Testing kilometers Driven functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonKilometersDriven();
        await buyCar.setKilometersDrivenRange(20, 20)
        await buyCar.ClearFilter();
        Logger.success('kilometers Driven functionality verified successfully');
    });

    test('Verify Features functionality', async () => {
        Logger.info('Testing Features functionality');
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickonFeatures();
        await buyCar.ClearFilter();
        Logger.success('Features functionality verified successfully');
    
    });

    test('Verify adding cars to wishlist', async () => {
        Logger.info('Testing wishlist cars')
        await buyCar.clickonSuryedCarToggle();
        await buyCar.clickWishlistIcon();


    })

    test('Verify the details of the car', async () => {
        Logger.info('Testing details of cars');
      
        await buyCar.clickonSuryedCarToggle();
        const carCount = await buyCar.getCarCount();
        expect(carCount).toBeGreaterThan(0);
        Logger.info(`Total surveyed cars found: ${carCount}`);
    
        const index = 1;
      
        // Title should not be empty
        const carTitle = await buyCar.getCarTitle(index).textContent();
        expect(carTitle).not.toBeNull();
        expect(carTitle?.trim().length).toBeGreaterThan(0);
        Logger.info(`Car Title: ${carTitle}`);
      
        // Price should contain numbers
        const carPrice = await buyCar.getCarPrice(index).textContent();
        expect(carPrice).toMatch(/\d/);
        Logger.info(`Car Price: ${carPrice}`);
      
        // Mileage should contain 'KM'
        const carMileage = await buyCar.getCarMileage(index).textContent();
        expect(carMileage).toMatch(/KM/);
        Logger.info(`Car Mileage: ${carMileage}`);
      
        // Fuel type should be either Petrol or Diesel
        const carFuel = await buyCar.getCarFuel(index).textContent();
        expect(carFuel).toMatch(/Petrol|Diesel/);
        Logger.info(`Car Fuel: ${carFuel}`);
      
        // Location should not be empty
        const carLocation = await buyCar.getCarLocation(index).textContent();
        expect(carLocation).not.toBeNull();
        expect(carLocation?.trim().length).toBeGreaterThan(0);
        Logger.info(`Car Location: ${carLocation}`);
      
        // Link href should not be null and should be a valid path
        const href = await buyCar.getCarLinkHref(index);
        expect(href).not.toBeNull();
        expect(href).toMatch(/^\/|^https?:\/\//);
        Logger.info(`Car link href: ${href}`);
        await buyCar.clickCar(index);
        Logger.info('Clicked on the car to navigate to details page');
    });

    test('Verify the functioality of Make/send an Offer', async () => {
        await buyCar.clickonSuryedCarToggle();
        const index = 1;
        await buyCar.clickCar(index);
        await buyCar.makeYourOffer();
    })

    test('Verify the Contact Seller functionality', async () => {
        await buyCar.clickonSuryedCarToggle();
        const index = 1;
        await buyCar.clickCar(index);
    })

    test('Verify the functionality of contact seller', async () => {
        await buyCar.clickonSuryedCarToggle();
        const index = 1;
        await buyCar.clickCar(index);
        await buyCar.clickcontactSeller();
        

    });

    test('Verify the functionality of Car Specification ', async () => {
        await buyCar.clickonSuryedCarToggle();
        const index = 1;
        await buyCar.clickCar(index);
        await buyCar.clickonCarSpecification();
      
    });

    test('Verify the functionality of Report Listing ', async () => {
        await buyCar.clickonSuryedCarToggle();
        const index = 1;
        await buyCar.clickCar(index);
        await buyCar.clickonReportListing();

    });
});