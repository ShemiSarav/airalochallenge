import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { PackagePage } from './pages/PackagePage';

// Test Case: Airalo Japan eSIM package details are correct
// This test validates that the popup modal for the first priced eSIM package for Japan 
// contains the correct operator title, coverage, data, validity, and price information.

test('Airalo Japan eSIM package details are correct', async ({ page }) => {
  const home = new HomePage(page);
  const popup = new PackagePage(page);

  console.log('➡️ Opening homepage');
  // Step 1: Navigate to Airalo's homepage
  await home.goto();

  console.log('➡️ Handling cookies');
  // Step 2: Accept cookies if popup is shown
  await home.acceptCookiesIfPresent();

  console.log('➡️ Searching for Japan');
  // Step 3: Search for "Japan" and select the corresponding "Local" destination
  await home.searchAndSelectJapan();

  console.log('➡️ Selecting first package');
  // Step 4: Select the first priced eSIM package available
  await home.selectFirstPackage();

  console.log('➡️ Verifying popup');
  // Step 5: Verify the contents of the popup modal match expected values
  await popup.verifyPackageDetails();
});
