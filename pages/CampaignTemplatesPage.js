  // Page Object for Campaign Templates Page
  const { expect } = require('@playwright/test');

  exports.CampaignTemplatesPage = class CampaignTemplatesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /Campaign Templates/i });
    this.addButton = page.getByRole('button', { name: /Add/i });
  this.statusDropdown = page.getByLabel('Status:EnabledDisabled');
    this.refreshButton = page.getByRole('button', { name: /Refresh/i });
    this.tableHeaders = [
      page.getByRole('columnheader', { name: /Action/i }),
      page.getByRole('columnheader', { name: /Name/i }),
      page.getByRole('columnheader', { name: /Description/i }),
      page.getByRole('columnheader', { name: /Created By/i }),
      page.getByRole('columnheader', { name: /Created Time/i }),
      page.getByRole('columnheader', { name: /Updated By/i }),
      page.getByRole('columnheader', { name: /Updated Time/i }),
    ];
  }

  async goto() {
    await this.page.goto('https://qa30.securends.com/campaignTemplates');
  }

  async validateUI() {
    await expect(this.heading).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await expect(this.statusDropdown).toBeVisible();
    await expect(this.refreshButton).toBeVisible();
    for (const header of this.tableHeaders) {
      await expect(header).toBeVisible();
    }
  }

  async selectStatus(option) {
    // Use selectOption for the dropdown
    const value = option.toLowerCase();
    await this.statusDropdown.selectOption(value);
  }

  getRows() {
    return this.page.locator('.react-table .rt-tbody .rt-tr-group');
  }

  async openFirstRowMenu() {
    const rows = this.getRows();
    if (await rows.count() === 0) return false;
    const firstRow = rows.nth(0);
    const gearBtn = firstRow.locator('.rt-td button, td button').first();
    await gearBtn.click();
    this.menu = firstRow.locator('.dropdown-menu, .MuiPaper-root, .menu').first();
    await this.menu.waitFor({ state: 'visible', timeout: 5000 });
    // Wait for menu animation (if any)
    await this.page.waitForTimeout(200);
    return true;
  }

async verifyMenuOptions(options) {
  // If no menu reference, try to locate globally
  const menuRoot = this.menu || this.page.locator('.MuiPaper-root, .dropdown-menu, .menu, [role="menu"]');

  // Only check for visible menu items, not the menu container
  const visibleItems = await menuRoot.locator('li, button, div, span, a').filter({ has: this.page.locator(':visible') }).allTextContents();
  console.log('📋 Visible menu items:', visibleItems);

  for (const option of options) {
    const optionLocator = menuRoot.locator('li, button, div, span, a').filter({
      hasText: new RegExp(`^\\s*${option}\\s*$`, 'i'),
    });

    const count = await optionLocator.count();
    let found = false;

    for (let i = 0; i < count; i++) {
      const el = optionLocator.nth(i);
      if (await el.isVisible()) {
        await expect(el).toBeEnabled();
        found = true;
        break;
      }
    }

    if (!found) {
      throw new Error(
        `❌ Menu option '${option}' not found or not visible. \nVisible items:\n${visibleItems.join('\n')}`
      );
    }
  }

  console.log(' All expected menu options verified.');
  await this.page.waitForTimeout(200);
}


  async clickMenuOption(option) {
    const optLocator = this.menu.locator('li, button, .MuiMenuItem-root, .dropdown-item').filter({ hasText: option }).first();
    await optLocator.waitFor({ state: 'visible', timeout: 5000 });
    await optLocator.click();
  }

  async updateTemplate() {
    await this.clickMenuOption('Update');
    await this.page.waitForSelector('h2, h1, .MuiTypography-root, .page-title', { timeout: 10000 });
    await expect(this.page.locator('body')).toContainText(/update template/i);
  }

  async detailsTemplate() {
    await this.clickMenuOption('Details');
    await this.page.waitForSelector('h2, h1, .MuiTypography-root, .page-title', { timeout: 10000 });
    const headings = await this.page.locator('h2, h1, .MuiTypography-root, .page-title').allTextContents();
    if (!headings.some(h => h.toLowerCase().includes('details template'))) {
      const detailsText = await this.page.locator('body').textContent();
      if (!/details|template details|template information/i.test(detailsText)) {
        throw new Error('Details Template page not visible.');
      }
    }
  }

  async backToList() {
    const backBtn = this.page.getByRole('button', { name: 'Back' });
    await backBtn.waitFor({ state: 'visible', timeout: 5000 });
    await backBtn.click();
    await expect(this.heading).toBeVisible();
  }
  
};

