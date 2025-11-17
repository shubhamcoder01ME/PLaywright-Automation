import { expect } from '@playwright/test';

export class EmailTemplatePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation & headings
    this.navigation = page.getByRole('link', { name: 'Email Template' });
    this.heading = page.locator('h2.header.o-form-title-bar');

    // Buttons
    this.addButton = page.getByText('Add', { exact: true });
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.backButton = page.getByRole('button', { name: /Cancel|Back|Close/i });

    // Dropdowns
    this.statusDropdown = page.getByRole('combobox', { name: 'Status:' });
    this.placeholdersDropdown = page.locator('select, [role="combobox"]');

    // Input fields / labels
    this.emailTemplateType = page.getByText(/Email Template Type/i);
    this.emailTemplateName = page.getByText(/Email Template Name/i);
    this.description = page.getByText(/Description/i);
    this.emailSubject = page.getByText(/Email Subject/i);
    this.emailBodyEditor = page.getByText(/Email Body Editor/i);
  }

  async navigateToEmailTemplates() {
    await this.navigation.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyHeading() {
    await expect(this.heading).toContainText('Email Templates');
  }

  async clickAddButton() {
    await this.addButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // -------------------------------
  // Status dropdown helpers
  // -------------------------------
  async getStatusOptions() {
    await expect(this.statusDropdown).toBeVisible({ timeout: 5000 });
    const options = await this.statusDropdown.locator('option').allTextContents();
    return options.map(opt => opt.trim());
  }

  async selectAllStatusOptionsOneByOne() {
    const options = await this.getStatusOptions();
    for (const option of options) {
      console.log(`Selecting status: ${option}`);
      await this.statusDropdown.selectOption(option);
      await this.page.waitForTimeout(300);
    }
  }

  // -------------------------------
  // Validate Create Email Template page UI
  // -------------------------------
  async verifyCreateEmailTemplatePageUI() {
    await expect(this.page.getByRole('heading', { name: /Create Email Template/i })).toBeVisible();
    await expect(this.emailTemplateType).toBeVisible();
    await expect(this.emailTemplateName).toBeVisible();
    await expect(this.description).toBeVisible();
    await expect(this.emailSubject).toBeVisible();
    await expect(this.emailBodyEditor).toBeVisible();
    await expect(this.placeholdersDropdown.first()).toBeVisible();
    await expect(this.saveButton).toBeVisible();
    await expect(this.backButton.first()).toBeVisible();
  }

  // -------------------------------
async verifyColumnSearchSupport(columns = [
  { label: 'Email Template Name', index: 1 },
  { label: 'Email Template Type', index: 2 }
]) {
  const rows = this.page.locator('div.rt-tr-group');
  const rowCount = await rows.count();
  if (rowCount < 2) return; // No data to test

  const firstDataRow = rows.nth(1).locator('div[role="row"]');
  const cellTexts = await firstDataRow.locator('div[role="gridcell"]').allTextContents();

  const filters = this.page.locator('div.rt-thead input:visible');

  for (const col of columns) {
    const value = (cellTexts[col.index] || '').trim();
    if (!value || value.length < 2) continue;

    const input = filters.nth(col.index - 1);
    await input.fill('');
    await input.fill(value);
    await this.page.waitForTimeout(1000); // debounce filter

    const filteredRows = this.page.locator('div.rt-tr-group:visible div[role="row"]');
    const matchingCell = filteredRows.locator(`div[role="gridcell"]:nth-child(${col.index + 1})`, { hasText: value });

    await expect(matchingCell.first()).toBeVisible({ timeout: 5000 });

    // Clear filter for next column
    await input.fill('');
    await this.page.waitForTimeout(300);
  }
}
}
