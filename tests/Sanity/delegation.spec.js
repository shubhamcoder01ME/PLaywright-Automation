import { test, expect } from '@playwright/test';
import DelegationPage from '../../pages/DelegationPage.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});
test('Delegation page UI and search validation', async ({page}) => {  
    const delegationPage = new DelegationPage(page);


    await delegationPage.leftnav();
    await delegationPage.validatePage();
    await delegationPage. verifyTableHeaders();

    await delegationPage.clickADD();
    await delegationPage.verifyModalVisible();
    await delegationPage.closeModal();

        const expectedOptions = [
      'People Delegation',
      'Credential Delegation'
    ];
    await delegationPage.validateDelegationTypeOptions(expectedOptions);

    await delegationPage.selectDelegationType('Credential Delegation');

    await delegationPage.verifyCredentialDelegationPage();
    await page.waitForTimeout(1000); // Wait for any dynamic content to load
    await delegationPage.selectDelegationType('People Delegation');

    await delegationPage.validatePage();

    // Get first row data and perform search only if data is present
    let firstRow;
    try {
      firstRow = await delegationPage.getFirstRowData();
    } catch (e) {
      console.warn('No data found in the table, skipping search validation.');
      return;
    }
    // Only search if all fields are non-empty
    if (firstRow.firstName && firstRow.lastName && firstRow.reviewer && firstRow.delegatee) {
      await delegationPage.search(
        firstRow.firstName,
        firstRow.lastName,
        firstRow.reviewer,
        firstRow.delegatee
      );
      // Validate search result matches
      const searchResult = await delegationPage.getFirstRowData();
      expect(searchResult.firstName).toContain(firstRow.firstName);
      expect(searchResult.lastName).toContain(firstRow.lastName);
      expect(searchResult.reviewer).toContain(firstRow.reviewer);
      expect(searchResult.delegatee).toContain(firstRow.delegatee);
    } else {
      console.warn('First row data is incomplete, skipping search validation.');
    }
});

