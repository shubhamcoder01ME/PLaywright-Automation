import { test, expect } from '@playwright/test';
import { ValidationPage } from '../../pages/AcessValidation/Validationpage.js';
import ValidationAddPage from '../../pages/AcessValidation/ValidationAddPage.js';
import ReportPage from '../../pages/AcessValidation/ReportPage.js';


test('Complete Validation Policy Test - All Validations', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const validationPage = new ValidationPage(page);
  await validationPage.navigateToValidationPolicy();
  await validationPage.verifyPageHeading();
  await validationPage.verifyAddButtonPresent();
  await validationPage.verifyTableIsVisible();
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
  for (const header of expectedHeaders) {
    const headerElement = page.locator(`text="${header}"`);
    await expect(headerElement).toBeVisible({ timeout: 10000 });
  }

  const addPage = new ValidationAddPage(page);
  await addPage.clickAddButton();
  await addPage.verifyFormFields();
  await addPage.checkBox();
  await addPage.clickAdvance();
  await page.waitForTimeout(1000);
  await addPage.verifyAdvancedModal();
  await addPage.closeModal();
  await addPage.verifyFormFields();
  await addPage.scrollToSaveButton();
  await addPage.scrollUpAndClickBack();

  await validationPage.verifyPageHeading();

  // // Verify the gear box options
  const expectedOptions = ['Update','Details', 'Delete'];
  await validationPage.verifyGearMenuOptions(expectedOptions);
  await page.waitForTimeout(2000);
  await validationPage.clickUpdate();
  await validationPage.openFirstRowGearMenu();
  await page.waitForTimeout(2000);



});




