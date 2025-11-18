import { expect } from '@playwright/test';

class ApplicationsPage {
  constructor(page) {
    this.page = page;

    // -----------------------
    // All locators (top)
    // -----------------------
    this.applications = page.locator("//div[@id='react']//div[3]//div[2]//a[1]//div[1]//li[1]");
    this.applicationsPageHeading = page.locator("//h2[contains(@class,'o-form-title-bar')]");
    this.addButton = page.locator('text=Add');
    this.typeDropdown = page.locator("//label[@class='Sort_By_Data']");
    this.statusDropdown = page.locator("//label[@class='Sort_By_Data']");
    this.genericAgentStatusLink = page.locator('text=Generic Agent Status');
    this.refreshButton = page.locator('text=Refresh');
    this.applicationsTablecolumns = page.locator("//div[@class='rt-thead -header']//div[@role='row']");
    this.searchBox = page.locator("(//input[@type='text'])[2]");
    this.table = page.locator('.rt-table'); // React Table container
    this.tableRows = page.locator('.rt-tr-group');
    this.applicationsDropdownMenu = page.locator("(//button[@type='button'])[6]");
    this.dropdownOptions = page.locator("//div[@class='ActionDropdown open']//div[@class='ActionLeft1']//div[@class='ActionDropdown-content']");
    this.moreOption = page.locator("//div[@class='ActionDropdown open']//div[@id='actions']");
    this.moreOptions = page.locator("//div[@class='ActionDropdown open']//div[@class='ActionDropdown-content1 last-childs']");

    // Audit Trail / Details / Update / Add Application locators used in many actions
    this.viewAuditTrailLocator = page.locator('div[role="menuitem"]', { hasText: 'View Audit Trail' });
    this.auditTrailHeading = page.locator("//h2[normalize-space()='Application Audit Trail']");
    this.viewAuditTrailColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");
    this.exportInput = page.locator("//input[@value='Export']");
    this.backInput = page.locator("//input[@value='Back']");

    this.credentials = page.locator("(//a[@id='epViewCred'])[1]");
    this.verifyCredentialsPage = page.locator("//div[@class='endPoints_btns']");
    this.credentialsBackButton = page.locator("//button[@id='backep']");

    this.detailsLocator = page.locator("(//div[@id='details_APP'])[3]");
    this.detailsModalHeader = page.locator("//h4[@id='ModalHeader']");
    this.detailsCloseButton = page.locator("//span[normalize-space()='×']");

    this.updateLocator = page.locator("(//div[@id='enable_APP'])[1]");
    this.updatePageHeading = page.locator("//div[contains(@class,'o-form-title-bar')]");
    this.cardSection = page.locator("//div[@class='card sor-header']");
    this.saveButton = page.locator("//button[normalize-space()='Save']");
    this.backButton = page.locator("//button[normalize-space()='Back']");
    
    this.addApplicationHeading = page.locator("//div[@class='o-form-title-bar']");
    this.uarRadioData = page.locator("//div[@class='uar-radio-data']//div[@class='MuiFormControl-root jss249']");
    this.flexConnectorRadio = page.locator("//input[@id='Flex Connector']");
    this.optionCard1 = page.locator("(//div[contains(@class,'card sor-header')])[1]");
    this.optionCard2 = page.locator("(//div[contains(@class,'card sor-header')])[2]");
    this.optionCard3 = page.locator("(//div[contains(@class,'card sor-header')])[3]");
    }

  // -----------------------
  // Actions / verifications
  // -----------------------

  async navigateToApplicationsPage() {
    await this.applications.waitFor({ state: 'visible', timeout: 10000 });
    await this.applications.click();
  }

  async verifyApplicationsPageHeading() {
    await expect(this.applicationsPageHeading).toBeVisible();
  }

  async verifyButtonOnPage(buttonText) {
    const locator = this.page.getByText(buttonText);
    await expect(locator).toBeVisible();
  }

  async verifyDropdownsOnPage() {
    await expect(this.typeDropdown).toBeVisible();
    await expect(this.statusDropdown).toBeVisible();
  }

  async verifyLinkOnPage(linkText) {
    const locator = this.page.getByText(linkText);
    await expect(locator).toBeVisible();
  }

  async verifyRefreshButton() {
    await expect(this.refreshButton).toBeVisible();
  }

  async verifyApplicationsTableColumns(columns = []) {
    await this.applicationsTablecolumns.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.applicationsTablecolumns).toBeVisible();
  }

  async performSearchOperation(searchText = 'csv') {
    await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchBox.fill(searchText);
    await this.page.keyboard.press('Enter');
    // small pause to let results populate
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async verifyTableDataAvailable() {
    await expect(this.table).toBeVisible();
    // simple check — confirm at least one row exists
    const rows = await this.tableRows.count();
    if (rows === 0) {
      throw new Error('No table rows found in Applications table');
    }
  }

  async clickApplicationsDropdownMenu() {
    //await this.applicationsDropdownMenu.waitFor({ state: 'visible', timeout: 10000 });
    await this.applicationsDropdownMenu.click();
  }

  async verifyApplicationsDropdownOptions(options = []) {
    await expect(this.dropdownOptions).toBeVisible({ timeout: 10000 });
  }

   async hoverOnMoreOption() {
    await this.moreOption.hover();
  }

  async verifyMoreOptions(options) {
    await expect(this.moreOptions).toBeVisible({ timeout: 10000 });
  }

  async clickViewAuditTrailOption() {
    await this.viewAuditTrailLocator.scrollIntoViewIfNeeded();
    await this.viewAuditTrailLocator.waitFor({ state: 'visible', timeout: 10000 });
    await this.viewAuditTrailLocator.click({ force: true });
    await expect(this.auditTrailHeading).toBeVisible();
    await expect(this.viewAuditTrailColumns).toBeVisible();
    await expect(this.exportInput).toBeVisible();
    await expect(this.backInput).toBeVisible();
  }

  async verifyButtons() {
    await expect(this.exportInput).toBeVisible();
    await expect(this.backInput).toBeVisible();
  }

  async clickBackButton() {
    await this.backInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.backInput.click();
  }

  async clickDetailsOption() {
    await this.detailsLocator.waitFor({ state: 'visible', timeout: 10000 });
    await this.detailsLocator.click();
  }

  async verifyApplicationDetailsPageHeading(expectedHeading) {
    await this.detailsModalHeader.waitFor({ state: 'visible', timeout: 10000 });
    if (expectedHeading) {
      await expect(this.page.locator(`xpath=//h4[@id='ModalHeader' and normalize-space() = "${expectedHeading}"]`)).toBeVisible({ timeout: 10000 });
    }
  }

  async clickCloseButtonInDetailsPage() {
    await this.detailsCloseButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.detailsCloseButton.click();
  }

  async clickCredentialsOption() {
   await this.credentials.click();
   await this.page.waitForLoadState('networkidle');
   await expect(this.verifyCredentialsPage).toBeVisible();
   await this.credentialsBackButton.click();
  }

  async clickUpdateOption() {
    await this.updateLocator.waitFor({ state: 'visible', timeout: 10000 });
    await this.updateLocator.click();
  }

  async verifyUpdateApplicationPageHeading(expectedHeading) {
    await expect(this.updatePageHeading).toBeVisible({ timeout: 10000 });
    if (expectedHeading) {
      await expect(this.page.locator(`xpath=//div[contains(@class,'o-form-title-bar') and normalize-space() = '${expectedHeading}']`)).toBeVisible({ timeout: 10000 });
    }
  }

  async verifySectionsInUpdateApplicationPage() {
    const page = this.page;
     await expect(page.getByText('Update ApplicationUpdate')).toBeVisible();
  await expect(page.getByText('Setup Application')).toBeVisible();
  
  await expect(page.getByText('Reviewer Configuration')).toBeVisible();
  
  await expect(page.getByText('Ticketing System Configuration')).toBeVisible();
  
  }

  async verifySaveAndBackButtonsInUpdateApplicationPage() {
    const page = this.page;
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
  }

  async clickBackButtonInUpdateApplication() {
   await this.page.getByRole('button', { name: 'Back' }).click();
    
  }

  async clickAddButton() {
    await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addButton.click();
  }

  async verifyAddApplicationPageHeading() {
    await expect(this.addApplicationHeading).toBeVisible();
  }

  async verifyRadioButtonsInAddApplicationPage(radioButtons = []) {
       await expect(this.page.locator("//div[@class='uar-radio-data']")).toBeVisible();
      
  }

  async verifyFileUploadPage(){
    const page = this.page;
      await expect(page.locator("(//div[@class='card sor-header'])[1]")).toBeVisible();
      await expect(page.locator("(//div[@class='card sor-header'])[2]")).toBeVisible();
      await expect(page.locator("(//div[@class='card sor-header'])[3]")).toBeVisible();
  }

  async verifyFlexConnectorPage(){
    const page = this.page;
    await page.locator("(//label[@class='MuiFormControlLabel-root'])[2]").click();
    await expect(page.locator("(//div[@class='card sor-header'])[1]")).toBeVisible(); 
    await page.locator("(//div)[217]").click();
    await expect(page.locator("(//div[@class='card sor-header'])[2]")).toBeVisible();
    await expect(page.locator("(//div[@class='card sor-header'])[3]")).toBeVisible();
    await expect(page.locator("(//div[@class='card sor-header'])[4]")).toBeVisible();
  }


  async verifyConnectorPage(){
    const page = this.page;
    await page.locator("(//label[@class='MuiFormControlLabel-root'])[3]").click();
    await expect(page.locator("(//div[@class='card sor-header'])[1]")).toBeVisible();
    await page.locator("(//div)[186]").click();
    await expect(page.locator("(//div[@class='card sor-header'])[2]")).toBeVisible();
    await expect(page.locator("(//div[@class='card sor-header'])[3]")).toBeVisible();
    await expect(page.locator("(//div[@class='card sor-header'])[4]")).toBeVisible();
  }

  async verifyButtons(){
    await expect(this.page.getByRole('button', { name: 'Save' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Back' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Back' }).click();
  }
}

export default ApplicationsPage;