import { test, expect } from '@playwright/test';
import IntelligencePage from '../../pages/IntelligencePage.js';

test.describe('Intelligence Page UI Validation', () => {

  let intelligencePage;

  test('Full Intelligence Section Test', async ({ page }) => {
    // Login is handled by global setup (storageState)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    intelligencePage = new IntelligencePage(page);
    await intelligencePage.clickIdentityMindmapMenu();
    await intelligencePage.verifyPageHeading();
    await intelligencePage.verifyTextBox();
    await intelligencePage.fillTextBox();
    await intelligencePage.selectFirstOptionFromDropdown();
    await intelligencePage.verifyOptionsInPage();
    await intelligencePage.verifyClearButton();
  
    await intelligencePage.clickApplicationMindmapMenu();
    await intelligencePage.verifyPageHeading();
    await intelligencePage.verifyPageText();
    await intelligencePage.verifyApplicationMindmapDropdown();
    await intelligencePage.clickApplicationMindmapDropdown();
  
    await intelligencePage.clickEntitlementMindmapMenu();
    await intelligencePage.verifyPageHeading('Entitlement Mind Map');
    await intelligencePage.verifyEntitlementTextBox();
    await intelligencePage.verifyEntitlementClearButton();
    await intelligencePage.verifyEntitlementPageText();
 
    await intelligencePage.clickApplicationReportsMenu();
    await intelligencePage.verifyApplicationReportsPageHeading();
    await intelligencePage.verifyApplicationReportsPageText();
    await intelligencePage.clickAllDropdowns();
    await intelligencePage.verifyApplicationReportsGearOptions();
    await intelligencePage.verifyExportButtonInPage();
    await intelligencePage.verifyButtonInPage('Application Reports', 'Run Now');
 
    await intelligencePage.clickAccessAnalysisMenu();
    await intelligencePage.closePopup();
    await intelligencePage.verifyAccessAnalysisSection();
    await intelligencePage.verifyApplyFilterButton();
  });
});
