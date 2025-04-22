import { Page, Locator } from '@playwright/test';

//Page Object Model for the Airalo homepage

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly cookieButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locator for the country/region search box

    this.searchBox = page.locator('[data-testid="search-input"]');

    // Locator for the cookie accept button (if present)

    this.cookieButton = page.getByRole('button', { name: 'ACCEPT' });

  }

  async goto() {
    await this.page.goto('/');
  }
  // Handles the cookie banner popup (if it appears)
  
  async acceptCookiesIfPresent() {
    try {
      await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
      await this.cookieButton.click();
      await this.page.waitForLoadState('networkidle'); 
      
    // Wait until page is done loading
      
      console.log('✅ Cookie accepted');
    } catch {
      console.log('ℹ️ No cookie popup appeared');
    }
  }
  
  // Types "Japan" in the search box and selects the first matching "Local" destination

  async searchAndSelectJapan() {
    await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });

   // Locate the search input and fill in the destination
    
   await this.searchBox.fill('Japan');

   // Select the first result under "Local"

    const japanOption = this.page.locator('div:has-text("Local") >> text=Japan').first();
    await japanOption.click();
  }  

  // Selects the first priced eSIM package by clicking "BUY NOW"

  async selectFirstPackage() {
    const firstBuyNow = this.page.getByRole('button', { name: 'BUY NOW' }).first();
    await firstBuyNow.waitFor({ state: 'visible', timeout: 10000 });
    await firstBuyNow.click();
  }
}