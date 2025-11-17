import { expect } from '@playwright/test';

export class CampaignTemplatesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Top-level locators

    this.leftnavCampaignTemplates = page.getByRole('link', { name: /Campaign Templates/i });
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
    // Row/menu locators
    this.rows = page.locator('.react-table .rt-tbody .rt-tr-group');
    this.firstRow = this.rows.nth(0);
    this.firstRowGearBtn = this.firstRow.locator('.rt-td button, td button').first();
    this.firstRowMenu = this.firstRow.locator('.dropdown-menu, .MuiPaper-root, .menu').first();
    this.menuItems = this.firstRowMenu.locator('li, button, .MuiMenuItem-root, .dropdown-item');
    this.updateHeading = page.getByRole('heading', { name: /update template/i });
    this.detailsModalHeading = page.getByRole('heading', { name: /campaign template details/i });
    this.closeModalBtn = page.getByRole('button', { name: /close/i });
    this.backBtn = page.getByRole('button', { name: 'Back' });
  }

  async goto() {
    await this.page.goto('https://qa30.securends.com/campaignTemplates');
  }

  async leftnav() {
    await this.leftnavCampaignTemplates.click();
    await this.page.waitForLoadState('networkidle');
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
    return this.rows;
  }

  async openFirstRowMenu() {
    if (await this.rows.count() === 0) return false;
    await this.firstRowGearBtn.click();
    this.menu = this.firstRowMenu;
    await this.menu.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.waitForTimeout(200);
    return true;
  }

async verifyMenuOptions(options) {
  if (!this.menu) throw new Error('Menu not opened. Call openFirstRowMenu() first.');
  const menuItems = await this.menuItems.elementHandles();
  const visibleTexts = [];
  for (const el of menuItems) {
    if (await el.isVisible && await el.isEnabled) {
      const text = (await el.textContent()).replace(/\s+/g, ' ').trim();
      visibleTexts.push(text);
    }
  }
  for (const option of options) {
    const found = visibleTexts.some(text => text.toLowerCase().includes(option.toLowerCase()));
    if (!found) {
      throw new Error(`Menu option '${option}' not visible and enabled in the menu.\nVisible: ${visibleTexts.join(', ')}`);
    }
  }
}


  async clickMenuOption(option) {
    // Ensure the menu is open before clicking the option
    if (!this.menu || !(await this.menu.isVisible())) {
      await this.openFirstRowMenu();
    }
    const optLocator = this.menuItems.filter({ hasText: option }).first();
    await optLocator.waitFor({ state: 'visible', timeout: 5000 });
    await optLocator.click();
  }

  async updateTemplateAndAssert() {
    await this.clickMenuOption('Update');
    await this.page.waitForLoadState('networkidle');
    await expect(this.updateHeading).toBeVisible();
  }

  async detailsTemplateAndAssert() {
    await this.clickMenuOption('Details');
    await this.page.waitForLoadState('networkidle');
    await expect(this.detailsModalHeading).toBeVisible();
    if (await this.closeModalBtn.isVisible()) {
      await this.closeModalBtn.click();
    }
  }
  

  async backToList() {
    await this.backBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.backBtn.click();
    await expect(this.heading).toBeVisible();
  }
  
};

