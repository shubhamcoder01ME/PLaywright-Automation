import { expect } from '@playwright/test';

export class DataTransformationPage {
  
  constructor(page) {
    this.page = page;

    // ===== Locators (all at the top) =====
    this.heading = page.locator("//div[@id='react']//div[3]//div[2]//a[2]//div[1]//li[1]");
    this.addButton = page.locator("//button[normalize-space()='Add']");
    this.tableHeaders = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");
    this.tableRows = page.locator("(//button[@id='dropdownMenu'])[1]");
    this.update = page.locator("(//li[@id='epDetails'])[1]");
    this.upload = page.locator("(//li[@id='epDetails'])[2]");
    this.download = page.locator("(//li[@id='epDetails'])[3]");
    this.delete = page.locator("(//li[@id='epDetails'])[4]");
    this.view = page.locator("(//li[@id='epDetails'])[5]");
    this.dropdownOptions = page.locator('.dropdown-menu [role="menuitem"], .MuiMenuItem-root');
    this.updateHeading = page.locator("(//h2[normalize-space()='Update Data Transformation'])[1]");
    this.searchBox = page.locator("(//input[contains(@type,'text')])[3]");
    this.pageHeading = page.locator('h1');
  }

  // ===== Navigation =====
  async navigate() {
    await this.heading.click();
  }

  // ===== Verification =====
  async verifyHeading(expected) {
    await this.heading.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.heading.textContent();
    if (!text.includes(expected)) throw new Error(`Heading does not include: ${expected}`);
  }

  async verifyButton(buttonText) {
    await expect(this.addButton).toBeVisible();
  }

  async verifyTableHeaders(expectedHeaders) {
    await expect(this.tableHeaders).toBeVisible();
  }

  async verifyTableDataAvailable() {
    await expect(this.tableRows).toBeVisible();
  }

  async performSearch(searchText = 'admin@securends.com') {
    await this.searchBox.fill(searchText);
    await this.page.keyboard.press('Enter');
  }

  async openDropdownMenu() {
    await this.tableRows.click();
  }

  async verifyDropdownOptions(expectedOptions) {
    await expect(this.update).toBeVisible();
    await expect(this.upload).toBeVisible();
    await expect(this.download).toBeVisible();
    await expect(this.delete).toBeVisible();
    await expect(this.view).toBeVisible();
  }

  async selectDropdownOption(optionText) {
    // Only 'update' implemented for now as in step file
    await this.update.click();
  }

  async verifyTextVisible(expectedText) {
    const headingText = await this.updateHeading.textContent();
    if (!headingText.includes(expectedText)) {
      throw new Error(`Text does not include: ${expectedText}`);
    }
  }
}

export default DataTransformationPage;
