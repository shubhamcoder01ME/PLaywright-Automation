import { test, expect } from '@playwright/test';
import DataTransformationPage from '../../pages/DataTransformationPage.js';

test.describe('Data Transformation Page Tests', () => {
  let pageObj;

  test('Data Transformation Page UI Validation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    pageObj = new DataTransformationPage(page);

    await pageObj.navigate();
    await pageObj.verifyHeading('Data Transformation');
  
    await pageObj.verifyButton('Add');
  
    const expectedHeaders = [
      'Name', 'Description', 'Created Date', 'Modified Date', 'Actions'
    ];
    await pageObj.verifyTableHeaders(expectedHeaders);
  
    await pageObj.performSearch('admin@securends.com');
    await pageObj.verifyTableDataAvailable();
  
    await pageObj.openDropdownMenu();
    const expectedOptions = ['Update', 'Upload', 'Download', 'Delete', 'View'];
    await pageObj.verifyDropdownOptions(expectedOptions);
  
    await pageObj.selectDropdownOption('Update');
    await pageObj.verifyTextVisible('Update Data Transformation');
  });
});
