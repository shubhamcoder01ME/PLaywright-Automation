import { expect } from '@playwright/test';

export class MessageTemplatePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation & headings
    this.navigation = page.getByRole('link', { name: 'Message Template' });
    this.heading = page.locator('h2.header.o-form-title-bar');



  }

  async navigateToEmailTemplates() {
    await this.navigation.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyHeading() {   
    await expect(this.heading).toContainText('Message Templates');
  }
  async verifyColumnSearchSupport(columns = [
  { label: 'Message Template Name', index: 1 },
  { label: 'Message Template Type', index: 2 }
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