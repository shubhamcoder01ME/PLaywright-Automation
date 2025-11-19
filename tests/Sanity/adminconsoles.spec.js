import { test, expect } from '@playwright/test';
import AdminconsolesPage from '../../pages/AdminconsolesPage.js';

test.describe('AdminConsoles Page UI Validation', () => {

  let adminconsolesPage;

  test('Full Adminconsoles Page Test', async ({ page }) => {
    test.setTimeout(90000); // Set test timeout to 90 seconds
    // Login is handled by global setup (storageState)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    adminconsolesPage = new AdminconsolesPage(page);
  
    await adminconsolesPage.navigateToConfigurationPage();
    await adminconsolesPage.verifyConfigurationPageHeading();
    await adminconsolesPage.verifyAllButtonsByName();
    await adminconsolesPage.verifyAllLabels();
    await adminconsolesPage.verifyRolesCongigurationConfigurationPage();
    await adminconsolesPage.verifyRolesViewPage();
    await adminconsolesPage.verifyTicketingSystemSetupPage();
    await adminconsolesPage.verifyTicketingSystemConfigurationsPage();
    await adminconsolesPage.verifyEmailSettingsSetupPage();
    await adminconsolesPage.verifyEmailSettingsConfigurationsPage();
    await adminconsolesPage.verifyMessageConfigurationSetupPage();
    await adminconsolesPage.verifyCampaignsInstructionsNotesPage();
    await adminconsolesPage.verifyCampaignsConfigurationsPage();
    await adminconsolesPage.verifyUIConfigurationViewPage();
    await adminconsolesPage.verifyDefaultUIConfigurationViewPage();
    await adminconsolesPage.verifySORFieldsPage();
    await adminconsolesPage.verifyManageAssignDetailsPage();
    await adminconsolesPage.verifyGlobalDefaultReviewerPage();
    await adminconsolesPage.verifyManageIdentityAttributesPage();
    await adminconsolesPage.verifyUsersReportSchedulePage();


    await adminconsolesPage.navigateToLogsPage();
    await adminconsolesPage.navigateToAgentStatusPage();
    await adminconsolesPage.navigateToExportDownloadsPage();
    await adminconsolesPage.navigateToArchievedDataPage();
    await adminconsolesPage.navigateToLicensePage();
    await adminconsolesPage.navigateToFlexRPARecipesPage();

  });
});