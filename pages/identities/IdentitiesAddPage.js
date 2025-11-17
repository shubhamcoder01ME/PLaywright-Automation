// pages/IdentitiesAddPage.js
import { expect } from '@playwright/test';

export class IdentitiesAddPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Add Person' });
    this.closeButton = page.getByRole('button', { name: /close modal|close|cancel/i });
    this.saveButton = page.getByRole('button', { name: /create|save|add/i });
    // Add selectors for all expected attributes/fields in the modal
    this.fields = {
      employeeType: page.getByText('Employee Type *'),
      employeeFirstName: page.getByText('Employee First Name *'),
      employeeMiddleName: page.getByText('Employee Middle Name'),
      employeeLastName: page.getByText('Employee Last Name *'),
      employeeEmail: page.getByText('Employee Email ID *'),
      managerEmail: page.getByText('Manager Email ID *'),
      employeeTitle: page.getByText('Employee Title'),
      department: page.getByText('Department'),
      groupOwner: page.getByText('Group Owner'),
      location: page.getByText('Location', { exact: true }),
      terminationDate: page.getByText('Termination Date'),
      hireDate: page.getByText('Hire Date'),
      employeeId: page.getByText('Employee ID'),
    };
  }

  async verifyModalVisible() {
    await expect(this.heading).toBeVisible();
  }

  async verifyAllAttributes() {
    for (const key in this.fields) {
      await expect(this.fields[key]).toBeVisible();
    }
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (modal) modal.scrollTop = modal.scrollHeight;
    });
  }

  async verifySaveButtonVisible() {
    await expect(this.saveButton).toBeVisible();
  }

  async closeModal() {
    await this.closeButton.click();
  }
};
