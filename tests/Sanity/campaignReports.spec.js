import { test, expect } from '@playwright/test';
import { CampaignReportsPage } from '../../pages/CampaignReportsPage.js';

test.describe('Campaign Reports UI and Actions', () => {
  test('should validate Campaign Reports page and actions', async ({ page }) => {
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const campaignReports = new CampaignReportsPage(page);

    await campaignReports.leftnav();
    await campaignReports.verifyPageLoaded();

    await campaignReports.selectStatus('All');       //. Interact with dropdowns
    await campaignReports.selectStatus('Ready');
    await campaignReports.selectStatus('Open');
    await campaignReports.selectStatus('Closed');
    await campaignReports.selectStatus('All');
    await campaignReports.selectActiveArchived('Active');
    await campaignReports.selectActiveArchived('Archived');
    await campaignReports.selectActiveArchived('Active');
    await page.waitForTimeout(1000);
    //Click View Report
    await campaignReports.openFirstCampaignActions();
    await campaignReports.clickViewReport(); // Open and close to ensure menu loads
    await campaignReports.verivyAuditReportPage();  
    await campaignReports.verifyReportPageElements();
    await campaignReports.verifyEffectivenessReportPageElements();
    await campaignReports.clickBack();
    // click Details
    await campaignReports.openFirstCampaignActions();
    await campaignReports.clickDetails(); // Open Details page
    await campaignReports.verifyDetailsPageElements();
    await campaignReports.closeDetailsModal();
    await page.waitForTimeout(1000);
    await campaignReports.verifyPageLoaded();

  });
});
