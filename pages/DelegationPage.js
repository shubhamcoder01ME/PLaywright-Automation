// DelegationPage.js
import { expect } from '@playwright/test';

class DelegationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.leftnavigation = page.getByRole('link', { name: 'Delegation' });
    this.heading = page.locator('h2', { hasText: 'Delegation' });
    this.addButton = page.locator('button', { hasText: 'Add' });
    this.exportButton = page.locator('button', { hasText: 'Export' });
    this.auditTrailButton = page.locator('button', { hasText: 'Audit Trail' });
    this.bulkUploadButton = page.locator('button', { hasText: 'Bulk Upload' });

     // Wait for modal title (e.g. ×Assign Delegates)
    this.modalTittle=page.getByText('Assign Delegates');

    // Verify form fields (update as needed)
    this.emailRev=page.getByText('Reviewer Email');
    this.DelegateEmail=page.getByText('Delegatee Email');
    this.saveButton=page.getByRole('button', { name: 'Save' })
    //close modal button
    this.closeModalButton=page.getByRole('button', { name: 'Close Modal' });

    // Delegation type dropdown
    this.delegationTypeDropdown = page.getByRole('combobox').first();
    
    // Credential Delegation page elements
    this.credentialOwnerInput = page.locator('#credentialOwner');
    this.selectByDropdown = page.locator('div')
      .filter({ hasText: /^Select By:SOR EmailSOR Manager Email$/ })
      .getByRole('combobox');
    this.applicationsLabel = page.locator('#endPointsLabel');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.auditTrailButton = page.getByRole('button', { name: 'Audit Trail' });
    this.assignedCredentialsForm = page.locator('form');
  
    this.tableHeaderSelectors = [
      'table thead tr th',
      '.MuiTableHead-root th',
      '.rt-thead .rt-th',
      'div[role="columnheader"]',
      'div[role="row"]:first-child div,span'
    ];

    this.searchFirstName = page.locator('input').nth(0);
    this.searchLastName = page.locator('input').nth(1);
    this.searchReviewer = page.locator('input').nth(2);
    this.searchDelegatee = page.locator('input').nth(3);

    // Table body row locator
    this.tableRows = page.locator('table tbody tr');
  }

  async leftnav() {
    await this.leftnavigation.click();
  }

  async getTableHeaders() {
    for (const selector of this.tableHeaderSelectors) {
      const locator = this.page.locator(selector);
      try {
        await locator.first().waitFor({ state: 'visible', timeout: 5000 });
        const headers = await locator.allTextContents();
        if (headers.length) {
          return headers.map(h => h.trim().toLowerCase()).filter(Boolean);
        }
      } catch (e) {
        continue; // try next selector
      }
    }
    return [];
  }

  async validatePage() {
    await expect(this.heading).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await expect(this.exportButton).toBeVisible();
    await expect(this.auditTrailButton).toBeVisible();
    await expect(this.bulkUploadButton).toBeVisible();
  }

  async verifyTableHeaders(expected = [
    'actions',
    'first name',
    'last name',
    'reviewer',
    'delegatee',
    'expiration date'
  ]) {
    const headers = await this.getTableHeaders();
    const normalizedHeaders = headers.map(h => h.replace(/\./g, '').trim().toLowerCase());
    expect(normalizedHeaders).toEqual(expected);
  }

 async getFirstRowData() {
  // Possible row selectors for different table types
  const rowSelectors = [
    'table tbody tr',
    '.MuiTableBody-root tr',
    '.rt-tbody .rt-tr-group',
    'div[role="row"]:not([role="columnheader"])'
  ];

  for (const selector of rowSelectors) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    if (count === 0) continue;

    const firstRow = rows.first();
    await firstRow.scrollIntoViewIfNeeded();

    // React Table often nests cells inside a child div
    const cells = firstRow.locator('td, div[role="cell"], > div > div[role="cell"]');
    const cellCount = await cells.count();
    if (cellCount === 0) continue; // try next selector

    const keys = ['firstName', 'lastName', 'reviewer', 'delegatee'];
    const data = {};

    for (let i = 0; i < keys.length; i++) {
      data[keys[i]] = (await cells.nth(i).textContent())?.trim() || '';
    }

    return data;
  }

  throw new Error('No rows with cells found in the table.');
}


  async search(firstName, lastName, reviewer, delegatee) {
    await this.searchFirstName.fill(firstName);
    await this.searchLastName.fill(lastName);
    await this.searchReviewer.fill(reviewer);
    await this.searchDelegatee.fill(delegatee);
    await this.page.waitForTimeout(1000); // Wait for search results
  }

  async clickADD() {
    await this.addButton.click();
    await this.page.waitForTimeout(1000); // Wait for any resulting actions
  }

  async verifyModalVisible() {
    await expect(this.modalTittle).toBeVisible();
    await expect(this.emailRev).toBeVisible();
    await expect(this.DelegateEmail).toBeVisible();
    await expect(this.saveButton).toBeVisible();
}
 async closeModal() {
    await this.closeModalButton.click();
    await this.page.waitForTimeout(1000); // Wait for modal to close     
}
  async getDelegationTypeOptions() {
    await expect(this.delegationTypeDropdown).toBeVisible();
    const options = await this.delegationTypeDropdown.locator('option').allTextContents();
    return options.map(o => o.trim());
  }

  async selectDelegationType(optionText) {
    await expect(this.delegationTypeDropdown).toBeVisible();
    await this.delegationTypeDropdown.selectOption({ label: optionText });
    await this.page.waitForTimeout(1000); // optional, wait for page update
  }

  async validateDelegationTypeOptions(expectedOptions) {
    const actualOptions = await this.getDelegationTypeOptions();
    for (const opt of expectedOptions) {
      if (!actualOptions.includes(opt)) {
        throw new Error(`Dropdown option '${opt}' not found. Actual: ${actualOptions.join(', ')}`);
      }
    }
  }
   async verifyCredentialDelegationPage() {
    await expect(this.credentialOwnerInput).toBeVisible();
    await expect(this.selectByDropdown).toBeVisible();
    await expect(this.applicationsLabel).toBeVisible();
    await expect(this.saveButton).toBeVisible();
    await expect(this.exportButton).toBeVisible();
    await expect(this.auditTrailButton).toBeVisible();
    await expect(this.assignedCredentialsForm).toContainText('Assigned Credentials List');
  }
}

export default DelegationPage;
