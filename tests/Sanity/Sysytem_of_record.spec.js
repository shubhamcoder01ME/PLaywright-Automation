const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const SystemOfRecordPage = require('../../pages/systemOfRecordPage');
const SystemOfRecordAddPage = require('../../pages/systemOfRecordAddPage');

// expected table headers for System Of Record
const expectedHeaders = [
  'Action',
  'Application',
  'Status',
  'Type',
  'Latest Data Sync',
  'Total Identities',
  'Included',
  'Excluded',
  'Skipped',
  'Purged'
];
// Perform login before each test using the Playwright `page` fixture.
// This avoids storage-state file race conditions and keeps the test self-contained.
// test.beforeEach(async ({ page }) => {
//   const login = new LoginPage(page);
//   await login.goto();
//   await login.login('Shubham.kumar@securends.com', 'Securends@12345');
// });

test.describe('Sanity - Sysytem of record', () => {
  test('System of record navigation', async ({ page }) => {
    const sor = new SystemOfRecordPage(page);
    
   await page.goto('https://qa30.securends.com/listofSystemRecords');            // left navigation click to SOR

    await sor.verifyHeadingVisible();                                           // verify page heading is visible 

    // iterate type options discovered earlier
    const types = [
      { value: 'all', label: 'All' },
      { value: 'CSV', label: 'File' },
      { value: 'AUTOMATIC', label: 'Connector' },
    ];
    for (const t of types) {
      await sor.selectTypeByValue(t.value);
      const selected = await sor.getSelectedTypeLabel();
      expect(selected).toBe(t.label);
    }

    // iterate status options: Enabled / Disabled
    const statuses = [
      { value: 'false', label: 'Enabled' },
      { value: 'true', label: 'Disabled' },
    ];
    for (const s of statuses) {
      await sor.selectStatusByValue(s.value);
      const selected = await sor.getSelectedStatusLabel();
      expect(selected).toBe(s.label);
    }

    // verify refresh is visible and click it
    await sor.clickRefresh();

    // verify all table headers match expected list
    await sor.expectTableHeaders(expectedHeaders);

   });

   test('System of record gear box update -import', async ({ page }) => {
    const sor = new SystemOfRecordPage(page);
    await page.goto('https://qa30.securends.com/listofSystemRecords');

    await sor.verifyHeadingVisible();        // verify page heading

    await sor.selectTypeByValue('CSV');       // Select File type from Type dropdown

    //  Open first row’s gear icon and verify all options
    await sor.clickFirstRowGearAndVerifyOptions([
      'Sync',
      'Update',
      'Delete',
      'Import',
      'Credentials',
      'More'
    ]);

    await sor.clickUpdateOption();          //  Click Update option

    await sor.verifyUpdatePageHeading();     // Verify the SOR Update Application heading

    await sor.clickBackFromUpdate();         // Click Back

    await sor.verifyHeadingVisible();        // Verify System of Record heading reappears

      // Click first row gear icon and verify all action options
    await sor.clickFirstRowGearAndVerifyOptions([
    'Sync',
    'Update',
    'Delete',
    'Import',
    'Credentials',
    'More'
  ]);

  await sor.clickImportOption();                // Click on Import option

  await sor.verifyImportModalVisible();         // Verify Import modal is visible

  await sor.closeImportModal();                 // Close the Import modal

  await sor.verifyImportModalClosed();          // Verify modal is closed
  });
  


test('System of Record - Actions menu Details - view audit trail', async ({ page }) => {
    const sor = new SystemOfRecordPage(page);
    await page.goto('https://qa30.securends.com/listofSystemRecords');       // Navigate to System of Record page
 
    await sor.verifyHeadingVisible();   // Verify heading is visible
   
    await sor.selectTypeByValue('File');    // Select "File" type

    // Click first row gear and verify options
    await sor.clickFirstRowGearAndVerifyOptions([
      'Sync',
      'Update',
      'Delete',
      'Import',
      'Credentials',
      'More'
    ]);
    // Hover over More and verify sub-options
    await sor.hoverMoreAndVerifySubOptions([
      'Export',
      'Schedule Export',
      'Disable',
      'Export Skipped Records',
      'Sync Status',
      'Details',
      'View Audit Trail'
    ]);

    await sor.clickDetailsUnderMore();            // Click Details under More

    await sor.verifyDetailsPageVisible();         // Verify Details page is visible

    await sor.clickBackFromDetails();             // Click Back from Details
 
    await sor.verifyHeadingVisible();             // Verify main heading reappears

        // Click first row gear and verify options
    await sor.clickFirstRowGearAndVerifyOptions([
      'Sync',
      'Update',
      'Delete',
      'Import',
      'Credentials',
      'More'
    ]);
    // Hover over More and verify sub-options
    await sor.hoverMoreAndVerifySubOptions([
      'Export',
      'Schedule Export',
      'Disable',
      'Export Skipped Records',
      'Sync Status',
      'Details',
      'View Audit Trail'
    ]);
    // Click View Audit Trail under More
    await sor.clickViewAuditTrailUnderMore();
    await sor.verifyAuditTrailPageVisible('Application Audit Trail');

     await sor.verifyAuditTrailTableHeaders([
    'Action',
    'User',
    'Date Timestamp',
    'Description',
    'From',
    'To'
    ]);
    
   // Back to main page
    await sor.clickBackFromDetailsOrAuditTrail();
    await sor.verifyHeadingVisible();

  });
});

test.describe('Sanity - System of Record Add', () => {
  test('Verify File-upload', async ({ page }) => {
    const sor = new SystemOfRecordPage(page);
    const sorAdd = new SystemOfRecordAddPage(page);
    
    // Navigate to System of Record and click Add
    await page.goto('https://qa30.securends.com/listofSystemRecords');           // left navigation click to SOR
    await sorAdd.clickAdd();

    // Verify Add page loaded with expected elements
    await sorAdd.verifyAddPageLoaded();

    // Verify Data Ingestion options with File Upload selected by default
    await sorAdd.verifyDataIngestionOptions();

    // Verify Setup Application section is present with required fields
    await sorAdd.verifySetupApplication();
  });

  test('Verify Flex Connector ', async ({ page }) => {
    const sor = new SystemOfRecordPage(page);
    const sorAdd = new SystemOfRecordAddPage(page);
    
    // Navigate to System of Record and click Add
    await page.goto('https://qa30.securends.com/listofSystemRecords');             // left navigation click to SOR
    await sorAdd.clickAdd();

    // Verify Add page loaded
    await sorAdd.verifyAddPageLoaded();

    // Select Flex Connector option
    await sorAdd.selectFlexConnector();

    // Verify Setup Application section with all fields
    await sorAdd.verifySetupApplication();

    // Verify Configure Application section with all connection types
    await sorAdd.verifyConfigureApplication();
  });

  test('Verify Connector flow ', async ({ page }) => {
    const sor = new SystemOfRecordPage(page);
    const sorAdd = new SystemOfRecordAddPage(page);
    
    // Navigate to System of Record and click Add
    await page.goto('https://qa30.securends.com/listofSystemRecords');             // left navigation click to SOR
    await sorAdd.clickAdd();

    // Select Connector option
    await sorAdd.selectConnector();

    // Search and verify Active Directory
    await sorAdd.searchAndSelectActiveDirectory();

    // Verify Connector-specific Setup Application section
    await sorAdd.verifyConnectorSetupApplication();

    // Verify Configure Application section is visible
    await sorAdd.configureApplicationSection.scrollIntoViewIfNeeded();
    await sorAdd.configureApplicationSection.waitFor({ state: 'visible', timeout: 5000 });

    // Verify Data Import Schedule text
    const dataImportSchedule = page.getByText('Data Import Schedule', { exact: true });
    await dataImportSchedule.waitFor({ state: 'visible', timeout: 5000 });

    // Scroll back up and verify back navigation
    await sorAdd.clickBackAndVerifyNavigation();
  });
});

// afterAll: close the browser (worker-level)
// test.afterAll(async ({ browser }) => {
//   // Close the browser instance for this worker. Playwright typically manages browser lifecycle,
//   // but the user explicitly requested closing it after all tests in this file.
//   try {
//     await browser.close();
//   } catch (e) {
//     console.warn('Error closing browser in afterAll:', e);
//   }
// });
