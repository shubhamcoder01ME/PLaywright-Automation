import { test, expect, chromium } from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';
import SystemOfRecordPage from '../../pages/systemOfRecordPage.js';
import SystemOfRecordAddPage from '../../pages/systemOfRecordAddPage.js';

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



test.describe('Sanity - Sysytem of record', () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('System of record navigation', async () => {


    const sor = new SystemOfRecordPage(page);
    await sor.gotoFromNav();
    await sor.verifyHeadingVisible();
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
    const statuses = [
      { value: 'false', label: 'Enabled' },
      { value: 'true', label: 'Disabled' },
    ];
    for (const s of statuses) {
      await sor.selectStatusByValue(s.value);
      const selected = await sor.getSelectedStatusLabel();
      expect(selected).toBe(s.label);
    }
    await sor.clickRefresh();
    await sor.expectTableHeaders(expectedHeaders);
  });

  test('System of record gear box update -import', async () => {
    const sor = new SystemOfRecordPage(page);
    await sor.gotoFromNav();
    await sor.verifyHeadingVisible();
    await sor.selectTypeByValue('CSV');
    await sor.clickFirstRowGearAndVerifyOptions([
      'Sync',
      'Update',
      'Delete',
      'Import',
      'Credentials',
      'More'
    ]);
    await sor.clickUpdateOption();
    await sor.verifyUpdatePageHeading();
    await sor.clickBackFromUpdate();
    await sor.verifyHeadingVisible();
    await sor.clickFirstRowGearAndVerifyOptions([
      'Sync',
      'Update',
      'Delete',
      'Import',
      'Credentials',
      'More'
    ]);
    await sor.clickImportOption();
    await sor.verifyImportModalVisible();
    await sor.closeImportModal();
    await sor.verifyImportModalClosed();
  });

  test('System of Record - Actions menu Details - view audit trail', async () => {
    const sor = new SystemOfRecordPage(page);
    await sor.gotoFromNav();
    await sor.verifyHeadingVisible();
    await sor.selectTypeByValue('File');
    await sor.clickFirstRowGearAndVerifyOptions([
      'Sync',
      'Update',
      'Delete',
      'Import',
      'Credentials',
      'More'
    ]);
    await sor.hoverMoreAndVerifySubOptions([
      'Export',
      'Schedule Export',
      'Disable',
      'Export Skipped Records',
      'Sync Status',
      'Details',
      'View Audit Trail'
    ]);
    await sor.clickDetailsUnderMore();
    await sor.verifyDetailsPageVisible();
    await sor.clickBackFromDetails();
    await sor.verifyHeadingVisible();
    await sor.clickFirstRowGearAndVerifyOptions([
      'Sync',
      'Update',
      'Delete',
      'Import',
      'Credentials',
      'More'
    ]);
    await sor.hoverMoreAndVerifySubOptions([
      'Export',
      'Schedule Export',
      'Disable',
      'Export Skipped Records',
      'Sync Status',
      'Details',
      'View Audit Trail'
    ]);
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
    await sor.clickBackFromDetailsOrAuditTrail();
    await sor.verifyHeadingVisible();
  });
});


test.describe('Sanity - System of Record Add', () => {
  test('Verify Add SOR', async ({page}) => {
    const sor = new SystemOfRecordPage(page);
    const sorAdd = new SystemOfRecordAddPage(page);
    await page.goto('https://qa30.securends.com/listofSystemRecords');
    await sorAdd.clickAdd();
    await sorAdd.verifyAddPageLoaded();
    await sorAdd.verifyDataIngestionOptions();
    await sorAdd.verifySetupApplication();
    await sorAdd.selectFlexConnector();
    await sorAdd.verifySetupApplication();
    await sorAdd.verifyConfigureApplication();
    await sorAdd.selectConnector();
    await sorAdd.searchAndSelectActiveDirectory();
    await sorAdd.verifyConnectorSetupApplication();
    await sorAdd.configureApplicationSection.scrollIntoViewIfNeeded();
    await sorAdd.configureApplicationSection.waitFor({ state: 'visible', timeout: 5000 });
    const dataImportSchedule = page.getByText('Data Import Schedule', { exact: true });
    await dataImportSchedule.waitFor({ state: 'visible', timeout: 5000 });
    await sorAdd.clickBackAndVerifyNavigation();
  });
});

