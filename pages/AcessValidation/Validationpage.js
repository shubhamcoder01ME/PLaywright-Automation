import { expect } from '@playwright/test';

class ValidationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Left Navigation Selectors
    this.accessValidationMenu =page.getByRole('button', { name: /Access Validation/i });
    this.validationPolicyMenuItem = page.getByRole('link', { name: /Validation Policy/i });

    // Page Elements
    this.pageHeading = page.getByRole('heading', { name: /Validation Policy/i });
    this.addButton = page.getByRole('button', { name: /Add/i });

    // Table Headers
    this.tableHeaders = {
      actions: page.locator('th:has-text("Actions")'),
      policyName: page.locator('th:has-text("Policy Name")'),
      description: page.locator('th:has-text("Description")'),
      policyID: page.locator('th:has-text("Policy ID")'),
      sodQueries: page.locator('th:has-text("SoD Queries")'),
      lastModifiedBy: page.locator('th:has-text("Last Modified By")'),
      lastModifiedDate: page.locator('th:has-text("Last Modified Date")')
    };

    // Table
    this.validationPolicyTable = page.locator('div[role="grid"]');
    this.tableRows = page.locator('div[role="grid"] >> role=row');

    this.updateButton = page.locator('button', { hasText: 'Update' });
  }

  /**
   * Navigate to Validation Policy page via left menu
   */
  async navigateToValidationPolicy() {
    await this.accessValidationMenu.click();
    await this.page.waitForLoadState('networkidle');
    await this.validationPolicyMenuItem.click();
    await this.page.waitForLoadState('networkidle');
    await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Verify page heading
   */
  async verifyPageHeading() {
    await expect(this.pageHeading).toBeVisible();
    const headingText = await this.pageHeading.textContent();
    return headingText;
  }

  /**
   * Verify Add button is present and clickable
   */
  async verifyAddButtonPresent() {
    await expect(this.addButton).toBeVisible();
  }

  /**
   * Verify all table headers are present
   */
  async verifyTableHeaders() {
    const expectedHeaders = [
      'Actions',
      'Policy Name',
      'Description',
      'Policy ID',
      'SoD Queries',
      'Last Modified By',
      'Last Modified Date'
    ];

    for (const header of expectedHeaders) {
      const headerElement = this.page.locator(`text="${header}"`);
      await expect(headerElement).toBeVisible({ timeout: 10000 });
    }

    return expectedHeaders;
  }

  /**
   * Verify the table is visible
   */
  async verifyTableIsVisible() {
    await expect(this.validationPolicyTable).toBeVisible();
  }

  /**
   * Get table row count
   */
  async getTableRowCount() {
    const count = await this.tableRows.count();
    return count;
  }

  /**
   * Verify complete page state
   */
  async verifyPageState() {
    // Verify heading
    await this.verifyPageHeading();
    
    // Verify Add button
    await this.verifyAddButtonPresent();
    
    // Verify table
    await this.verifyTableIsVisible();
    
    // Verify all headers
    await this.verifyTableHeaders();
    
    // Get row count
    const rowCount = await this.getTableRowCount();
    
    return {
      headingVisible: true,
      addButtonVisible: true,
      tableVisible: true,
      rowCount: rowCount
    };
  }
      // --- Open Gear Icon Menu ---
  async openFirstRowGearMenu() {
    if (await this.tableRows.count() === 0) {
      console.warn(' No data rows present, skipping gear menu validation.');
      return null;
    }

    const firstRow = this.tableRows.first();
    const gearBtn = firstRow.locator('.rt-td button, td button').first();

    await expect(gearBtn).toBeVisible();
    await expect(gearBtn).toBeEnabled();

    await gearBtn.click();
    const menu = firstRow.locator('.dropdown-menu, .MuiPaper-root, .menu').first();
    await expect(menu).toBeVisible();

    return menu;
  }
    // --- Verify Gear Menu Options ---
  async verifyGearMenuOptions(expectedOptions) {
    const menu = await this.openFirstRowGearMenu();
    if (!menu) return; // no data

    for (const option of expectedOptions) {
      const optLocator = menu.locator(
        'li, button, .MuiMenuItem-root, .dropdown-item'
      ).filter({ hasText: option });

      await expect(optLocator).toBeVisible();
      await expect(optLocator).toBeEnabled();
    }
  }

   async clickUpdate() {
   const viewReportListItem =this.page.getByText('Update', { exact: true }).first(); 
   await this.updateButton.click();
   await this.page.waitForLoadState('networkidle');
  }
}

export { ValidationPage };
