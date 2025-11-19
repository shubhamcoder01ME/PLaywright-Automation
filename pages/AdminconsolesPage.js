
import { expect } from '@playwright/test';

class AdminconsolesPage {
  constructor(page) {
    this.page = page;

    this.expectedButtons = [
      "Configure",
      "View",
      "Set Up",
      "Configurations",
      "Instructions/Notes",
      "Audit Trail",
    ];

    this.configurationMenu = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/ul[1]/div[8]/div[2]/a[1]/div[1]/li[1]");
    this.configurationPageHeading = page.locator("//h2[contains(@class,'o-form-title-bar')]");
    this.rolesConfigureButton = page.locator("(//button[normalize-space()='Configure'])[1]");
    this.rolesConfigurePopupHeading = page.locator("//h4[@id='ModalHeader']");
    this.popupText = page.locator("(//div[@class='col-md-12'])[1]");
    this.popupSaveButton = page.locator("//input[contains(@value,'Save')]");
    this.popupClearButton = page.locator("//input[@value='Clear']");
    this.CloseModal = page.locator("//span[normalize-space()='×']");
    this.identityAttributeCloseModal = page.locator("(//span[normalize-space()='×'])[1]");
    this.hiddenCloseModal = page.locator("//div[contains(@class,'fade modal modal in')]//span[contains(@aria-hidden,'true')][normalize-space()='×']");

    this.rolesViewButton = page.locator("(//button[@id='tempADDdata'])[2]");
    this.rolesViewPopupHeading = page.locator("//h4[@id='ModalHeader']");
    this.rolesviewButton = page.locator("//button[normalize-space()='Export']");
    this.rolesViewTableColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");

    this.ticketingSystemSetupButton = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/button[1]");
    this.ticketingSystemSetupPageHeading = page.locator("//h4[@id='ModalHeader']");
    this.ticketingSystemSetupDropdown = page.locator("//select[@class='form-control']");
    this.ticketingSystemSetupCheckbox = page.locator("(//div[contains(@class,'col-md-12 custom-control-defaultticketing custom-checkbox')])[1]");
    this.ticketingSystemSetupSaveButton = page.locator("//button[normalize-space()='Save']");

    this.ticketingSystemConfigurationsButton = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/button[2]");
    this.ticketingSystemConfigurationsPageHeading = page.locator("//span[normalize-space()='Ticketing System for Access Review Configuration']");
    this.ticketingSystemConfigurationsTableColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");
    this.ConfigurationActionGearDropdown = page.locator("(//button[@id='dropdownMenu'])[1]");
    this.ConfigurationActionGearDropdownOption = page.locator("//div[@class='dropdown badge configActionDropdown open']//a[contains(text(),'Update')]");
    this.updatePopupHeading = page.locator("//div[contains(@class,'fade modal modal in')]//h4[@id='ModalHeader']");

    this.emailSettingsSetupButton = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[2]/button[1]");
    this.emailSettingsPopupHeading = page.locator("//h4[@id='ModalHeader']");
    this.emailConfigurationDropdown = page.locator("//select[@class='form-control']");
    this.emailConfigurationCheckbox = page.locator("(//div[contains(@class,'col-md-12 custom-control-defaultticketing custom-checkbox')])[1]");
    this.emailConfigurationTestConnectionButton = page.locator("//input[@value='Test Connection']");
    this.emailConfigurationSaveButton = page.locator("//input[@value='Save']");

    this.emailSettingsConfigurationsButton = page.locator("(//button[contains(@type,'select')][normalize-space()='Configurations'])[2]");
    this.emailSettingsConfigurationsPageHeading = page.locator("//span[normalize-space()='Email Settings Configuration']");
    this.emailSettingsConfigurationsTableColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");

    this.messageConfigurationSetupButton = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/div[2]/button[1]");
    this.messageConfigurationPopupHeading = page.locator("//h4[@id='ModalHeader']");
    this.messageConfigurationSaveButton = page.locator("//input[@value='Save']");
    this.messageConfigurationCheckbox = page.locator("(//div[@class='col-md-12 custom-control-defaultticketing custom-checkbox'])[1]");
    this.messageConfigurationRadioButtons = page.locator("//div[@class='uar-radio']");

    this.campaignsInstructionsNotesButton = page.locator("(//button[normalize-space()='Instructions/Notes'])[1]");
    this.campaignInstructionsPageHeading = page.locator("//div[@class='o-form-title-bar']");
    this.campaignInstructionPageDropdown = page.locator("//select[@class='form-control']");
    this.campaignInstructionPageSaveButton = page.locator("//button[normalize-space()='Save']");
    this.campaignInstructionPagBackButton = page.locator("//button[@id='backep']");

    this.campaignsConfigurationsButton = page.locator("(//button[contains(@type,'select')][normalize-space()='Configurations'])[3]");
    this.campaignsConfigurationsPageHeading = page.locator("//span[normalize-space()='Campaigns Configuration']");
    this.campaignsConfigurationsTableColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");

    this.uiConfigurationViewButton = page.locator("(//button[contains(@type,'select')][normalize-space()='View'])[2]");
    this.uiConfigurationPageHeading = page.locator("//h4[@id='ModalHeader']");
    this.addConfigurationButton = page.locator("//button[normalize-space()='Add Configuration']");
    this.uiConfigurationTableColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");
    this.uiConfigurationDropdown = page.locator("(//button[@id='dropdownMenu'])[1]");
    this.uiConfigurationDropdownOption = page.locator("//div[contains(@class,'dropdown badge configActionDropdown open')]//a[contains(text(),'Update')]");
    this.clickUpdateOption = page.locator("//div[@class='dropdown badge configActionDropdown open']//a[contains(text(),'Update')]");
    this.updatePopupHeading = page.locator("//div[contains(@class,'fade modal modal in')]//h4[@id='ModalHeader']");


    this.defaultUIConfigurationViewButton = page.locator("(//button[contains(@type,'select')][normalize-space()='View'])[3]");
    this.defaultUIConfigurationHeading = page.locator("//h4[@id='ModalHeader']//span[1]");
    this.addDefaultUIConfigurationButton = page.locator("//button[normalize-space()='Add Configuration']");
    this.defaultUIConfigurationTableColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");


    this.sorFieldsViewButton = page.locator("(//a[contains(@href,'/SORFieldsMapping')])[1]");
    this.sorFieldsPageHeading = page.locator("//div[@class='o-form-title-bar']");
    this.sorFieldsDropdown = page.locator("//select[@class='form-control']");
    this.sorFieldsBackButton = page.locator("//input[@value='Back']");

    this.manageAssignDetailsViewButton = page.locator("(//a[contains(@href,'/manageAssigneeDetails')])[1]");
    this.manageAssignDetailsPageHeading = page.locator("//div[contains(@class,'o-form-title-bar')]");
    this.manageAssignDropdown = page.locator("//select[@class='form-control']");
    this.manageAssignBackButton = page.locator("//button[@id='backep']");
    this.manageAttributesDropdownOption = page.locator("//div[@class='dropdown badge open']//a[contains(text(),'Update')]");
    this.manageAssignTableColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");
    this.tableCheckbox = page.locator("(//label[contains(@for,'delete_assignee_4')])[1]");
    this.manageAttributesCloseModal = page.locator("//div[@class='modal-dialog custom-dialog peoples-list']//span[@aria-hidden='true'][normalize-space()='×']");


    this.globalDefaultReviewerViewButton = page.locator("//div[10]//div[2]//button[1]");
    this.globalDefaultReviewerPopupHeading = page.locator("//h4[@id='ModalHeader']");

    this.manageIdentityAttributesSetupButton = page.locator("(//button[contains(@type,'select')][normalize-space()='Set Up'])[4]");
    this.manageIdentityAttributesPageHeading = page.locator("//h4[@id='ModalHeader']");
    this.manageIdentityAttributesTableColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");
    this.updatePopupHeading = page.locator("//div[contains(@class,'fade modal right fade modal in')]//h4[@id='ModalHeader']");
    this.addButton = page.locator("//button[normalize-space()='Add']");

    this.usersReportScheduleSetupButton = page.locator("(//a[normalize-space()='Set Up'])[1]");
    this.usersReportSchedulePageHeading = page.locator("//h2[normalize-space()='Users Report Schedule']");
    this.userReportTable = page.locator("//div[contains(@class,'row')]//table//thead//tr");
    this.radioBtns = page.locator("//div[contains(@class,'uar-radio-data')]");


    this.logsnav = page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > div:nth-child(8) > div:nth-child(2) > a:nth-child(2) > div:nth-child(1) > li:nth-child(1)");
    this.logsHeading = page.locator("//h2[normalize-space()='Logs']");
    this.applicationLogsView = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/span[1]/button[1]");
    this.applicationLogsViewHeading = page.locator("//h4[@id='ModalHeader']");
    this.pickleLogsdropdown = page.locator("//body/div[contains(@role,'dialog')]/div[contains(@role,'document')]/div[contains(@class,'modal-dialog custom-dialog peoples-list')]/div[contains(@class,'modal-content')]/div[contains(@class,'modal-body')]/div[contains(@class,'react-table')]/div[contains(@class,'logView')]/div[1]/div[1]");
    this.cemControllerLogs = page.locator("//body/div[@role='dialog']/div[@role='document']/div[@class='modal-dialog custom-dialog peoples-list']/div[@class='modal-content']/div[@class='modal-body']/div[@class='react-table']/div[@class='logView']/div[1]/div[1]");
    this.genericAgentLogs = page.locator("body > div:nth-child(9) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)")

    this.onpremisesView = page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1) > button:nth-child(1)");
    this.onpremisesViewHeading = page.locator("//h4[@id='ModalHeader']");
    this.onpremisesViewlabel = page.locator("//label[@id='terminationDateLabel']");
    this.onpremisesViewCheckBox = page.locator("//div[@class='custom-control custom-checkbox zipFiles']");

    this.errorMessagesGenericAgent = page.locator("//div[@class='jss12 jss18']//div[3]//div[2]//span[1]//button[1]");
    this.genericAgentHeading = page.locator("//h4[@id='ModalHeader']");
    this.genericAgentColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");

    this.errorMessagesCem = page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > span:nth-child(2) > button:nth-child(1)");
    this.cemHeading = page.locator("//h4[@id='ModalHeader']");
    this.cemcolumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");

    this.errorMessagesTicketingSystem = page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > span:nth-child(3) > button:nth-child(1)");
    this.ticketingSystemHeading = page.locator("//h4[@id='ModalHeader']");
    this.ticketingSystemColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");


    this.agentStatusnav = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/ul[1]/div[8]/div[2]/a[3]/div[1]/li[1]");
    this.agentStatusHeading = page.locator("//h2[normalize-space()='Agent Status']");
    this.agentStatusColumns = page.locator("body > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)");
    this.agentStatusButton = page.locator("//input[@value='Back']");
    this.agentStatusDropdown = page.locator("(//div[@role='gridcell'])[1]");


    this.exportDownloadsnav = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/ul[1]/div[8]/div[2]/a[4]/div[1]/li[1]");
    this.exportDownloadsHeading = page.locator("//h2[normalize-space()='Export Downloads']");
    this.exportDownloadsButton = page.locator("//input[@value='Refresh']");
    this.exportDownloadsColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");


    this.archievedDatanav = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/ul[1]/div[8]/div[2]/a[5]/div[1]/li[1]");
    this.archievedDataHeading = page.locator("//h2[normalize-space()='Archived Campaign Reports']");
    this.archievedDataColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");
    this.archieverdDataDropdown = page.locator("(//button[@id='dropdownMenu'])[1]");
    this.archieverdDataDropdownOption = page.locator("//div[@class='dropdown badge open']//a[@id='export_button']");


    this.licensenav = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/ul[1]/div[8]/div[2]/a[6]/div[1]/li[1]");
    this.licenseHeading = page.locator("//h2[normalize-space()='License']");
    this.licenseColumns = page.locator("//div[contains(@class,'rt-thead -header')]//div[contains(@role,'row')]");
    

    this.flexRpaRecipesnav = page.locator("//div[@id='react']//a[7]//div[1]//li[1]");
    this.flexRpaRecipesHeading = page.locator("//h2[normalize-space()='License']");
    this.flexRpaRecipesAddButton = page.locator("//input[contains(@value,'Add')]");
    this.flexRpaRecipesOkta = page.locator("//body[1]/div[1]/div[1]/span[1]/div[1]/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]");
    this.oktaEditBtn = page.locator("//div[contains(@class,'row')]//div[1]//div[1]//div[1]//p[1]//span[1]//*[name()='svg']");
    this.oktaDeleteBtn = page.locator("//div[contains(@class,'row')]//div[1]//div[1]//div[1]//p[1]//span[2]//*[name()='svg']");
    }


  // -----------------------
  // Actions / verifications
  // -----------------------

  async navigateToConfigurationPage() {
    await this.configurationMenu.click();
  }

  async verifyConfigurationPageHeading() {
    await expect(this.configurationPageHeading).toBeVisible();
  }

   async verifyAllButtonsByName() {
    for (const label of this.expectedButtons) {
      const buttons = this.page.getByRole('button', { name: label });

      const count = await buttons.count();
      expect(count, `${label} button NOT found on page`).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        await expect(buttons.nth(i), `${label} button is NOT visible`).toBeVisible();
      }
    }
  }

  async verifyAllLabels() {
  const expectedLabels = [
    "Roles",
    "Ticketing System for Access Review",
    "Email Settings",
    "Message Configuration",
    "Campaigns",
    "UI Configuration",
    "Default UI Configuration",
    "SOR Fields Mapping",
    "Manage Assign Details",
    "Global Default Reviewer",
    "Manage Identity Attributes",
    "Users Report Schedule"
  ];

  for (const label of expectedLabels) {
    const locator = this.page.getByText(label, { exact: true });

    // Only check visible instances
    const visible = locator.filter({ has: this.page.locator(':visible') });

    expect(await visible.count(), `${label} label is NOT visible`).toBeGreaterThan(0);
  }
}

async verifyRolesCongigurationConfigurationPage() {
    await this.rolesConfigureButton.click();
    await expect(this.rolesConfigurePopupHeading).toBeVisible();
    await expect(this.popupText).toBeVisible();
    await expect(this.popupSaveButton).toBeVisible();
    await expect(this.popupClearButton).toBeVisible();
    await this.CloseModal.click();
  }

  async verifyRolesViewPage() {
    await this.rolesViewButton.click();
    await expect(this.rolesViewPopupHeading).toBeVisible();
    await expect(this.rolesviewButton).toBeVisible();
    await expect(this.rolesViewTableColumns).toBeVisible();
    await this.CloseModal.click();
  }

  async verifyTicketingSystemSetupPage() {

  await this.ticketingSystemSetupButton.click();

  await expect(this.ticketingSystemSetupPageHeading).toBeVisible();
  await expect(this.ticketingSystemSetupDropdown).toBeVisible();

  const expectedLabels = [
    "ServiceNow - Incident",
    "servicenow.username",
    "servicenow.password",
    "category",
    "caller_id",
    "subcategory",
    "servicenow.url",
    "servicenow.assignee.username",
    "impact",
    "u_security_severity",
    "contact_type",
    "u_s_cat_item",
    "urgency",
    "u_security_private_data",
  ];

  for (const label of expectedLabels) {

    // match partial text (handles * and extra spacing)
    const locator = this.page.locator(`//*[contains(normalize-space(.),"${label}")]`);

    // check at least one element found
    const count = await locator.count();
    expect(count, `${label} NOT found in DOM`).toBeGreaterThan(0);

    // check at least one is visible
    let visible = false;
    for (let i = 0; i < count; i++) {
      if (await locator.nth(i).isVisible()) {
        visible = true;
        break;
      }
    }

    expect(visible, `${label} is NOT visible`).toBeTruthy();
  }
  await this.CloseModal.click();
} 

 async verifyTicketingSystemConfigurationsPage() {
    await this.ticketingSystemConfigurationsButton.click();
    await expect(this.ticketingSystemConfigurationsPageHeading).toBeVisible();
    await expect(this.ticketingSystemConfigurationsTableColumns).toBeVisible();
    await this.ConfigurationActionGearDropdown.click();
    await this.ConfigurationActionGearDropdownOption.click();
    await expect(this.updatePopupHeading).toBeVisible();
    await this.hiddenCloseModal.click();
    await this.CloseModal.click();
 }

 async verifyEmailSettingsSetupPage() {
  // Click to open the Email Settings modal
  await this.emailSettingsSetupButton.click();
  await expect(this.emailSettingsPopupHeading).toBeVisible();

  // Expand dropdown/section first if needed
  await this.emailConfigurationDropdown.click();

  // Map of labels to their XPaths
  const labelLocators = {
    "Connection Details": "//div[contains(@class,'connection-details')]",
    "Client Id": "//label[@id='clientIdLabel']",          // Update actual XPaths
    "Client Secret": "//label[@id='clientSecretLabel']",
    "Tenant Id": "//label[@id='tenantIdLabel']",
    "Email From": "//label[@id='emailFromLabel']",
    "Bcc": "//b[normalize-space()='Bcc']",
    "Reply To": "//b[normalize-space()='Reply To']",
    "Admin Email Sent To": "//div[contains(@class,'email-titles')]",
    "Mail To": "//label[@id='emailToLabel']"
  };

  for (const [label, xpath] of Object.entries(labelLocators)) {
    const locator = this.page.locator(xpath).first();

    try {
      await locator.waitFor({ state: 'visible', timeout: 15000 });

      const count = await locator.count();
      expect(count, `${label} NOT found in DOM`).toBeGreaterThan(0);

      await locator.scrollIntoViewIfNeeded();

      const isVisible = await locator.isVisible();
      expect(isVisible, `${label} is NOT visible`).toBeTruthy();
    } catch (error) {
      throw new Error(`Failed to find or verify label "${label}" in Email Settings: ${error.message}`);
    }
  }

  // Verify buttons after expanding the dropdown
  await expect(this.emailConfigurationCheckbox).toBeVisible();
  await expect(this.emailConfigurationTestConnectionButton).toBeVisible();
  await expect(this.emailConfigurationSaveButton).toBeVisible();

  // Close modal
  await this.CloseModal.click();
}

 async verifyEmailSettingsConfigurationsPage() {
    await this.emailSettingsConfigurationsButton.click();
    await expect(this.emailSettingsConfigurationsPageHeading).toBeVisible();
    await expect(this.emailSettingsConfigurationsTableColumns).toBeVisible();
    await this.ConfigurationActionGearDropdown.click();
    await this.ConfigurationActionGearDropdownOption.click();
    await expect(this.updatePopupHeading).toBeVisible();
    await this.hiddenCloseModal.click();
    await this.CloseModal.click();
 }

  async verifyMessageConfigurationSetupPage() {
    await this.messageConfigurationSetupButton.click();
    await expect(this.messageConfigurationPopupHeading).toBeVisible();
    const labelLocators = {
    "Teams Connection Configuration": "//h5[normalize-space()='Teams Connection Configuration:']",
    "azure.client.id ": "//label[@id='azure.client.idLabel']",      
    "azure.tenant.id *": "//label[@id='azure.tenant.idLabel']",
    "azure.user.name": "//label[@id='azure.user.nameLabel']",
    "azure.user.password ": "//label[@id='azure.user.passwordLabel']",
  };

  for (const [label, xpath] of Object.entries(labelLocators)) {
    const locator = this.page.locator(xpath).first();

    try {
      await locator.waitFor({ state: 'visible', timeout: 15000 });

      const count = await locator.count();
      expect(count, `${label} NOT found in DOM`).toBeGreaterThan(0);

      await locator.scrollIntoViewIfNeeded();

      const isVisible = await locator.isVisible();
      expect(isVisible, `${label} is NOT visible`).toBeTruthy();
    } catch (error) {
      throw new Error(`Failed to find or verify label "${label}" in Email Settings: ${error.message}`);
    }
  }
    await expect(this.messageConfigurationCheckbox).toBeVisible();
    await expect(this.messageConfigurationRadioButtons).toBeVisible();
    await expect(this.messageConfigurationSaveButton).toBeVisible();
    await this.CloseModal.click();
  }

  async verifyCampaignsInstructionsNotesPage() {
    await this.campaignsInstructionsNotesButton.click();
    await expect(this.campaignInstructionsPageHeading).toBeVisible();
    const labelLocators = {
    "Campaign Instructions": "//label[@id='user_access_reviewsLabel']",
    "Background Color": "//b[normalize-space()='Background Color:']",
    "Campaign Completion Note": "//label[@id='campaign_completion_noteLabel']",
    "Election Notes Instructions":"//label[@id='campaign_election_notesLabel']",
    "Reviewer Notes Dropdown":"//label[@id='notes_dropdown_optionsLabel']",
    };

  for (const [label, xpath] of Object.entries(labelLocators)) {
    const locator = this.page.locator(xpath).first();

    try {
      await locator.waitFor({ state: 'visible', timeout: 15000 });

      const count = await locator.count();
      expect(count, `${label} NOT found in DOM`).toBeGreaterThan(0);

      await locator.scrollIntoViewIfNeeded();

      const isVisible = await locator.isVisible();
      expect(isVisible, `${label} is NOT visible`).toBeTruthy();
    } catch (error) {
      throw new Error(`Failed to find or verify label "${label}" in Email Settings: ${error.message}`);
    }
  }
    await expect(this.campaignInstructionPageDropdown).toBeVisible();
    await expect(this.campaignInstructionPageSaveButton).toBeVisible();
    await expect(this.campaignInstructionPagBackButton).toBeVisible();
    await this.campaignInstructionPagBackButton.click();
  }

  async verifyCampaignsConfigurationsPage() {
    await this.campaignsConfigurationsButton.click();
    await expect(this.campaignsConfigurationsPageHeading).toBeVisible();
    await expect(this.campaignsConfigurationsTableColumns).toBeVisible();
    await this.ConfigurationActionGearDropdown.click();
    await this.ConfigurationActionGearDropdownOption.click();
    await expect(this.updatePopupHeading).toBeVisible();
    await this.hiddenCloseModal.click();
    await this.CloseModal.click();
  }

  async verifyUIConfigurationViewPage() {
    await this.uiConfigurationViewButton.click();
    await expect(this.uiConfigurationPageHeading).toBeVisible();
    await expect(this.addConfigurationButton).toBeVisible();
    await expect(this.uiConfigurationTableColumns).toBeVisible();
    await this.uiConfigurationDropdown.click();
    await this.uiConfigurationDropdownOption.click();
    await expect(this.updatePopupHeading).toBeVisible();
    const expectedLabels = [
    "Name",
    "Value",
    "Customer*",
    "Page Name",
    "Config Type",
  ];

  for (const label of expectedLabels) {
    await expect(
      this.page.getByText(label, { exact: true })
    ).toBeVisible();
  }

  const expectedButtons = [
  "Save",
  "Save & Apply",
  "Cancel"
];

for (const label of expectedButtons) {
  const buttons = this.page.getByRole('button', { name: label });
  const count = await buttons.count();

  expect(count, `${label} button not found`).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await expect(buttons.nth(i)).toBeVisible();
  }
}
    await this.hiddenCloseModal.click();
    await this.CloseModal.click();
  }

  async verifyDefaultUIConfigurationViewPage() {
    await this.defaultUIConfigurationViewButton.click();
    await expect(this.defaultUIConfigurationHeading).toBeVisible();
    await expect(this.addDefaultUIConfigurationButton).toBeVisible();
    await expect(this.defaultUIConfigurationTableColumns).toBeVisible();
    await this.uiConfigurationDropdown.click();
    await this.uiConfigurationDropdownOption.click();
    await expect(this.updatePopupHeading).toBeVisible();
    const expectedLabels = [
      "Name",
      "Value",
      "Customer",
      "Config Type",
    ];

    // Prefer stable locator for 'Name', fallback to text for others
    const labelMap = {
      "Name": "#ConfigNameLabel",
      // Add more mappings if IDs exist for other labels
    };

    for (const label of expectedLabels) {
      let locator;
      if (labelMap[label]) {
        locator = this.page.locator(labelMap[label]);
      } else {
        locator = this.page.getByText(label, { exact: true }).first();
      }
      await expect(locator).toBeVisible();
    }

  const expectedButtons = [
  "Save",
  "Save & Apply",
  "Cancel"
];

for (const label of expectedButtons) {
  const buttons = this.page.getByRole('button', { name: label });
  const count = await buttons.count();

  expect(count, `${label} button not found`).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await expect(buttons.nth(i)).toBeVisible();
  }
}
    await this.hiddenCloseModal.click();
    await this.CloseModal.click();
  }

  
  async verifySORFieldsPage() {
    await this.sorFieldsViewButton.click();
    await expect(this.sorFieldsPageHeading).toBeVisible();
    await this.sorFieldsDropdown.click();
    await expect(this.sorFieldsBackButton).toBeVisible();
    await this.sorFieldsBackButton.click();
  }

  async verifyManageAssignDetailsPage() {
    await this.manageAssignDetailsViewButton.click();
    await expect(this.manageAssignDetailsPageHeading).toBeVisible();
    await this.manageAssignDropdown.click();
    await expect(this.manageAssignTableColumns).toBeVisible();
    await expect(this.tableCheckbox).toBeVisible();
    await expect(this.manageAssignBackButton).toBeVisible();
    await this.manageAssignBackButton.click();
  }

  async verifyGlobalDefaultReviewerPage() {
    await this.globalDefaultReviewerViewButton.click();
    await expect(this.globalDefaultReviewerPopupHeading).toBeVisible();
    await this.CloseModal.click();
  }

  async verifyManageIdentityAttributesPage() {
    await this.manageIdentityAttributesSetupButton.click();
    await expect(this.manageIdentityAttributesPageHeading).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await expect(this.manageIdentityAttributesTableColumns).toBeVisible();
    await this.uiConfigurationDropdown.click();
    await this.manageAttributesDropdownOption.click();
    await expect(this.updatePopupHeading).toBeVisible();
    const expectedLabels = [
    "Attribute Name",
    "Attribute Field",
    "Field Type",
  ];

  for (const label of expectedLabels) {
    await expect(
      this.page.getByText(label, { exact: true })
    ).toBeVisible();
  }

  const expectedButtons = [
  "Save",
  "Cancel"
];

for (const label of expectedButtons) {
  const buttons = this.page.getByRole('button', { name: label });
  const count = await buttons.count();

  expect(count, `${label} button not found`).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await expect(buttons.nth(i)).toBeVisible();
  }
}
    await this.manageAttributesCloseModal.click();
    await this.identityAttributeCloseModal.click();
  }

  async verifyUsersReportSchedulePage() {
    await this.usersReportScheduleSetupButton.click();
    await expect(this.usersReportSchedulePageHeading).toBeVisible();
    await expect(this.userReportTable).toBeVisible();
    await expect(this.radioBtns).toBeVisible();
    const expectedDropdowns = [
      "Report Format",
      "Report Frequency",
      "Export Method"
    ];

    for (const label of expectedDropdowns) {
      let locator = this.page.getByLabel(label);
      if (await locator.count() === 0) {
        locator = this.page.getByText(label, { exact: false }).first();
      }
      await expect(locator).toBeVisible();
    }
    const expectedLabels = [
      "Name",
      "AWS Configurations",
      "Bucket Name",
      "File Location",
    ];

    for (const label of expectedLabels) {
      let locator = this.page.getByText(label, { exact: false }).first();
      await expect(locator).toBeVisible();
    }

    const expectedButtons = [
      "Run Now",
      "Schedule Report",
      "Back"
    ];

    for (const label of expectedButtons) {
      let buttons = this.page.getByRole('button', { name: label });
      let count = await buttons.count();
      if (count === 0) {
        // Fallback to text-based locator
        buttons = this.page.getByText(label, { exact: false });
        count = await buttons.count();
      }
      expect(count, `${label} button not found`).toBeGreaterThan(0);
      let foundVisible = false;
      for (let i = 0; i < count; i++) {
        if (await buttons.nth(i).isVisible()) {
          foundVisible = true;
          break;
        }
      }
      expect(foundVisible, `${label} button is NOT visible`).toBeTruthy();
    }
  }
  

  async navigateToLogsPage(){
    await this.logsnav.click();
    await expect(this.logsHeading).toBeVisible();
    const expectedLabels = [
      "Application Logs",
      "On-Premises Agent Logs",
      "Error Messages",
    ];

    for (const label of expectedLabels) {
      let locator = this.page.getByText(label, { exact: false }).first();
      await expect(locator).toBeVisible();
    }

    const expectedButtons = [
      "View",
      "Generic Agent",
      "CEM",
      "Ticketing System"
    ];

    for (const label of expectedButtons) {
      let buttons = this.page.getByRole('button', { name: label });
      let count = await buttons.count();
      if (count === 0) {
        // Fallback to text-based locator
        buttons = this.page.getByText(label, { exact: false });
        count = await buttons.count();
      }
      expect(count, `${label} button not found`).toBeGreaterThan(0);
      let foundVisible = false;
      for (let i = 0; i < count; i++) {
        if (await buttons.nth(i).isVisible()) {
          foundVisible = true;
          break;
        }
      }
      expect(foundVisible, `${label} button is NOT visible`).toBeTruthy();
    }

  await this.applicationLogsView.click();
  await expect(this.applicationLogsViewHeading).toBeVisible();
  await this.pickleLogsdropdown.click();
  await this.cemControllerLogs.click();
  await this.genericAgentLogs.click();
  await this.CloseModal.click();

  await this.onpremisesView.click();
  await expect(this.onpremisesViewHeading).toBeVisible();
  await expect(this.onpremisesViewlabel).toBeVisible();
  await expect(this.onpremisesViewCheckBox).toBeVisible();
  await this.CloseModal.click();

  await this.errorMessagesGenericAgent.click();
  await expect(this.genericAgentHeading).toBeVisible();
  await expect(this.genericAgentColumns).toBeVisible();
  await this.CloseModal.click();

  await this.errorMessagesCem.click();
  await expect(this.cemHeading).toBeVisible();
  await expect(this.cemcolumns).toBeVisible();
  await this.CloseModal.click();

  await this.errorMessagesTicketingSystem.click();
  await expect(this.ticketingSystemHeading).toBeVisible();
  await expect(this.ticketingSystemColumns).toBeVisible();
  await this.CloseModal.click();
  }

  async navigateToAgentStatusPage(){
  await this.agentStatusnav.click();
  await expect(this.agentStatusHeading).toBeVisible();
  await expect(this.agentStatusColumns).toBeVisible();
  await expect(this.agentStatusButton).toBeVisible();
  await this.agentStatusDropdown.click();
  }
  
  async navigateToExportDownloadsPage(){
  await this.exportDownloadsnav.click();
  await expect(this.exportDownloadsHeading).toBeVisible();
  await expect(this.exportDownloadsButton).toBeVisible();
  await expect(this.exportDownloadsColumns).toBeVisible();
  }
  
  async navigateToArchievedDataPage(){
  await this.archievedDatanav.click();
  await expect(this.archievedDataHeading).toBeVisible();
  await expect(this.archievedDataColumns).toBeVisible();
  await this.archieverdDataDropdown.click();
  await expect(this.archieverdDataDropdownOption).toBeVisible();
  }

  async navigateToLicensePage(){
  await this.licensenav.click();
  await expect(this.licenseHeading).toBeVisible();
  await expect(this.licenseColumns).toBeVisible();
  const expectedLabels = [
      "Total Identities Purchased",
      "Total Number of Identities in People",
      "Total Applications Purchased",
      "Total Number of Applications",
    ];

    for (const label of expectedLabels) {
      let locator = this.page.getByText(label, { exact: false }).first();
      await expect(locator).toBeVisible();
    }
  }
  async navigateToFlexRPARecipesPage(){
    await this.flexRpaRecipesnav.click();
    await expect(this.flexRpaRecipesHeading).toBeVisible;
    await expect(this.flexRpaRecipesAddButton).toBeVisible();
    await expect(this.flexRpaRecipesOkta).toBeVisible();
    await expect(this.oktaEditBtn).toBeVisible();
    await expect(this.oktaDeleteBtn).toBeVisible();
}
}
export default AdminconsolesPage;
