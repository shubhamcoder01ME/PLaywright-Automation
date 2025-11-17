import { expect } from '@playwright/test';

export class CampaignAddPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      addCampaignBtn: page.locator('button#add-campaign, button:has-text("Add")'),
      createCampaignHeader: page.locator('span.strapi-pagename'),
      searchTemplateInput: page.locator('input[placeholder="Search Existing Template"]'),
      createNewTemplateBtn: page.getByRole('button', { name: /create new template/i }),
      saveBtn: page.getByRole('button', { name: /save/i }),
      cancelBtn: page.getByRole('button', { name: /cancel/i }),
      backBtn: page.getByRole('button', { name: /back/i }).or(page.getByRole('link', { name: /back/i })),
    };
  }

  async clickAddCampaign() {
    await expect(this.locators.addCampaignBtn).toBeVisible();
    await expect(this.locators.addCampaignBtn).toBeEnabled();
    await this.locators.addCampaignBtn.click();
  }

  async verifyCreateCampaignHeader() {
    await expect(this.locators.searchTemplateInput).toBeVisible({ timeout: 10000 });
    const text = await this.locators.createCampaignHeader.textContent();
    if (!text || text.trim() !== 'Create Campaign') {
      throw new Error(`Expected heading text 'Create Campaign', but got '${text}'`);
    }
  }

  async verifyCreateNewTemplateBtn() {
    await expect(this.locators.createNewTemplateBtn).toBeVisible();
    await expect(this.locators.createNewTemplateBtn).toBeEnabled();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(500);
  }

  async verifySaveAndCancelBtns() {
    await expect(this.locators.saveBtn).toBeVisible();
    await expect(this.locators.saveBtn).toBeEnabled();
    await expect(this.locators.cancelBtn).toBeVisible();
    await expect(this.locators.cancelBtn).toBeEnabled();
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(500);
  }

  async verifyBackBtn() {
    await expect(this.locators.backBtn).toBeVisible();
    await expect(this.locators.backBtn).toBeEnabled();
  }

  async clickBackBtn() {
    await expect(this.locators.backBtn).toBeVisible();
    await expect(this.locators.backBtn).toBeEnabled();
    await this.locators.backBtn.click();
  }
}