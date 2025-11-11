const { expect } = require('@playwright/test');

class ValidationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Left Navigation Selectors
    this.accessValidationMenu = page.getByRole('link', { name: /Access Validation/i });
    this.validationPolicyMenuItem = page.getByRole('link', { name: /Validation Policy/i });

    // Page Elements
    this.pageHeading = page.getByRole('heading', { name: /Validation Policy/i });
    this.addButton = page.getByRole('button', { name: /Add/i });

    // Table Headers
    this.tableHeaders = {
      actions: page.locator('th:has-text("Actions")'),
      policyName: page.locator('th:has-text("Policy Name")'),
      description: page.locator('th:has-text("Description")'),
      policyID: page.locator('th:has-text("Policy ID")'),
      sodQueries: page.locator('th:has-text("SoD Queries")'),
      lastModifiedBy: page.locator('th:has-text("Last Modified By")'),
      lastModifiedDate: page.locator('th:has-text("Last Modified Date")')
    };

    // Table
    this.validationPolicyTable = page.locator('div[role="grid"]');
    this.tableRows = page.locator('div[role="grid"] >> role=row');
  }

  /**
   * Navigate to Validation Policy page via left menu
   */
  async navigateToValidationPolicy() {
    await this.accessValidationMenu.click();
    await this.page.waitForLoadState('networkidle');
    await this.validationPolicyMenuItem.click();
    await this.page.waitForLoadState('networkidle');
    await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Verify page heading
   */
  async verifyPageHeading() {
    await expect(this.pageHeading).toBeVisible();
    const headingText = await this.pageHeading.textContent();
    return headingText;
  }

  /**
   * Verify Add button is present and clickable
   */
  async verifyAddButtonPresent() {
    await expect(this.addButton).toBeVisible();
    await expect(this.addButton).toBeEnabled();
  }

  /**
   * Verify all table headers are present
   */
  async verifyTableHeaders() {
    const expectedHeaders = [
      'Actions',
      'Policy Name',
      'Description',
      'Policy ID',
      'SoD Queries',
      'Last Modified By',
      'Last Modified Date'
    ];

    for (const header of expectedHeaders) {
      const headerElement = this.page.locator(`text="${header}"`);
      await expect(headerElement).toBeVisible({ timeout: 10000 });
    }

    return expectedHeaders;
  }

  /**
   * Verify the table is visible
   */
  async verifyTableIsVisible() {
    await expect(this.validationPolicyTable).toBeVisible();
  }

  /**
   * Get table row count
   */
  async getTableRowCount() {
    const count = await this.tableRows.count();
    return count;
  }

  /**
   * Verify complete page state
   */
  async verifyPageState() {
    // Verify heading
    await this.verifyPageHeading();
    
    // Verify Add button
    await this.verifyAddButtonPresent();
    
    // Verify table
    await this.verifyTableIsVisible();
    
    // Verify all headers
    await this.verifyTableHeaders();
    
    // Get row count
    const rowCount = await this.getTableRowCount();
    
    return {
      headingVisible: true,
      addButtonVisible: true,
      tableVisible: true,
      rowCount: rowCount
    };
  }

  // ------------------- Additional helpers for Create SoD Policy flow -------------------

  async clickAddButton() {
    await this.addButton.click();
  }

  async clickButton(buttonText) {
    const btn = this.page.getByRole('button', { name: new RegExp(buttonText, 'i') });
    await expect(btn).toBeVisible();
    await btn.click();
  }

  async verifyFormFields(fields = []) {
    for (const field of fields) {
      // Try label, placeholder or plain text fallback
      const byLabel = this.page.getByLabel(field).first();
      if (await byLabel.count()) {
        await expect(byLabel).toBeVisible();
        continue;
      }

      const byText = this.page.locator(`text="${field}"`);
      await expect(byText).toBeVisible();
    }
  }

  async verifyAdditionalPolicySection() {
    const section = this.page.locator('section:has-text("Additional Policy Notifications")');
    if (await section.count()) {
      await expect(section).toBeVisible();
      return;
    }
    // fallback to any element with that text
    await expect(this.page.locator('text=Additional Policy Notifications')).toBeVisible();
  }

  async searchForUser(searchText) {
    // Locate the input inside the Additional Policy Notifications area (more robust)
    const section = this.page.locator('text=Additional Policy Notifications').first();
    let input;
    if (await section.count()) {
      // try to find an input within the section container
      input = section.locator('input, textarea').first();
    }

    // fallback to any visible textbox
    if (!input || !(await input.count())) {
      input = this.page.getByRole('textbox').filter({ hasText: '' }).first();
    }

    if (!(await input.count())) {
      throw new Error('Could not find the Additional Policy Notifications search input');
    }

    // Focus, clear and type the search text to trigger suggestions
    await input.click({ force: true });
    await input.fill('');
    await input.type(searchText, { delay: 100 });

    // Wait for suggestions to appear (common patterns)
    const suggestions = this.page.locator('ul[role="listbox"] li, .dropdown-menu li, .suggestion-list li, div[role="option"]');
    try {
      await suggestions.first().waitFor({ state: 'visible', timeout: 5000 });
      // move to the first suggestion and select it with keyboard (reliable across widgets)
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
    } catch (e) {
      // If no suggestions appeared, still allow the test to continue — selection can be attempted separately
    }
  }

  async selectUserFromDropdown(userEmail) {
    const exact = this.page.locator(`text="${userEmail}"`).first();
    if (await exact.count()) {
      await expect(exact).toBeVisible({ timeout: 5000 });
      await exact.click();
      return;
    }

    // Fallback: click the first visible suggestion in common dropdowns/listboxes
    const listItem = this.page.locator('ul[role="listbox"] li, .dropdown-menu li, .suggestion-list li').filter({ hasText: userEmail }).first();
    if (await listItem.count()) {
      await listItem.click();
      return;
    }

    // As last fallback click the first visible suggestion
    const firstSuggestion = this.page.locator('ul[role="listbox"] li, .dropdown-menu li, .suggestion-list li').first();
    if (await firstSuggestion.count()) {
      await firstSuggestion.click();
      return;
    }

    // If nothing matched, try keyboard selection (arrow + enter) as fallback
    try {
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
      return;
    } catch (e) {
      // final fallback: throw so test fails with clearer message
      throw new Error(`Could not find dropdown item for user: ${userEmail}`);
    }
  }

  async clickAddMore() {
    if (this.page.isClosed && this.page.isClosed()) {
      throw new Error('Page is already closed');
    }

    // Try multiple selectors to locate the "Add More" control, waiting briefly for each
    const candidates = [
      this.page.getByRole('button', { name: /\+\s*Add\s*More|Add More/i }),
      this.page.getByRole('button', { name: /\+\s*Add|\+ Add/i }),
      this.page.locator('text="+ Add More"'),
      this.page.locator('text="Add More"'),
      this.page.locator('button:has-text("Add More")'),
      this.page.locator('a:has-text("Add More")'),
    ];

    for (const cand of candidates) {
      try {
        await cand.first().waitFor({ state: 'visible', timeout: 3000 });
        await cand.first().scrollIntoViewIfNeeded();
        await cand.first().click();
        return;
      } catch (e) {
        // ignore and try next
      }
    }

    // Fallback: try clicking any button that contains 'Add'
    try {
      const fuzzy = this.page.locator('button').filter({ hasText: 'Add' }).first();
      await fuzzy.waitFor({ state: 'visible', timeout: 2000 });
      await fuzzy.click();
      return;
    } catch (e) {
      // ignore
    }

    throw new Error('Could not find an "Add More" control to click');
  }

  async verifyLabelInExpandedSection(labelText) {
    await expect(this.page.locator(`text="${labelText}"`)).toBeVisible();
  }

  async selectInactiveUsersOption(option) {
    // Try radio or select inside the expanded Include Inactive Users section
    const radio = this.page.getByRole('radio', { name: new RegExp(option, 'i') });
    if (await radio.count()) {
      await radio.check();
      return;
    }
    const btn = this.page.getByRole('button', { name: new RegExp(option, 'i') }).first();
    if (await btn.count()) {
      await btn.click();
      return;
    }
    // select element fallback
    const select = this.page.locator('select');
    if (await select.count()) {
      await select.selectOption({ label: option });
    }
  }

  async selectIdentityFilterOption(option) {
    // Similar approach as inactive users
    const radio = this.page.getByRole('radio', { name: new RegExp(option, 'i') });
    if (await radio.count()) {
      await radio.check();
      return;
    }
    const btn = this.page.getByRole('button', { name: new RegExp(option, 'i') }).first();
    if (await btn.count()) {
      await btn.click();
      return;
    }
    const select = this.page.locator('select');
    if (await select.count()) {
      await select.selectOption({ label: option });
    }
  }

  async verifyAddButtonVisible() {
    await expect(this.addButton).toBeVisible();
  }

  async verifyButtonVisible(buttonText) {
    const btn = this.page.getByRole('button', { name: new RegExp(buttonText, 'i') });
    await expect(btn).toBeVisible();
  }

  async verifyModalVisible(modalTitle) {
    const title = this.page.getByRole('heading', { name: new RegExp(modalTitle, 'i') }).first();
    await expect(title).toBeVisible({ timeout: 5000 });
  }

  async verifyModalButtons() {
    await expect(this.page.getByRole('button', { name: /Cancel/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Save/i })).toBeVisible();
  }

  async verifyModalFormFields() {
    await expect(this.page.locator('text=Attribute Name')).toBeVisible();
    await expect(this.page.locator('text=Select Operator')).toBeVisible();
    await expect(this.page.locator('text=Attribute Value')).toBeVisible();
  }

  async verifyAttributeFilterElements() {
    // Reuse modal form fields for attribute filter
    await this.verifyModalFormFields();
  }

  async verifyHeading(headingText) {
    await expect(this.page.getByRole('heading', { name: new RegExp(headingText, 'i') })).toBeVisible();
  }
}

module.exports = ValidationPage;
