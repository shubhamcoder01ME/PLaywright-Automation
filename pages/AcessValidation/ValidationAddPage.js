import { expect } from '@playwright/test';

class ValidationAddPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Centralized locators
    this.addButton= page.getByRole('button', { name: /Add/i });

    this.addpageHeading = page.getByRole('heading', { name: 'Create New SoD Policy', level: 2 });

    this.sodPOlycinameInput = page.getByText('SoD Policy Name', { exact: true });
    this.descriptionInput = page.getByText('Description', { exact: true });
    this.sodPolicyIDInput = page.getByText('SoD Policy ID', { exact: true });

    this.includeInactiveUsersLabel =page.getByLabel('No');
    this.includeyesInactiveUsersLabel =page.getByLabel('Yes');

    this.advancedSectionCheckbox=page.getByLabel('Advance');
    this.attributton=page.getByRole('button', { name: 'Attribute Filter' });

    //modal dialog locators can be added here later
    this.modalheading=page.getByRole('heading', { name: 'Advanced Identity Filter' });
    this.cancelButton=page.getByRole('button', { name: 'Cancel' });
    this.saveButton=page.getByRole('button', { name: 'Save' });
    this.closeButton=page.getByText('×');

}
  async clickAddButton() {  
    await this.addButton.click();
    await this.page.waitForLoadState('networkidle');
  }
  
  async verifyFormFields() {
    await  expect(this.addpageHeading).toBeVisible();
    await  expect(this.sodPOlycinameInput).toBeVisible();
    await  expect(this.descriptionInput).toBeVisible();
    await  expect(this.sodPolicyIDInput).toBeVisible();
  }


  async checkBox() {
    await this.includeInactiveUsersLabel.click();
    await this.page.waitForLoadState('networkidle');
    await this.includeyesInactiveUsersLabel.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAdvance() {
    await this.advancedSectionCheckbox.click();
    await this.page.waitForLoadState('networkidle');  
    await this.attributton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyAdvancedModal() {
    await expect(this.modalheading).toBeVisible();
    await expect(this.saveButton).toBeVisible();
    await expect(this.closeButton).toBeVisible();
  }

  async closeModal(){
    await this.closeButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async scrollToSaveButton() {
    await this.page.getByRole('button', { name: 'Save' }).scrollIntoViewIfNeeded();
  }

  async scrollUpAndClickBack() {
    const backBtn = this.page.getByRole('button', { name: 'Back' });

    await backBtn.scrollIntoViewIfNeeded(); // scroll upward to this element
    await backBtn.click();                  // click it
}


}
export default ValidationAddPage;
