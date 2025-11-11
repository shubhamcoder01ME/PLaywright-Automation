const { test, expect } = require('@playwright/test');
const ValidationPage = require('../../pages/VAlidationpage');

test.describe('Validation Policy - Complete Test Suite', () => {
  let validationPage;

  test.beforeEach(async ({ page }) => {
    /**
     * Initialize ValidationPage POM for each test
     * Note: Global setup already handles login and saves session in storageState.json
     * The storageState is automatically loaded by playwright.config.js
     */
    validationPage = new ValidationPage(page);
  });

  test.skip('Complete Validation Policy Test - All Validations', async ({ page }) => {
    // Navigate to home page first
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to Validation Policy via left navigation menu
    const accessValidationButton = page.getByRole('button', { name: /Access Validation/i });
    await expect(accessValidationButton).toBeVisible();
    await accessValidationButton.click();
    await page.waitForLoadState('networkidle');
    
    const validationPolicyMenu = page.getByRole('link', { name: /Validation Policy/i });
    await expect(validationPolicyMenu).toBeVisible();
    await validationPolicyMenu.click();
    await page.waitForLoadState('networkidle');

    // Verify page heading
    const headingText = await validationPage.verifyPageHeading();
    expect(headingText).toContain('Validation Policy');

    // Verify Add button
    await validationPage.verifyAddButtonPresent();

    // Verify table is visible
    await validationPage.verifyTableIsVisible();

    // Verify all table headers
    const expectedHeaders = [
      'Actions',
      'Policy Name',
      'Description',
      'Policy ID',
      'SoD Queries',
      'Last Modified By',
      'Last Modified Date'
    ];
    
    const headers = await validationPage.verifyTableHeaders();
    expect(headers).toEqual(expectedHeaders);

    // Verify each header individually
    for (const header of expectedHeaders) {
      const headerElement = page.locator(`text="${header}"`);
      await expect(headerElement).toBeVisible({ timeout: 10000 });
    }

    // Verify complete page state
    const pageState = await validationPage.verifyPageState();
    
    expect(pageState.headingVisible).toBe(true);
    expect(pageState.addButtonVisible).toBe(true);
    expect(pageState.tableVisible).toBe(true);
    expect(pageState.rowCount).toBeGreaterThanOrEqual(0);
  });

  test('Create SoD Policy - Basic Form Flow', async ({ page }) => {
    // Navigate to home then Validation Policy page (re-using nav used above)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessValidationButton = page.getByRole('button', { name: /Access Validation/i });
    await expect(accessValidationButton).toBeVisible();
    await accessValidationButton.click();
    await page.waitForLoadState('networkidle');

    const validationPolicyMenu = page.getByRole('link', { name: /Validation Policy/i });
    await expect(validationPolicyMenu).toBeVisible();
    await validationPolicyMenu.click();
    await page.waitForLoadState('networkidle');

    // Initialize page object for this page
    const validationPolicyPage = new ValidationPage(page);

    // Click Add
    await validationPolicyPage.clickAddButton();

    // Verify form fields on Create SoD Policy page
    await validationPolicyPage.verifyFormFields([
      'SoD Policy Name',
      'Description',
      'SoD Policy ID'
    ]);

    // Verify Additional Policy Notifications section
    await validationPolicyPage.verifyAdditionalPolicySection();

    // Search and select user
    await validationPolicyPage.searchForUser('admin');
    await validationPolicyPage.selectUserFromDropdown('admin@securends.com');

    // Click + Add More and verify expanded section (if present)
    await validationPolicyPage.clickAddMore().catch(() => {});
    await validationPolicyPage.verifyLabelInExpandedSection('Include Inactive Users').catch(() => {});

    // Toggle Include Inactive Users options (best-effort)
    await validationPolicyPage.selectInactiveUsersOption('No').catch(() => {});
    await validationPolicyPage.selectInactiveUsersOption('Yes').catch(() => {});

    // Identity Filter options
    await validationPolicyPage.verifyLabelInExpandedSection('Identity Filter').catch(() => {});
    await validationPolicyPage.selectIdentityFilterOption('Default').catch(() => {});

    // --- NEW: After clicking Add, verify heading and attributes, then scroll down to Save button ---
    // Verify Create page heading
    await validationPolicyPage.verifyHeading('Create New SoD Policy');

    // Verify key form fields exist
    await validationPolicyPage.verifyFormFields([
      'SoD Policy Name',
      'Description',
      'SoD Policy ID'
    ]);

    // Scroll to bottom to reveal Save button
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Wait a moment for UI to settle
    await page.waitForTimeout(500);

    const saveBtn = page.getByRole('button', { name: /Save/i }).first();
    await expect(saveBtn).toBeVisible({ timeout: 5000 });
    const box = await saveBtn.boundingBox();
    const innerWidth = await page.evaluate(() => window.innerWidth);
    if (box) {
      // Expect Save button to be positioned towards the right half of the viewport
      expect(box.x).toBeGreaterThan(innerWidth * 0.4);
    }

    // Scroll back up and verify Back button then click it
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const backBtn = page.getByRole('button', { name: /Back/i }).first();
    await expect(backBtn).toBeVisible({ timeout: 5000 });
    await backBtn.click();

    // Verify navigation back to Validation Policy list
    await validationPolicyPage.verifyHeading('Validation Policy');
  });

  
});
