import { test, expect, chromium } from '@playwright/test';
import { CampaignPage } from '../../pages/campaign/campaignpage.js';
import { CampaignRowActions } from '../../pages/campaign/campaignRowActions.js';
import { CampaignAddPage } from '../../pages/campaign/CampaignAddPage.js';


test.describe('Campaign Page Sanity Tests', () => {
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

test('Campaign page UI and dropdowns', async () => {
  const campaignPage = new CampaignPage(page);
  await campaignPage.leftnav();
  await campaignPage.verifyHeading();
  await campaignPage.verifyButtons();
  await campaignPage.verifyStatusDropdownOptions();
  // Select each status option and wait for page load
  const statusOptions = [
    'Ready & Open',
    'All',
    'Ready',
    'Open',
    'Closed',
    'Closer Initiated',
  ];
  for (const option of statusOptions) {
    await campaignPage.selectStatusOption(option);
  }
  await campaignPage.verifyActiveArchivedDropdownOptions();
  // Select each Active/Archived option and wait for page load
  const activeArchivedOptions = ['Active', 'Archived'];
  for (const option of activeArchivedOptions) {
    await campaignPage.selectActiveArchivedOption(option);
  }
});

test('Campaign row actions and navigation', async () => {
  const campaignPage = new CampaignPage(page);
  const rowActions = new CampaignRowActions(page);
  await campaignPage.leftnav();
  await rowActions.selectClosedStatus();
  await rowActions.selectActive();
  // Use POM logic to handle gear click and skip if no data
  const gearClicked = await rowActions.openFirstRowGear();
  if (!gearClicked) {
    console.warn('No data available in table for Closed status. Skipping row actions test.');
    return;
  }
  // await rowActions.verifyActionOptions();
  await rowActions.clickView();
  await rowActions.verifyCampaignPreviewHeading();
  await rowActions.clickAnyViewButton();
  await rowActions.verifyUserAccessReviewsHeading();
  await rowActions.verifyReviewPageButtons();
  await rowActions.clickBackAndVerifyPreview();
  await rowActions.clickBackAndVerifyMainHeading();

  // --- Copy Campaign scenario ---
  await rowActions.openFirstRowGear();
  await rowActions.clickCopy();
  await rowActions.verifyCopyCampaignHeading();
  await rowActions.scrollToSaveCancelAndVerify();
  await rowActions.scrollUp();
  await rowActions.backBtn.click();
  await rowActions.verifyAccessReviewCampaignHeading();

  // --- Details Campaign scenario ---
  await rowActions.openFirstRowGear();
  await rowActions.clickDetails();
  await rowActions.verifyCampaignDetailsModalLabels();
  await rowActions.closeCampaignDetailsModal();

  // --- View Audit Trail scenario ---
  await rowActions.openFirstRowGear();
  await rowActions.clickViewAuditTrail();
  await rowActions.verifyAuditTrailPageText();
  await rowActions.verifyAuditTrailTableHeaders();
  await rowActions.verifyExportAndBackButtons();
  await rowActions.backBtn.click();
  await rowActions.verifyAccessReviewCampaignHeading();
});

test('Create Campaign UI flow', async () => {
  const campaignPage = new CampaignPage(page); // Add this line
  const campaignAddPage = new CampaignAddPage(page);
  await campaignPage.leftnav();
  // Step 1: Click Add Campaign button
  await campaignAddPage.clickAddCampaign();

  // Step 2: Verify Create Campaign header and template search input
  await campaignAddPage.verifyCreateCampaignHeader();

  // Step 3: Verify Create New Template button
  await campaignAddPage.verifyCreateNewTemplateBtn();

  // Step 4: Scroll to bottom and verify Save/Cancel buttons
  await campaignAddPage.scrollToBottom();
  await campaignAddPage.verifySaveAndCancelBtns();

  // Step 5: Scroll to top and verify Back button
  await campaignAddPage.scrollToTop();
  await campaignAddPage.verifyBackBtn();

  // Step 6: Click Back button and verify navigation
  await campaignAddPage.clickBackBtn();
  
});

});

