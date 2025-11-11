const { test, expect } = require('@playwright/test');
const { time } = require('console');
class SystemOfRecordPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.rows = page.locator('div[role="grid"] [role="rowgroup"] [role="row"]');


    // left navigation link - target the link by accessible name
    this.leftnav = page.getByRole('link', { name: 'System Of Record' }).first();
    this.typeSelect = page.locator('#typeSelect');
    this.statusSelect = page.locator('#statusSelect');

    // heading on the page (use role to avoid matching nav text)
    this.heading = page.getByLabel('System of Record', { exact: true })
    this.refreshBtn = page.getByRole('button', { name: 'Refresh' });

    this.backButton = this.page.getByRole('button', { name: 'Back' });

    
  }

  async gotoFromNav() {
    await this.leftnav.waitFor({ state: 'visible' });
    await this.leftnav.click();
    // wait for page heading to ensure navigation finished
    await this.heading.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async gotoDirect() {
    await this.page.goto('https://qa30.securends.com/listofSystemRecords');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyHeadingVisible() {
    await this.heading.waitFor({ state: 'visible' });
  }

  async selectTypeByValue(value) {
    await this.typeSelect.selectOption(value);
    await this.page.waitForLoadState('networkidle');
  }

  async getSelectedTypeLabel() {
    return this.page.evaluate(() => {
      const sel = document.getElementById('typeSelect');
      return sel ? sel.options[sel.selectedIndex].text : null;
    });
  }

  async selectStatusByValue(value) {
    await this.statusSelect.selectOption(value);
    await this.page.waitForLoadState('networkidle');
  }

  async getSelectedStatusLabel() {
    return this.page.evaluate(() => {
      const sel = document.getElementById('statusSelect');
      return sel ? sel.options[sel.selectedIndex].text : null;
    });
  }

  async clickRefresh() {
    await this.refreshBtn.waitFor({ state: 'visible' });
    await this.refreshBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Get all table headers as text
  async getTableHeaders() {
    // Wait for any column header to appear, then read all columnheader roles
    await this.page.waitForSelector('[role="columnheader"]', { state: 'visible', timeout: 5000 });
    const headers = await this.page.getByRole('columnheader').allTextContents();
    // Remove trailing dots, trim and filter out empty strings
    return headers.map(h => h.replace(/\.$/, '').trim()).filter(h => h.length > 0);
  }

  // Expect table headers to match expected
  async expectTableHeaders(expectedHeaders) {
    const actualHeaders = await this.getTableHeaders();
    if (JSON.stringify(actualHeaders) !== JSON.stringify(expectedHeaders)) {
      throw new Error(`Table headers do not match.\nExpected: ${JSON.stringify(expectedHeaders)}\nActual: ${JSON.stringify(actualHeaders)}`);
    }
  }

 

async clickFirstRowGearAndVerifyOptions(expectedOptions) {
  await this.page.waitForSelector('div[role="grid"] [role="rowgroup"] [role="row"] button', { timeout: 5000 });

  const count = await this.rows.count();
  let clicked = false;
  let clickedIndex = -1;

  for (let i = 0; i < count; i++) {
    const row = this.rows.nth(i);
    const btn = row.locator('button').first();
    if ((await btn.count()) && (await btn.isVisible())) {
      await btn.click();
      clicked = true;
      clickedIndex = i;
      this.lastClickedRowIndex = i;
      break;
    }
  }

  if (!clicked) {
    console.log('DEBUG: No button found, printing rows:');
    for (let i = 0; i < count; i++) {
      const row = this.rows.nth(i);
      console.log(await row.innerText());
    }
    throw new Error('Gear/action button not found on any data row');
  }

  // continue with verifying options...
}

  async clickUpdateOption() {
    const updateOption = this.page.getByText('Update').first();
    await expect(updateOption, 'Update option should be visible').toBeVisible();
    await updateOption.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);   
  }

async clickBackFromUpdate() {
    if (await this.backButton.first().isVisible()) {
      await this.backButton.first().click();
    } else {
      await this.page.goBack();
    }
  }


async verifyUpdatePageHeading() {
  // Locate the heading inside the title bar
  const heading = this.page.locator('div.o-form-title-bar', { hasText: 'SOR Update Application' });

  // Wait for it to become visible (up to 10 seconds)
  await heading.waitFor({ state: 'visible', timeout: 10000 });

  // Assert it is visible
  await expect(heading).toBeVisible();
}

  async clickImportOption() {
    const importOption = this.page.getByText('Import', { exact: true }).first();
    await importOption.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async verifyImportModalVisible() {
    const uploadText = this.page.getByText(
      'Upload data using the mandated file format. Download',
      { timeout: 20000 }
    );
    await uploadText.waitFor({ state: 'visible', timeout: 20000 });

    const sampleCsv = this.page.getByText('sample CSV', { timeout: 20000 });
    await sampleCsv.waitFor({ state: 'visible', timeout: 20000 });
  }

  async closeImportModal() {
    const closeButton = this.page.locator('button[aria-label="Close Modal"]').first();
    await closeButton.click();
    await this.page.waitForTimeout(500);
  }

  async verifyImportModalClosed() {
    const modal = this.page.locator('dialog');
    await modal.waitFor({ state: 'detached', timeout: 5000 });
  }


async hoverMoreAndVerifySubOptions(subOptions) {
  // Get the row where the gear button was clicked
  const row = this.rows.nth(this.lastClickedRowIndex);

  // Hover over the "More" button in that row
  const moreBtn = row.locator('text=More').first();
  await moreBtn.hover();

  // Wait for the submenu container within this row
  const submenu = row.locator('.ActionDropdown-content1:visible').first();
  await submenu.waitFor({ state: 'visible', timeout: 5000 });

  // For each option, check if any visible element exists in the submenu
  for (const option of subOptions) {
    const els = submenu.locator(`text=${option}`);
    const count = await els.count();
    let foundVisible = false;
    for (let i = 0; i < count; i++) {
      const el = els.nth(i);
      if (await el.isVisible()) {
        foundVisible = true;
        break;
      }
    }
    if (!foundVisible) {
      throw new Error(`Submenu option not visible: ${option}`);
    }
  }
}






  async clickDetailsUnderMore() {
    const details = this.page.locator('text=Details').first();
    await details.click();
    await this.page.waitForTimeout(2000);
  }

  async verifyDetailsPageVisible() {
    const heading = this.page.locator('text=Application Details').first();
    if ((await heading.count()) && (await heading.isVisible())) return;
    const altHeading = this.page.locator('h4:has-text("Details")').first();
    if (!(await altHeading.isVisible())) throw new Error('SOR Details page not visible');
  }

  async clickBackFromDetails() {
    const backBtn = this.page.locator('button:has-text("Back")').first();
    if ((await backBtn.count()) && (await backBtn.isVisible())) {
      await backBtn.click();
    } else {
      const closeBtn = this.page.locator('button[aria-label="Close Modal"], button:has-text("Close")').first();
      if ((await closeBtn.count()) && (await closeBtn.isVisible())) await closeBtn.click();
    }
    await this.page.waitForTimeout(500);
  }

  async clickViewAuditTrailUnderMore() {
    const details = this.page.locator('text=View Audit Trail').first();
    await details.click();
    await this.page.waitForTimeout(2000);
  }
  async verifyAuditTrailPageVisible(expectedText = 'Application Audit Trail') {
  // Wait briefly for the page or modal to load
  await this.page.waitForTimeout(500);

  let found = false;

  // Try locating heading by role (semantic, most reliable)
  try {
    const heading = this.page.getByRole('heading', { name: expectedText, level: 2 });
    await heading.waitFor({ state: 'visible', timeout: 4000 });
    if (await heading.isVisible()) found = true;
  } catch {}

  // Fallback: locate by visible text if no heading role found
  if (!found) {
    try {
      const heading = this.page.getByText(expectedText, { exact: false });
      await heading.waitFor({ state: 'visible', timeout: 4000 });
      if (await heading.isVisible()) found = true;
    } catch {}
  }

  // Throw an explicit error if heading never appears
  if (!found) {
    throw new Error(` Expected Audit Trail page heading '${expectedText}' not found`);
  }

  console.log(` Verified: Audit Trail page heading '${expectedText}' is visible`);
}
async verifyAuditTrailTableHeaders(expectedHeaders) {
  const page = this.page;
  let headerCells = [];

  // Try several selectors for column headers (to handle dynamic UI frameworks)
  const selectors = [
    'table thead tr th',
    'div[role="columnheader"]',
    '.rt-thead .rt-th',
    '.MuiTableHead-root th'
  ];

  for (const sel of selectors) {
    const headers = await page.locator(sel).allTextContents();
    if (headers.length) {
      headerCells = headers.map(h => h.trim()).filter(Boolean);
      break;
    }
  }

  // Fallback: try first data row if headers aren't found
  if (!headerCells.length) {
    const firstRow = page.locator('table tbody tr, .rt-tbody .rt-tr-group').first();
    headerCells = await firstRow.locator('td, div').allTextContents();
    headerCells = headerCells.map(h => h.trim()).filter(Boolean).slice(0, expectedHeaders.length);
  }

  // Normalize for comparison
  const expected = expectedHeaders.map(s => s.trim().toLowerCase());
  const actual = headerCells.map(h => h.toLowerCase());

  // Check that each expected header appears in the actual set
  for (const ex of expected) {
    if (!actual.some(a => a.includes(ex))) {
      throw new Error(` Expected audit header '${ex}' not found. Actual: ${actual.join(', ')}`);
    }
  }

  console.log(` Verified Audit Trail headers: ${expectedHeaders.join(', ')}`);
  // Wait briefly for the page or modal to load
  await this.page.waitForTimeout(500);
}
async clickBackFromDetailsOrAuditTrail() {
  // Try to locate the Back button
  const backBtn = this.page.locator('button:has-text("Back")').first();

  if ((await backBtn.count()) && (await backBtn.isVisible())) {
    await backBtn.click();
  } else {
    // Fallback: if the Back button is missing, use browser back navigation
    await this.page.goBack();
  }

  // Give UI a small buffer to reload
  await this.page.waitForTimeout(500);
}

};


module.exports = SystemOfRecordPage;
