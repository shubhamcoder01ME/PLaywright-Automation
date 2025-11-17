// CampaignExceptionsPage.js
import { expect } from '@playwright/test';

class CampaignExceptionsPage {
  
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.leftnavigation = page.getByRole('link', { name: 'Campaign Exceptions' });
    this.heading = page.locator('h2', { hasText: 'Campaign Exceptions' });
    this.exportButton = page.locator('button', { hasText: 'Export' });
    this.auditTrailButton = page.locator('button', { hasText: 'Audit Trail' });
    this.tableHeaders = page.locator('th');
    this.emailInput = page.locator('input[type="text"][placeholder="Search Email"]');
    this.clearButton = page.locator('button', { hasText: 'Clear' });
    this.addUserButton = page.locator('button', { hasText: 'Add User' });
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.aduitTrailheading = page.getByRole('heading', { name: 'Campaign Exceptions Audit Trail' });
  };
    

  async leftnav() {
    await this.leftnavigation.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validatePage() {
    await expect(this.heading).toBeVisible();
    await expect(this.exportButton).toBeVisible();
    await expect(this.auditTrailButton).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.clearButton).toBeVisible();
    await expect(this.addUserButton).toBeVisible();
  }

  async validateTableHeaders(expectedHeaders = ['First Name', 'Last Name', 'Email', 'Actions']) {
    const selectors = [
      'table thead tr th',
      '.MuiTableHead-root th',
      '.rt-thead .rt-th',
      'div[role="columnheader"]',
      'div[role="row"]:first-child div,span'
    ];

    let headers = [];
    for (const selector of selectors) {
      headers = await this.page.locator(selector).allTextContents();
      if (headers.length) {
        headers = headers.map(h => h.trim().toLowerCase()).filter(Boolean);
        break;
      }
    }
    const expectedNormalized = expectedHeaders.map(h => h.trim().toLowerCase());
    expect(headers).toEqual(expectedNormalized);
  }

  async clickViewAudit() {
    await this.auditTrailButton.click();
    await this.page.waitForLoadState('networkidle');
  }


 async validateAuditTrailPage() {
    await expect(this.aduitTrailheading).toBeVisible();
  }

  async validateAuditTrailTableHeaders(expectedHeaders = ['Action', 'User', 'Date Timestamp', 'Description']) {
    // Try to scope to the audit trail table using heading or a unique parent
    let headers = [];
    // Example: if audit trail table is the first table after heading
    const auditTrailTable = this.page.locator('h2:has-text("Audit Trail") ~ table');
    if (await auditTrailTable.count() > 0) {
      headers = await auditTrailTable.locator('thead tr th').allTextContents();
    } else {
      // fallback to global selectors if specific table not found
      const selectors = [
        'table thead tr th',
        '.MuiTableHead-root th',
        '.rt-thead .rt-th',
        'div[role="columnheader"]',
        'div[role="row"]:first-child div,span'
      ];
      for (const selector of selectors) {
        headers = await this.page.locator(selector).allTextContents();
        if (headers.length) {
          break;
        }
      }
    }
    headers = headers.map(h => h.trim().toLowerCase()).filter(Boolean);
    const expectedNormalized = expectedHeaders.map(h => h.trim().toLowerCase());
    expect(headers).toEqual(expectedNormalized);
  }
  
  async clickBack() {
    await this.backButton.click();
    await this.page.waitForLoadState('networkidle');
  } 

}

export { CampaignExceptionsPage };