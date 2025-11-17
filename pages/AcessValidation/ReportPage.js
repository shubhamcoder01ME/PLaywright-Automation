import { expect } from '@playwright/test';

class ReportPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Centralized locators
    this.leftReportMenu= page.getByRole('link',{ name: /Reports/i });
    this.PageHeadig = dcc;


  }

}
export default ReportPage;