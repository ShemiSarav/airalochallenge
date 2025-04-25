import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { PackagePage } from './pages/PackagePage';

// Test Case: Airalo Japan eSIM package details are correct
// This test validates that the popup modal for the first priced eSIM package for Japan 
// contains the correct operator title, coverage, data, validity, and price information.

test('Airalo Japan eSIM package details are correct', async ({ page }) => {
  const home = new HomePage(page);
  const popup = new PackagePage(page);

  await test.step('Open Airalo homepage', async () => {
    await home.goto();
    await home.acceptCookiesIfPresent();
  })

  await test.step('Select Japan', async () => {
    await home.searchAndSelectJapan();
  })

  await test.step('Select First Package', async () => {
    await home.selectFirstPackage();
  })

  await test.step('Verify Package Details', async () => {
      await popup.verifyPackageDetails();
  })

});
