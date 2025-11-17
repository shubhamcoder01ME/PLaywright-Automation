import { test, expect } from '@playwright/test';
import { HistoricCampaignPage } from '../../pages/HistoricCampaignPage.js';

test.describe('Historic Campaign UI Flow', () => {
  test('Historic Campaign UI Flow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const campaign = new HistoricCampaignPage(page);

    await campaign.leftNavigation();
    await campaign.validatePage();

    // Chart types
    await campaign.selectChartType('bar');
    await campaign.selectChartType('pie');

    // Select all quarters dynamically
    await campaign.selectAllQuartersDynamically();

    // Select all annual totals dynamically
    await campaign.selectAllAnnualTotalsDynamically();
  });
});
