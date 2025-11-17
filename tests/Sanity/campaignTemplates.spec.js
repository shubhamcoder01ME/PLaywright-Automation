import { test, expect } from '@playwright/test';
import { CampaignTemplatesPage } from '../../pages/CampaignTemplate/CampaignTemplatesPage.js';
import { CampaignTemplatesAddPage } from '../../pages/CampaignTemplate/CampaignTemplatesAddPage.js';
import { time } from 'console';

test.describe('Campaign Templates Page UI Validation', () => {
  let campaignTemplates;
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    campaignTemplates = new CampaignTemplatesPage(page);
    await campaignTemplates.leftnav();
    await campaignTemplates.validateUI();
  });

  test('should validate all UI elements and ADD ', async ({ page }) => {
    // Validate Add button is clickable
    await expect(campaignTemplates.addButton).toBeEnabled();

    // Validate Status dropdown options
    await campaignTemplates.selectStatus('Disabled');
    await campaignTemplates.selectStatus('Enabled');

    // Validate Refresh button is clickable
    await expect(campaignTemplates.refreshButton).toBeEnabled();
    await campaignTemplates.refreshButton.click();

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



  test('verify first row gear box menu options and Update/Details navigation', async ({ page }) => {
    const hasRows = await campaignTemplates.openFirstRowMenu();
    if (!hasRows) test.skip('No data rows present');

    // // Verify all expected options
    // const expectedOptions = [
    //   'Update',
    //   'Copy',
    //   'Details',
    //   'Delete',
    //   'Disable',
    //   'View Audit Trail',
    // ];
    // await campaignTemplates.verifyMenuOptions(expectedOptions);

    await campaignTemplates.updateTemplateAndAssert();
    await page.waitForTimeout(500);
    await campaignTemplates.backToList();
    await page.waitForTimeout(500);
    await campaignTemplates.openFirstRowMenu();
    await campaignTemplates.detailsTemplateAndAssert();
  });
});
