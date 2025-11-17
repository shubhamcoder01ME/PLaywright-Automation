import { expect } from '@playwright/test';

export class CampaignPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  this.leftnavCampaign = page.getByRole('link', { name: 'Campaigns', exact: true });
    this.heading = page.getByRole('heading', { name: 'Access Review Campaign' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.bulkLaunchButton = page.getByRole('button', { name: 'Bulk Launch' });
    this.campaignProgressButton = page.getByRole('button', { name: 'Campaign Progress' });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.statusDropdown = page.getByLabel('Status:');
    this.activeArchivedDropdown = page.getByLabel('Active/Archived:');
  }

    async leftnav() {
    await this.leftnavCampaign.click();
    await this.page.waitForLoadState('networkidle');
    }

  async verifyHeading() {
    await expect(this.heading).toBeVisible();
  }

  async verifyButtons() {
    await expect(this.addButton).toBeVisible();
    await expect(this.bulkLaunchButton).toBeVisible();
    await expect(this.campaignProgressButton).toBeVisible();
    await expect(this.refreshButton).toBeVisible();
  }

  async verifyStatusDropdownOptions() {
    const options = await this.statusDropdown.locator('option').allTextContents();
    expect(options).toEqual([
      'Ready & Open',
      'All',
      'Ready',
      'Open',
      'Closed',
      'Closer Initiated',
    ]);
  }

  async selectStatusOption(option) {
  await this.statusDropdown.selectOption({ label: option });
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(1500);
  }

  async verifyActiveArchivedDropdownOptions() {
    const options = await this.activeArchivedDropdown.locator('option').allTextContents();
    expect(options).toEqual(['Active', 'Archived']);
  }

  async selectActiveArchivedOption(option) {
  await this.activeArchivedDropdown.selectOption({ label: option });
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(1500);
  }
};
