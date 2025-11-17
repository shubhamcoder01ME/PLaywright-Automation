import { expect } from '@playwright/test';

export class EmailAuditPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation & headings
    this.navigation = page.getByRole('link', { name: 'Email Audit' });
    this.heading = page.locator('h2.header.o-form-title-bar');

    this.exportButton = page.getByRole('button', { name: 'Export' });
    
  }
}