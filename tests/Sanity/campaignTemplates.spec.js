const { test, expect } = require('@playwright/test');
const { CampaignTemplatesPage } = require('../../pages/CampaignTemplatesPage');
const { CampaignTemplatesAddPage } = require('../../pages/CampaignTemplatesAddPage');

test.describe('Campaign Templates Page UI Validation', () => {
  test('should validate all UI elements ', async ({ page }) => {
    const campaignTemplates = new CampaignTemplatesPage(page);
    await campaignTemplates.goto();
    await campaignTemplates.validateUI();

    // Validate Add button is clickable
    await expect(campaignTemplates.addButton).toBeEnabled();

    // Validate Status dropdown options
    await campaignTemplates.selectStatus('Disabled');
    await campaignTemplates.selectStatus('Enabled');

    // Validate Refresh button is clickable
    await expect(campaignTemplates.refreshButton).toBeEnabled();
    await campaignTemplates.refreshButton.click();
  });

  test('should validate Create Template add page UI and navigation', async ({ page }) => {
    const campaignTemplates = new CampaignTemplatesPage(page);
    await campaignTemplates.goto();
    await campaignTemplates.validateUI();
    await campaignTemplates.addButton.click();

    const addPage = new CampaignTemplatesAddPage(page);
    await addPage.validateHeaderAndRefresh();
    await addPage.validateFormFields();
    await addPage.validateSaveAndBackButton();
    // Scroll up and click Back
    await addPage.heading.scrollIntoViewIfNeeded();
    await addPage.backButton.click();
    // Confirm navigation back to Campaign Templates page
    await expect(campaignTemplates.heading).toBeVisible();
  });

  test('should verify first row gear box menu options and Update/Details navigation', async ({ page }) => {
    const campaignTemplates = new CampaignTemplatesPage(page);
    await campaignTemplates.goto();
    await campaignTemplates.validateUI();

    const hasRows = await campaignTemplates.openFirstRowMenu();
    if (!hasRows) test.skip('No data rows present');

    // Verify all expected options
    const expectedOptions = [
      'Update',
      'Copy',
      'Details',
      'Delete',
      'Disable',
      'View Audit Trail',
    ];
    await campaignTemplates.verifyMenuOptions(expectedOptions);

    // Test Update navigation
    await campaignTemplates.updateTemplate();
    await campaignTemplates.backToList();

    // Open menu again for Details
    await campaignTemplates.openFirstRowMenu();
    await campaignTemplates.verifyMenuOptions(expectedOptions);
    await campaignTemplates.detailsTemplate();
    await campaignTemplates.backToList();
  });
});
