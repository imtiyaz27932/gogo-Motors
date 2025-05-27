import { test } from '../../utils/testSetup'
import { devices } from '@playwright/test';
import { Logger } from '../../utils/logger';
import { mobileUsedClass } from '../../pages/Buy & Sell Used Cars/mobileview';
import { expect } from '@playwright/test';



test.use({
        ...devices['iPhone 15'],
        storageState: './storage/auth.json',
      });

test.describe('Extended Warranty - Mobile Web', () => {
    let buyCar: mobileUsedClass;
    
    test.beforeEach(async ({ page, headerPage }) => {
        Logger.info('Navigating to the Homepage and initializing Buy Used Cars page object');
        buyCar = new mobileUsedClass(page);
        await buyCar.clickonMenu();
    });


    test('Verify Surveyed Car toggle functionality', async () => {
        Logger.info('Testing enabling and disabling of Surveyed Car toggle');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
    

    });
    test(' Sort By Price: Low to High', async () => {
        Logger.info('Testing Sort By Functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.sortBy('Price: Low to High')
        await buyCar.clearFilters();


    });

    test('Sort by Price: High to Low', async () => {
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.sortBy('Price: High to Low');
        await buyCar.clearFilters();
    });

    test('Sort by EMI: Low to High', async () => {
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.sortBy('EMI: Low to High');
        await buyCar.clearFilters();
    });

    test('Sort by EMI: High to Low', async () => {
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.sortBy('EMI: High to Low');
        await buyCar.clearFilters();
    });

    test('Sort by Year: Newest to Oldest', async () => {
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.sortBy('Year: Newest to Oldest');
        await buyCar.clearFilters();
    });

    test('Sort by Year: Oldest to Newest', async () => {
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.sortBy('Year: Oldest to Newest');
        await buyCar.clearFilters();
    });

    test('Adjust price range slider and verify results', async () => {
        Logger.info('Testing price range slider adjustment');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonBudget();
        await buyCar.setPriceRange(120, 80)
        await buyCar.clearFilters();
        Logger.success('Filters cleared successfully after price range adjustment');
    });

    test('Set EMI range using slider and verify results', async () => {
        Logger.info('Testing EMI range slider adjustment');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonEMI()
        Logger.info('EMI option selected successfully');
        await buyCar.setEmiSliderRange(40, 80);
        Logger.info('EMI range slider adjusted successfully');
        await buyCar.clearFilters();
        Logger.success('Filters cleared successfully after EMI range adjustment');
    });


    test('Verify the Make and Modle Filter funcationality', async () => {
        Logger.info('Testing Make and Model filter funcationality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonMakeAndModel();
        await buyCar.clearFilters();
    });

    test('Verify filtering used cars by Model Year range', async () => {
        Logger.info('Testing Model Year filter functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonModelYear()
        await buyCar.setYearRangeSlider(2020, 2024);
        await buyCar.clearFilters()
        Logger.success('Model Year filter functionality verified successfully');
    });

    test('Verify filtering used cars by Body Type', async () => {
        Logger.info('Testing Body Type filter functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonBodyType();
        await buyCar.clearFilters();
        Logger.success('Body Type filter functionality verified successfully');
    });
    

    test('Verify filtering used cars by Fuel Type', async () => {
        Logger.info('Testing Fuel Type filter functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonFuelType();
        await buyCar.clearFilters();
        Logger.success('Fuel Type filter functionality verified successfully');
    });
    
    test('Verify filtering used cars by Transmission Type', async () => {
        Logger.info('Testing Transmission Type filter functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonTransmission();
        await buyCar.clearFilters();
        Logger.success('Transmission Type filter functionality verified successfully');
    });



    test('Verify the exterior color filter functionality', async () => {
        Logger.info('Testing exterior color filter functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonExteriorColor();
        await buyCar.clearFilters();
        Logger.success('Exterior color filter functionality verified successfully');
        
    });

    test('Verify the interior color filter functionality', async () => {
        Logger.info('Testing interior color filter functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonInteriorColor();
        await buyCar.clearFilters();
        Logger.success('interior color filter functionality verified successfully');

    });

    test('Verify the Ownership filter functionality', async () => {
        Logger.info('Testing Ownership filter functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonOwnership();
        await buyCar.clearFilters();
        Logger.success('Ownership filter functionality verified successfully');
    });



    test('Verify kilometers Driven functionality', async () => {
        Logger.info('Testing kilometers Driven functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonKms();
        await buyCar.setKilometersDrivenRange(20, 20)
        await buyCar.clearFilters();
        Logger.success('kilometers Driven functionality verified successfully');
    });


    test('Verify Features functionality', async () => {
        Logger.info('Testing Features functionality');
        await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
        await buyCar.clickonFeatures();
        await buyCar.clearFilters();
        Logger.success('Features functionality verified successfully');
    
    });

     test('Verify adding cars to wishlist', async () => {
            Logger.info('Testing wishlist cars')
            await buyCar.clickonBuySellUsedCars();
            await buyCar.clickonUsedCar();
            await buyCar.clickonToggle()
            await buyCar.clickWishlistIcon();
    
    
        })
    
        test('Verify the details of the car', async () => {
            Logger.info('Testing details of cars');
          
            await buyCar.clickonBuySellUsedCars();
        await buyCar.clickonUsedCar();
        await buyCar.clickonToggle()
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
            await buyCar.clickonBuySellUsedCars();
            await buyCar.clickonUsedCar();
            await buyCar.clickonToggle()
            const index = 1;
            await buyCar.clickCar(5);
            await buyCar.makeYourOffer();
        })
    
       
    
        test('Verify the functionality of contact seller', async () => {
            await buyCar.clickonBuySellUsedCars();
            await buyCar.clickonUsedCar();
            await buyCar.clickonToggle()
            const index = 1;
            await buyCar.clickCar(5);
            await buyCar.clickcontactSeller();
            
    
        });
    
        test('Verify the functionality of Car Specification ', async () => {
            await buyCar.clickonBuySellUsedCars();
            await buyCar.clickonUsedCar();
            await buyCar.clickonToggle()
            const index = 1;
            await buyCar.clickCar(5);
            await buyCar.clickonCarSpecification();
          
        });
    
        test.skip('Verify the functionality of Report Listing ', async () => {
            await buyCar.clickonBuySellUsedCars();
            await buyCar.clickonUsedCar();
            await buyCar.clickonToggle()
            const index = 1;
            await buyCar.clickCar(3);
            await buyCar.clickonReportListing();
    
        });
    });
    
    
 

