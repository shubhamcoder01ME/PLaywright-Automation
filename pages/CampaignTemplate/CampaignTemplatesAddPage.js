// Page Object for Campaign Template Add Page
import { expect } from '@playwright/test';

export class CampaignTemplatesAddPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  this.heading = page.getByRole('heading', { name: 'Create Template' });
  this.headingAll = page.getByRole('heading');
  this.templateNameText = page.getByText('Template Name');
  this.templateNameLabel = page.locator('#nameLabel');
  this.descriptionText = page.getByText('Description');
  this.descriptionLabel = page.locator('#descriptionLabel');
  this.serviceAccountOnlyReview = page.locator('#epTable');
  this.peopleSORFilter = page.getByText('Select People/SOR Filtering');
  this.applicationFilter = page.getByText('Select Application Filtering');
  this.saveButton = page.getByRole('button', { name: 'Save' });
  this.backButton = page.getByRole('button', { name: 'Back' });
  }

  async validateHeaderAndRefresh() {
    await expect(this.heading).toBeVisible();
    await expect(this.headingAll).toContainText('Create Template');
  }

  async validateFormFields() {
    await expect(this.templateNameText).toBeVisible();
    await expect(this.templateNameLabel).toContainText('Template Name');
    await expect(this.descriptionText).toBeVisible();
    await expect(this.descriptionLabel).toContainText('Description');
    await expect(this.serviceAccountOnlyReview).toContainText('Service Account Only Review?YesNo');
    await expect(this.peopleSORFilter).toBeVisible();
    await expect(this.applicationFilter).toBeVisible();
  }

  async validateSaveAndBackButton() {
    await this.saveButton.scrollIntoViewIfNeeded();
    await expect(this.saveButton).toBeVisible();
    await expect(this.backButton).toBeVisible();
  }
};
