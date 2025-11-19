import { expect } from '@playwright/test';

class IntelligencePage {
  constructor(page) {
    this.page = page;

    // ===== Locators (all at the top) =====
    this.locators = {
      clearButton: this.page.locator('text=Clear'),
      addAttributesIcon: this.page.locator("//i[contains(@class,'fa fa-plus')]"),
      usernameEmailTextBox: this.page.locator("//input[@placeholder='Search user by name or email address']"),
      applicationDropdown: this.page.locator("//div[contains(@class,'css-tlfecz-indicatorContainer')]"),
      entitlementTextBox: this.page.locator('text=Entitlement'),
      runNowButton: this.page.locator('text=Run Now'),
      exportButton: this.page.locator('text=Export'),
      identityAttributesSection: this.page.locator("//h6[normalize-space()='Identity attributes']"),
      pageText: this.page.locator("//p[contains(text(),'Application Mind map is a graphical representation')]"),
      entitlementPageText: this.page.locator("//p[contains(text(),'Entitlement Mind map is a graphical representation')]"),
      entitlementTextBoxInput: this.page.locator("//input[contains(@placeholder,'Enter Entitlement')]"),
      entitlementClearButton: this.page.locator("//button[normalize-space()='Clear']"),
      applicationReportsMenu: this.page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > div:nth-child(6) > div:nth-child(2) > a:nth-child(4) > div:nth-child(1) > li:nth-child(1)"),
      applicationReportsPageHeading: this.page.locator("//h2[normalize-space()='Application Reports']"),
      applicationReportsPageText: this.page.locator("//p[@class='mt-3']"),
      dropdownsInApplicationReportsPage: this.page.locator("//div[contains(@class,'mt-3')]//div[contains(@class,'css-tlfecz-indicatorContainer')]"),
      applicationReportsDropdownMenu: this.page.locator("(//button[@id='dropdownMenu'])[2]"),
      applicationReportsGearOptions: this.page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1)"),
      exportButtonInPage: this.page.locator("//button[normalize-space()='Export']"),
      accessAnalysisMenu: this.page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > div:nth-child(6) > div:nth-child(2) > a:nth-child(5) > div:nth-child(1) > li:nth-child(1)"),
      applyFilterButton: this.page.locator("//button[contains(@class,'my-req-status-btn')]"),
      leftNavigationMenus: this.page.locator("//div[contains(@class,'MuiDrawer-paperAnchorLeft')]//div[@title]"),
      pageHeading: this.page.locator("//div[contains(@class,'o-form-title-bar delegateinfoData')]"),
      closePopup: this.page.locator("//body/div[4]/div[3]/div[1]/div[1]/div[1]/button[1]/span[1]//*[name()='svg']"),
      identityAttributesDropdown: this.page.locator("/html[1]/body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]"),
    };
  }

  // ===== Navigation Methods =====
  async clickLeftNavigationMenu(menuItem) {
    await this.page.locator(`text=${menuItem}`).click();
  }

  async clickIdentityMindmapMenu() {
    await this.page.locator("//div[@id='react']//div[6]//div[2]//a[1]//div[1]//li[1]").click();
  }

  async clickApplicationMindmapMenu() {
    await this.page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > div:nth-child(6) > div:nth-child(2) > a:nth-child(2) > div:nth-child(1) > li:nth-child(1)").click();
  }

  async clickEntitlementMindmapMenu() {
    // Try to find by visible text first (adjust 'Entitlement Mindmap' to match your UI)
    let locator = this.page.getByText('Entitlement Mindmap', { exact: false });
    let count = await locator.count();
    console.log(`Entitlement Mindmap elements found by text: ${count}`);
    if (count === 0) {
      // Fallback to original locator if text not found
      locator = this.page.locator("//div[contains(@class,'MuiDrawer-paperAnchorLeft MuiDrawer-paperAnchorDockedLeft MuiPaper-elevation0')]//li[contains(@class,'MuiListItem-root jss198 undefined MuiListItem-gutters')]");
      count = await locator.count();
      console.log(`Entitlement Mindmap elements found by XPath: ${count}`);
    }
    try {
      await locator.first().waitFor({ state: 'visible', timeout: 10000 });
      await locator.first().scrollIntoViewIfNeeded();
      await locator.first().click();
    } catch (err) {
      throw new Error(`clickEntitlementMindmapMenu failed: ${err.message}`);
    }
  }

  async clickApplicationReportsMenu() {
    await this.locators.applicationReportsMenu.click();
  }

  async clickAccessAnalysisMenu() {
    await this.locators.accessAnalysisMenu.click();
  }

  // ===== Verification Methods =====
  async verifyPageHeading(expected) {
    await this.locators.pageHeading.waitFor({ state: 'visible' });
  }

  async verifyPageText(pageName, expectedText) {
    await this.locators.pageText.waitFor();
  }

  async verifyTextBox(pageName, textBoxName) {
    await this.locators.usernameEmailTextBox.waitFor();
  }

  async fillTextBox() {
    await this.locators.usernameEmailTextBox.fill('admin');
  }

  async selectFirstOptionFromDropdown(dropdownName) { 
    const option = this.page.getByText('Admin Admin (admin@securends.com)');
    await option.first().click();
  }

  async verifyOptionsInPage(pageName) {
    await this.page.locator("//body/div[@id='react']/div[@class='securends']/span/div[@class='wrapperContainer']/div[@class='jss11']/div[@class='jss12 jss18']/div[@class='main-content']/div[@class='jss14']/div[@id='epTable']/div[@class='row']/div[@class='entitle-search']/div[@class='treeSpots']/div/div[1]").waitFor({ state: 'visible', timeout: 60000 });
  }

  async verifyClearButton(pageName) {
    await expect(this.locators.clearButton).toBeVisible();
  }

  async verifyDropdownsInPage(pageName, dropdowns) {
    for (const dropdown of dropdowns) {
      await this.page.locator("//div[contains(@class,'css-tlfecz-indicatorContainer')]").click();
    }
  }

  async verifyApplicationMindmapDropdown() {
    await this.locators.applicationDropdown.waitFor();
  }

  async clickApplicationMindmapDropdown() {
    await this.locators.applicationDropdown.click();
  }

  async clickAllDropdowns() {
    await this.page.waitForLoadState('load');
    await this.page.locator("(//b[contains(@class,'caret')])[1]").click();
    await this.page.locator("(//b[contains(@class,'caret')])[2]").click();
    await this.page.locator("(//b[contains(@class,'caret')])[3]").click();
    await this.page.locator("(//b[contains(@class,'caret')])[4]").click();
    // Wait for 30 seconds to allow table and gear option to appear
    await this.page.waitForTimeout(30000);
  }

  async verifyCheckboxInPage(pageName, checkboxName) {
    await this.page.locator(`text=${checkboxName}`).waitFor();
  }

  async verifyButtonInPage(pageName, buttonName) {
    await this.page.locator(`text=${buttonName}`).waitFor();
  }

  async verifyAddAttributesIcon() {
    await this.locators.addAttributesIcon.waitFor();
  }

  async verifyExportButtonInPage() {
    // Wait for the Application Reports page heading to ensure the page is loaded
    await this.locators.applicationReportsPageHeading.waitFor({ state: 'visible', timeout: 60000 });

    // ...existing code...

    // Now wait for the export button
    await this.locators.exportButtonInPage.waitFor({ state: 'visible', timeout: 20000 });
  }

  async verifyApplicationReportsPageHeading() {
    await this.locators.applicationReportsPageHeading.waitFor();
  }

  async verifyApplicationReportsPageText() {
    await this.locators.applicationReportsPageText.waitFor();
  }

  async verifyApplicationReportsGearOptions() {
    // Wait for the Application Reports page heading to be visible (ensures page is loaded)
    await this.locators.applicationReportsPageHeading.waitFor({ state: 'visible', timeout: 60000 });

    // Try clicking the dropdown menu to reveal more options/buttons
    try {
      await this.locators.applicationReportsDropdownMenu.click({ timeout: 5000 });
    } catch (e) {
      // Ignore if not found or not clickable
    }

    // ...existing code...

    // Try main locator first
    let gearLocator = this.locators.applicationReportsGearOptions;
    let found = false;
    try {
      await gearLocator.waitFor({ state: 'visible', timeout: 10000 });
      found = true;
    } catch (e) {
      // Fallback: try to find a visible button with a gear icon or aria-label
      gearLocator = this.page.locator('button[aria-label*="gear" i], button[aria-label*="options" i], button:has(svg[data-testid*="Gear" i])');
      try {
        await gearLocator.first().waitFor({ state: 'visible', timeout: 10000 });
        found = true;
      } catch (e2) {
        // Try by visible text if any
        gearLocator = this.page.getByText('Options', { exact: false });
        try {
          await gearLocator.first().waitFor({ state: 'visible', timeout: 10000 });
          found = true;
        } catch (e3) {
          throw new Error('verifyApplicationReportsGearOptions: Could not find a visible gear/options button.');
        }
      }
    }
    await gearLocator.click();
  }

  async closePopup(){
    await this.locators.closePopup.click();
  }
  async verifyAccessAnalysisSection() {
    await expect(this.locators.identityAttributesSection).toBeVisible();
  }
  
  async verifyApplyFilterButton() {
    await this.locators.applyFilterButton.waitFor();
  }

  async verifyEntitlementTextBox() {
    await this.locators.entitlementTextBoxInput.waitFor();
  }

  async verifyEntitlementClearButton() {
    await this.locators.entitlementClearButton.waitFor();
  }

  async verifyEntitlementPageText() {
    await this.locators.entitlementPageText.waitFor();
  }
}

export default IntelligencePage;
