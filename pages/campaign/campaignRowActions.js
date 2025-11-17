
import { expect } from '@playwright/test';

export class CampaignRowActions {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Selectors
    this.statusDropdown = page.getByLabel('Status:');
    this.activeArchivedDropdown = page.getByLabel('Active/Archived:');
    this.firstRowGearXPath = "//div[@role='grid']//div[1]//div[1]//div[1]//div[1]//div[1]//div[1]//div[1]//button[1]";
    this.actionMenuSelector = '.dropdown-menu.leftAlign.campaignPopUp';
    this.actionMenuItemSelector = '.dropdown-menu.leftAlign.campaignPopUp a';
    this.menuOptionsSelector = 'ul[role="menu"] li, .MuiMenu-list li, .dropdown-menu li, [role="menuitem"], .MuiMenuItem-root';
    this.tableRowsSelector = 'table tbody tr, .rt-tbody .rt-tr-group';
    this.rowBtnsLinksInputsSelector = 'button, a, input[type="button"]';
    // Buttons and headings
    this.campaignPreviewHeading = page.getByRole('heading', { name: 'Campaign Preview ' });
    this.userAccessReviewsHeading = page.getByRole('heading', { name: 'User Access Reviews Campaign' });
    this.updateReviewerBtn = page.getByRole('button', { name: /update reviewer/i });
    this.exportBtn = page.getByRole('button', { name: /export/i });
    this.reviewAllBtn = page.getByRole('button', { name: /review all/i });
    this.approveAllBtn = page.getByRole('button', { name: /approve all/i });
    this.backBtn = page.getByRole('button', { name: /back/i });
    // Static values
    this.actionOptions = [
      'View', 'Excluded Users', 'Copy', 'Details', 'Edit', 'Relaunch', 'Archive', 'Delete', 'View Audit Trail', 'Export Audit Report', 'Export',
    ];
    this.campaignDetailsLabels = [
      'Name', 'Template Name', 'Application Names', 'Campaign Reviewer Type', 'Campaign Hierarchical Review', 'Campaign Owner', 'Start Date', 'End Date', 'Created Date', 'Status'
    ];
    this.auditTrailPageText = 'Campaign Audit Trail';
    this.auditTrailTableHeaders = ['Action', 'User', 'Date Timestamp', 'Description'];
    this.accessReviewCampaignHeading = 'Access Review Campaign';
    this.copyCampaignHeading = 'Copy Campaign';
  }

  // --- Actions ---
  async selectClosedStatus() {
    await this.statusDropdown.selectOption({ label: 'Closed' });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1500);
  }
  async selectActive() {
    await this.activeArchivedDropdown.selectOption({ label: 'Active' });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1500);
  }
  async openFirstRowGear() {
    const noData = await this.page.locator('text=No data available in table').isVisible();
    if (noData) {
      console.warn('No data available in table for Closed status. Skipping gear click.');
      return false;
    }
    const gear = this.page.locator(this.firstRowGearXPath);
    await expect(gear).toBeVisible({ timeout: 10000 });
    await gear.first().click();
    await this.page.waitForTimeout(500);
    return true;
  }

  // --- Menu Actions ---
  async verifyActionOptions() {
    for (const option of this.actionOptions) {
      const menuItem = this.page.locator(this.actionMenuItemSelector, { hasText: option });
      await expect(menuItem).toBeVisible({ timeout: 5000 });
    }
  }

  async clickMenuOption(optionText) {
    const menuOptions = this.page.locator(this.menuOptionsSelector);
    const count = await menuOptions.count();
    if (count === 0) {
      console.warn(`No campaign action menu options present, skipping ${optionText} click.`);
      return;
    }
    for (let i = 0; i < count; i++) {
      const opt = menuOptions.nth(i);
      const text = (await opt.textContent())?.toLowerCase() || '';
      if (text.includes(optionText.toLowerCase())) {
        await opt.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        return;
      }
    }
    throw new Error(`No ${optionText} option found in campaign action menu.`);
  }
  async clickView() { return this.clickMenuOption('view'); }
  async clickCopy() { return this.clickMenuOption('copy'); }
  async clickDetails() { return this.clickMenuOption('details'); }
  async clickViewAuditTrail() { return this.clickMenuOption('view audit trail'); }

  // --- Verification Methods ---
  async verifyCampaignPreviewHeading() {
    await expect(this.campaignPreviewHeading).toBeVisible();
  }

  async clickAnyViewButton() {
    const rows = this.page.locator(this.tableRowsSelector);
    const rowCount = await rows.count();
    if (rowCount === 0) {
      console.warn('No rows present in table.');
      return;
    }
    const firstRow = rows.first();
    await expect(firstRow).toBeVisible({ timeout: 10000 });
    const allBtnsLinksInputs = firstRow.locator(this.rowBtnsLinksInputsSelector);
    const allCount = await allBtnsLinksInputs.count();
    let viewBtn = null;
    for (let i = 0; i < allCount; i++) {
      const el = allBtnsLinksInputs.nth(i);
      const tag = await el.evaluate(node => node.tagName);
      let text = '';
      if (tag === 'INPUT') {
        text = (await el.getAttribute('value')) || '';
      } else {
        text = (await el.innerText()) || '';
      }
      if (/view/i.test(text)) {
        viewBtn = el;
        break;
      }
    }
    if (!viewBtn) {
      console.warn('No View button found in the first row.');
      return;
    }
    await expect(viewBtn).toBeVisible();
    await viewBtn.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async verifyUserAccessReviewsHeading() {
    await expect(this.userAccessReviewsHeading).toBeVisible();
  }

  async verifyReviewPageButtons() {
    await expect(this.updateReviewerBtn).toBeVisible();
    await expect(this.exportBtn).toBeVisible();
    await expect(this.reviewAllBtn).toBeVisible();
    await expect(this.approveAllBtn).toBeVisible();
    await expect(this.backBtn).toBeVisible();
  }

  async clickBackAndVerifyPreview() {
    await expect(this.backBtn).toBeVisible({ timeout: 10000 });
    await this.backBtn.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    await this.verifyCampaignPreviewHeading();
  }
  async clickBackAndVerifyMainHeading() {
    await expect(this.backBtn).toBeVisible({ timeout: 10000 });
    await this.backBtn.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    await this.verifyAccessReviewCampaignHeading();
  }
  async clickCopy() {
    // Robustly find and click the Copy option in the campaign action menu
    const menuOptions = this.page.locator(this.menuOptionsSelector);
    const count = await menuOptions.count();
    if (count === 0) {
      console.warn('No campaign action menu options present, skipping Copy click.');
      return;
    }
    for (let i = 0; i < count; i++) {
      const opt = menuOptions.nth(i);
      const text = (await opt.textContent())?.toLowerCase() || '';
      if (text.includes('copy')) {
        await opt.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        return;
      }
    }
    throw new Error('No Copy option found in campaign action menu.');
  }

  async verifyCopyCampaignHeading() {
    await expect(this.page.getByRole('heading', { name: 'Copy Campaign' })).toBeVisible();
  }

  async scrollToSaveCancelAndVerify() {
    const saveBtn = this.page.getByRole('button', { name: /save/i });
    const cancelBtn = this.page.getByRole('button', { name: /cancel/i });
    await saveBtn.scrollIntoViewIfNeeded();
    await cancelBtn.scrollIntoViewIfNeeded();
    await expect(saveBtn).toBeVisible();
    await expect(cancelBtn).toBeVisible();
  }

  async scrollUp() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(500);
  }
    async verifyAccessReviewCampaignHeading() {
    await expect(this.page.getByRole('heading', { name: 'Access Review Campaign' })).toBeVisible();
 
}
     async clickDetails() {
    // Robustly find and click the Details option in the campaign action menu
    const menuOptions = this.page.locator(this.menuOptionsSelector);
    const count = await menuOptions.count();
    if (count === 0) {
      console.warn('No campaign action menu options present, skipping Details click.');
      return;
    }
    for (let i = 0; i < count; i++) {
      const opt = menuOptions.nth(i);
      const text = (await opt.textContent())?.toLowerCase() || '';
      if (text.includes('details')) {
        await opt.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        return;
      }
    }
    throw new Error('No Details option found in campaign action menu.');
  }

  async verifyCampaignDetailsModalLabels() {
    // Confirm modal is visible
    await expect(this.page.locator('text=Campaign Info')).toBeVisible();

    // List of key field labels to check
    const labelsToCheck = [
      'Name',
      'Template Name',
      'Application Names',
      'Campaign Reviewer Type',
      'Campaign Hierarchical Review',
      'Campaign Owner',
      'Start Date',
      'End Date',
      'Created Date',
      'Status'
    ];

    for (const label of labelsToCheck) {
      const labelRegex = new RegExp(label + '\\s*:', 'i');
      const locator = this.page.locator(`:text-matches(\"${labelRegex.source}\", \"i\")`).first();
      try {
        await expect(locator).toBeVisible();
      } catch (e) {
        const allMatches = await this.page.locator(`:text-matches(\"${labelRegex.source}\", \"i\")`).allTextContents();
        console.error(`Label '${label}' not found or not visible. All matches:`, allMatches);
        throw e;
      }
    }
  }

  async closeCampaignDetailsModal() {
    const closeBtn = this.page.locator('.modal-dialog button, .MuiDialog-root button').first();
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(this.page.locator('text=Campaign Info')).toHaveCount(0);
  }

    async clickViewAuditTrail() {
    // Find and click View Audit Trail option in campaign action menu
    const menuOptions = this.page.locator(this.menuOptionsSelector);
    const count = await menuOptions.count();
    if (count === 0) {
      console.warn('No campaign action menu options present, skipping View Audit Trail click.');
      return;
    }
    for (let i = 0; i < count; i++) {
      const opt = menuOptions.nth(i);
      const text = (await opt.textContent())?.toLowerCase() || '';
      if (text.includes('view audit trail')) {
        await opt.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        return;
      }
    }
    throw new Error('No View Audit Trail option found in campaign action menu.');
  }

  async verifyAuditTrailPageText(expectedText) {
    await this.page.waitForSelector('h2, h1, .MuiTypography-root, .page-title', { timeout: 10000 });
    await expect(this.page.locator('body')).toContainText(expectedText);
    await this.page.waitForTimeout(2000);
  }

  async verifyAuditTrailTableHeaders(expectedHeaders) {
    let headerCells = [];
    const standardHeaderLocators = [
      'table thead tr th',
      '.MuiTableHead-root th',
      '.rt-thead .rt-th'
    ];
    for (const selector of standardHeaderLocators) {
      const headers = await this.page.locator(selector).allTextContents();
      if (headers.length) {
        headerCells = headers;
        break;
      }
    }
    for (const expected of expectedHeaders) {
      if (!headerCells.some(h => h.trim().toLowerCase() === expected.trim().toLowerCase())) {
        throw new Error(`Header '${expected}' not found in table headers: ${headerCells}`);
      }
    }
  }

  async verifyExportAndBackButtons() {
    await expect(this.exportBtn).toBeVisible();
    await expect(this.exportBtn).toBeEnabled();
    await expect(this.backBtn).toBeVisible();
    await expect(this.backBtn).toBeEnabled();
  }
    // Common labels and expected texts for scenarios
  campaignDetailsLabels = [
    'Name',
    'Template Name',
    'Application Names',
    'Campaign Reviewer Type',
    'Campaign Hierarchical Review',
    'Campaign Owner',
    'Start Date',
    'End Date',
    'Created Date',
    'Status'
  ];

  auditTrailPageText = 'Campaign Audit Trail';
  auditTrailTableHeaders = ['Action', 'User', 'Date Timestamp', 'Description'];

  accessReviewCampaignHeading = 'Access Review Campaign';
  copyCampaignHeading = 'Copy Campaign';

  // Updated methods to use these properties
  async verifyCampaignDetailsModalLabels() {
    await expect(this.page.locator('text=Campaign Info')).toBeVisible();
    for (const label of this.campaignDetailsLabels) {
      const labelRegex = new RegExp(label + '\\s*:', 'i');
      const locator = this.page.locator(`:text-matches(\"${labelRegex.source}\", \"i\")`).first();
      try {
        await expect(locator).toBeVisible();
      } catch (e) {
        const allMatches = await this.page.locator(`:text-matches(\"${labelRegex.source}\", \"i\")`).allTextContents();
        console.error(`Label '${label}' not found or not visible. All matches:`, allMatches);
        throw e;
      }
    }
  }

  async verifyCopyCampaignHeading() {
    await expect(this.page.getByRole('heading', { name: this.copyCampaignHeading })).toBeVisible();
  }

  async verifyAccessReviewCampaignHeading() {
    await expect(this.page.getByRole('heading', { name: this.accessReviewCampaignHeading })).toBeVisible();
  }

  async verifyAuditTrailPageText() {
    await this.page.waitForSelector('h2, h1, .MuiTypography-root, .page-title', { timeout: 10000 });
    await expect(this.page.locator('body')).toContainText(this.auditTrailPageText);
    await this.page.waitForTimeout(2000);
  }

  async verifyAuditTrailTableHeaders() {
    let headerCells = [];
    const standardHeaderLocators = [
      'table thead tr th',
      '.MuiTableHead-root th',
      '.rt-thead .rt-th'
    ];
    for (const selector of standardHeaderLocators) {
      const headers = await this.page.locator(selector).allTextContents();
      if (headers.length) {
        headerCells = headers;
        break;
      }
    }
    for (const expected of this.auditTrailTableHeaders) {
      if (!headerCells.some(h => h.trim().toLowerCase() === expected.trim().toLowerCase())) {
        throw new Error(`Header '${expected}' not found in table headers: ${headerCells}`);
      }
    }
  }

 
}