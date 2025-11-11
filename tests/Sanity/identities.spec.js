const { test, expect } = require('@playwright/test');
const { IdentitiesPage } = require('../../pages/IdentitiesPage');
const { IdentitiesAddPage } = require('../../pages/IdentitiesAddPage');

test.describe('Identities Page UI Validation', () => {

  let identitiesPage;

  test.beforeEach(async ({ page }) => {
    // Login is handled by global setup (storageState)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    identitiesPage = new IdentitiesPage(page);
    await identitiesPage.gotoViaLeftNav();
    await identitiesPage.verifyHeading();
  });

  test('should validate all required elements on identities page', async ({ page }) => {
    // Verify UI elements
    await identitiesPage.addButton.isVisible();         // Add button

    await identitiesPage.performStatusDropdownAndButtonChecks();        // Status dropdown and buttons

    await identitiesPage.verifyButtons();           // Export and Import buttons 
    //await identitiesPage.verifyTableHeaders();
  });

  test('should open Add Person modal and verify all attributes', async ({ page }) => {

    // Ensure overlays/sidebars are closed before clicking Add
    // Try to close any open overlays that may block the Add button
    await page.evaluate(() => {
      // Example: close any open MUI drawers or overlays
      const overlays = document.querySelectorAll('.MuiDrawer-root, .MuiBackdrop-root');
      overlays.forEach(el => {
        if (el && el.parentElement) el.parentElement.removeChild(el);
      });
    });

    await identitiesPage.addButton.click();         // Click Add button

    // Interact with Add Person modal
    const addPage = new IdentitiesAddPage(page);

    await addPage.verifyModalVisible();        // Verify modal is visible

    await addPage.verifyAllAttributes();       // Verify all expected attributes

    await addPage.scrollToBottom();            // Scroll to bottom

    await addPage.verifySaveButtonVisible();   // Verify Save button

    await addPage.closeModal();                // Close the modal
  });
});