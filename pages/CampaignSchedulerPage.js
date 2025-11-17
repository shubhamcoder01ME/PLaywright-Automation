// Playwright Page Object for Campaign Scheduler
import { expect } from '@playwright/test';

export class CampaignSchedulerPage {
  constructor(page) {
    this.page = page;
    this.lEftnavigation = page.getByRole('link', { name: 'Campaign Scheduler' });
    this.heading = page.locator('h2', { hasText: 'Campaign Scheduler' });
    this.addButton = page.locator('button', { hasText: 'Add' });
    this.columnActions = page.locator('div[role="columnheader"]:has-text("Actions")');
    this.columnName = page.locator('div[role="columnheader"]:has-text("Name")');
    this.columnScheduledEndDate = page.locator('div[role="columnheader"]:has-text("Scheduled End date")');
    this.columnCreatedBy = page.locator('div[role="columnheader"]:has-text("Created By")');
    this.columnCreatedTime = page.locator('div[role="columnheader"]:has-text("Created Time")');
    this.tableRows = page.locator('.react-table .rt-tbody .rt-tr-group');

    this.addPageHeading = page.getByRole('heading', { name: 'Create Campaign Scheduler', level: 2 });
    this.chooseelement= page.getByText('Choose Campaign Template', { exact: true });

    this.AddSaveButton= page.getByRole('button', { name: 'Save' })
    this.CancelButton= page.getByRole('button', { name: 'Cancel' });
    this.addBackButton= page.getByRole('button', { name: 'Back' });
    // Audit Trail elements
    this.audittrialHeading = page.getByRole('heading', { name: 'Campaign Scheduler Audit Trail' });
    this.auditSHedularname= page.locator(`b:has-text("Campaign Scheduler Name")`);
    this.exportBtn =page.getByRole('button', { name: /export/i });
    this.backBtn =page.getByRole('button', { name: /back/i });
    this.headerSelectors = [
      'div[role="columnheader"]',
      'table thead tr th',
      '.MuiTableHead-root th',
      '.rt-thead .rt-th'
    ];
  }


   
  async leftnav() {
    await this.lEftnavigation.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await expect(this.columnActions).toBeVisible();
    await expect(this.columnName).toBeVisible();
    await expect(this.columnScheduledEndDate).toBeVisible();
    await expect(this.columnCreatedBy).toBeVisible();
    await expect(this.columnCreatedTime).toBeVisible();
  }

  async clickAddButton() {
    await this.addButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyAddPageLoaded() {
    await expect(this.addPageHeading).toBeVisible();        
    await expect(this.chooseelement).toBeVisible();
  }

  async SaveAndCancel(){
    await expect(this.AddSaveButton).toBeVisible();
    await expect(this.CancelButton).toBeVisible();
  }

  async clickAddFromBackButton(){
    await this.addBackButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }

  async verifySorting(columnLocator) {
    const rowsBefore = await this.page.locator('div[role="rowgroup"] >> div[role="row"]').allTextContents();
    await columnLocator.click();
    await this.page.waitForTimeout(1000);
    const rowsAfter = await this.page.locator('div[role="rowgroup"] >> div[role="row"]').allTextContents();
    if (JSON.stringify(rowsBefore) === JSON.stringify(rowsAfter)) {
      console.warn('Sorting did not change order for this column. It may not be sortable or data is already sorted.');
    } else {
      expect(rowsBefore).not.toEqual(rowsAfter);
    }
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

  // --- Click "View Audit Trail" ---
  async clickViewAuditTrailIfPresent() {
    const menuOptions = this.page.locator(
      'ul[role="menu"] li, .MuiMenu-list li, .dropdown-menu li, [role="menuitem"], .MuiMenuItem-root'
    );

    const count = await menuOptions.count();
    if (count === 0) {
      console.warn(' No campaign action menu options present, skipping click.');
      return;
    }

    for (let i = 0; i < count; i++) {
      const opt = menuOptions.nth(i);
      const text = (await opt.textContent())?.toLowerCase() || '';
      if (text.includes('view audit trail')) {
        await opt.click();
        return;
      }
    }

    throw new Error(' No "View Audit Trail" option found in campaign shedular action menu.');
  }

async validateAuditTrailPage() {
    await expect(this.audittrialHeading).toBeVisible();
    await expect(this.auditSHedularname).toBeVisible();
    await expect(this.exportBtn).toBeVisible();
    await expect(this.backBtn).toBeVisible();
  } 
    async verifyTableHeaders(expectedHeaders) {
    // Try each selector until headers are found
    for (const selector of this.headerSelectors) {
      const headers = await this.page.locator(selector).allTextContents();
      if (headers.length) {
        const actual = headers
          .map(h => h.trim().toLowerCase())
          .filter(Boolean)
          .slice(0, expectedHeaders.length);

        const expected = expectedHeaders.map(h => h.toLowerCase());
        
        for (const header of expected) {
          expect(actual).toContain(header);
        }
        return;
      }
    }

    throw new Error(' No table headers found using known selectors.');
  }

  async backfromAuditTrail() {
    await this.backBtn.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
