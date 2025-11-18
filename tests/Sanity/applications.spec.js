import { test, expect } from '@playwright/test';
import ApplicationsPage from '../../pages/ApplicationsPage.js';

test.describe('Applications Page UI Validation', () => {

  let applicationsPage;

  test('Full Applications Page Test', async ({ page }) => {
    // Login is handled by global setup (storageState)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    applicationsPage = new ApplicationsPage(page);

    await applicationsPage.navigateToApplicationsPage();
    await applicationsPage.verifyApplicationsPageHeading();

    await applicationsPage.verifyButtonOnPage('Add');
    await applicationsPage.verifyDropdownsOnPage();
    await applicationsPage.verifyLinkOnPage('Generic Agent Status');
    await applicationsPage.verifyRefreshButton();

    const columns = ['Name', 'Type', 'Status', 'Created On'];
    await applicationsPage.verifyApplicationsTableColumns(columns);

    await applicationsPage.performSearchOperation('csv');
    await applicationsPage.verifyTableDataAvailable();

    await applicationsPage.clickApplicationsDropdownMenu();
    const options = ['Export', 'Schedule Export', 'Custodian', 'Bulk Assign', 'Bulk Exclude', 'Bulk Restore', 'View Details', 'Disable', 'Sync Status'];
    await applicationsPage.verifyApplicationsDropdownOptions(options);

    await applicationsPage.hoverOnMoreOption();
    const moreOptions = options; // reuse
    await applicationsPage.verifyMoreOptions(moreOptions);

    //await applicationsPage.clickViewAuditTrailOption();

    await applicationsPage.clickDetailsOption();
    await applicationsPage.verifyApplicationDetailsPageHeading();
    await applicationsPage.clickCloseButtonInDetailsPage();


    await applicationsPage.clickApplicationsDropdownMenu();
    await applicationsPage.clickCredentialsOption();
    
    await applicationsPage.clickApplicationsDropdownMenu();
    await applicationsPage.clickUpdateOption();
    await applicationsPage.verifyUpdateApplicationPageHeading();
    const expectedSections = ['Application Details', 'Settings', 'Connector Info'];
    await applicationsPage.verifySectionsInUpdateApplicationPage(expectedSections);
    await applicationsPage.verifySaveAndBackButtonsInUpdateApplicationPage();
    await applicationsPage.clickBackButtonInUpdateApplication();

    await applicationsPage.clickAddButton();
    await applicationsPage.verifyAddApplicationPageHeading();
    const radioButtons = ['Flex Connector', 'Connector'];
    await applicationsPage.verifyRadioButtonsInAddApplicationPage(radioButtons);

    await applicationsPage.verifyFileUploadPage();
    await applicationsPage.verifyFlexConnectorPage();
    await applicationsPage.verifyConnectorPage();

    await applicationsPage.verifyButtons();
     
  });

});

