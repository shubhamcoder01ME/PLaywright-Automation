// pages/IdentitiesPage.js
import { expect } from '@playwright/test';

export class IdentitiesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.heading = page.getByText('Identites');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.importButton = page.getByRole('button', { name: 'Import' });

    
    this.tableHeaders = page.locator('th');
   // Left nav selectors
   this.identityStoreButton = page.getByRole('button', { name: 'Identity Store' });
   this.identitiesLink = page.getByRole('link', { name: 'Identities', exact: true });
  }


  async gotoViaLeftNav() {
    // Ensure left nav is visible (expand if needed)
    const menuButton = this.page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    // Click left nav: Identity Store > Identities
    await this.identityStoreButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.identityStoreButton.click();
    await this.identitiesLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.identitiesLink.click();
  }

  async verifyHeading() {
    await expect(this.heading).toBeVisible();
  }

  async verifyButtons() {
    await expect(this.addButton).toBeVisible();
    await expect(this.addButton).toBeEnabled();
    await expect(this.exportButton).toBeVisible();
    await expect(this.exportButton).toBeEnabled();
    await expect(this.importButton).toBeVisible();
    await expect(this.importButton).toBeEnabled();
  }



  // Directly perform the codegen-based dropdown and button checks in one method
  async performStatusDropdownAndButtonChecks() {
  // Click Status dropdown (All)
  await this.page.locator('div').filter({ hasText: /^All$/ }).nth(3).click();
  // Select Active
  await this.page.locator('#react-select-2-option-1').click();
  await this.page.waitForTimeout(800);
  // Click Status dropdown (Active)
  await this.page.locator('div').filter({ hasText: /^Active$/ }).nth(1).click();
  // Select Inactive
  await this.page.locator('#react-select-2-option-2').click();
  await this.page.waitForTimeout(800);
  // Click Status dropdown (Inactive)
  await this.page.locator('div').filter({ hasText: /^Inactive$/ }).nth(1).click();
  // Select All
  await this.page.locator('#react-select-2-option-0').click();
  await this.page.waitForTimeout(800);
    
  }

  async verifyTableHeaders() {
    const headers = await this.tableHeaders.allTextContents();
    const expectedHeaders = [
      'Action',
      'Employee Name',
      'Employee Email ID',
      'Manager Email ID',
      'Employee ID',
      
    ];
    expectedHeaders.forEach(h => expect(headers.join(' ')).toContain(h));
  }

  // (removed: selectEachStatusOption, not needed for React-select)
};
