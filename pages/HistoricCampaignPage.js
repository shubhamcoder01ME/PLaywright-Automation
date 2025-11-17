import { expect } from '@playwright/test';

export class HistoricCampaignPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.navigation = page.getByRole('link', { name: 'Historic Campaign' });
    this.heading = page.getByText('Historic Campaign', { exact: true }).first();

    this.chartTypeDropdown = page.getByLabel('Chart Type');
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.printButton = page.getByRole('button', { name: 'Print' });

    this.quartersDropdown = page.locator('#year_multi');
    this.annualTotalsDropdown = page.locator('#anuual_multi');

    this.chart = page.locator('.chartjs-render-monitor, canvas.myChart1');
  }

  async leftNavigation() {
    await this.navigation.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validatePage() {
    await expect(this.heading).toBeVisible();
    await expect(this.exportButton).toBeVisible();
    await expect(this.printButton).toBeVisible();
  }

  async selectChartType(type) {
    await this.chartTypeDropdown.selectOption(type.toLowerCase());
  }

  // -----------------------------
  // Dynamically select all quarters
  // -----------------------------
  async selectAllQuartersDynamically() {
    await this.quartersDropdown.click();

    // Get all <a> options inside the dropdown
    const options = this.page.locator('#year_multi a');
    const count = await options.count();

    for (let i = 0; i < count; i++) {
      const option = options.nth(i);
      await option.click();
      await this.page.waitForTimeout(500); // small delay to let chart render
    }
  }

  // -----------------------------
  // Dynamically select all annual totals
  // -----------------------------
  async selectAllAnnualTotalsDynamically() {
    await this.annualTotalsDropdown.click();

    // Get all checkboxes inside the dropdown except "Select all"
    const checkboxes = this.page.locator('#anuual_multi input[type="checkbox"]:not([value="Select all"])');
    const count = await checkboxes.count();

    for (let i = 0; i < count; i++) {
      const checkbox = checkboxes.nth(i);
      await checkbox.check();
      await this.page.waitForTimeout(500);
    }
  }
}
