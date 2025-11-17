// tests/Sanity/campaignScheduler.spec.js
import { test, expect } from '@playwright/test';
import { CampaignSchedulerPage } from '../../pages/CampaignSchedulerPage.js';

test.describe('Campaign Scheduler UI Validations', () => {
  test('should validate Campaign Scheduler page and sorting', async ({ page }) => {
    await page.goto('/');

    const campaignSchedulerPage = new CampaignSchedulerPage(page);

    await campaignSchedulerPage.leftnav();
    await campaignSchedulerPage.verifyPageLoaded();
    await campaignSchedulerPage.clickAddButton();
    await page.waitForLoadState('networkidle');
    await campaignSchedulerPage.verifyAddPageLoaded();
    // Scroll down before SaveAndCancel
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await campaignSchedulerPage.SaveAndCancel();
    // Scroll up after SaveAndCancel
    await page.evaluate(() => window.scrollTo(0, 0));
    await campaignSchedulerPage.clickAddFromBackButton();       
    await page.waitForTimeout(1000);

    await campaignSchedulerPage.verifySorting(campaignSchedulerPage.columnName);
    await campaignSchedulerPage.verifySorting(campaignSchedulerPage.columnScheduledEndDate);
    await campaignSchedulerPage.verifySorting(campaignSchedulerPage.columnCreatedBy);
    await campaignSchedulerPage.verifySorting(campaignSchedulerPage.columnCreatedTime);

    // Verify the gear box options
    const expectedOptions = ['Update', 'Delete', 'View Audit Trail'];
    await campaignSchedulerPage.verifyGearMenuOptions(expectedOptions);

    // Click on "View Audit Trail"
    await campaignSchedulerPage.clickViewAuditTrailIfPresent();
    await campaignSchedulerPage.validateAuditTrailPage();
    await page.waitForTimeout(1000);
    
    const expectedHeaders = [
      'Action',
      'User',
      'Date Timestamp',
      'Description'
    ];

    await campaignSchedulerPage.verifyTableHeaders(expectedHeaders);
    await campaignSchedulerPage.backfromAuditTrail();


  });

});

