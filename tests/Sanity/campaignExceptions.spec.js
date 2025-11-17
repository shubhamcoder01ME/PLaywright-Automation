import { test, expect } from '@playwright/test';
import { CampaignExceptionsPage } from '../../pages/CampaignExceptionsPage.js';
import { time } from 'console';

test.describe('Campaign Exceptions - UI Validation', () => {
  test('Validate Campaign Exceptions page UI', async ({ page }) => {
    await page.goto('/');

    const campaignExceptionsPage = new CampaignExceptionsPage(page);
    
    await campaignExceptionsPage.leftnav();
    await campaignExceptionsPage.validatePage();
    await campaignExceptionsPage.validateTableHeaders();
    await campaignExceptionsPage.clickViewAudit();
    await page.waitForTimeout(500);
    await campaignExceptionsPage.validateAuditTrailPage();
    await campaignExceptionsPage.validateAuditTrailTableHeaders();
    await campaignExceptionsPage.clickBack();
    await page.waitForTimeout(1000);
    await campaignExceptionsPage.validatePage();
    
  });
});