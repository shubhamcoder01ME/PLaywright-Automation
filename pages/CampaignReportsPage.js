// Playwright Page Object for Campaign Reports
import { expect } from '@playwright/test';

class CampaignReportsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.navigationLink = page.getByRole('link', { name: 'Campaign Reports' });
    this.heading = page.getByRole('heading', { name: 'Campaign Reports' });
    this.statusDropdown = page.getByLabel('Status:AllReadyOpenClosed');
    this.activeArchivedDropdown = page.getByLabel('Active/Archived:ActiveArchived');
    
    this.searchInput = page.getByRole('textbox');

    this.firstGearBox = page.locator(`//button[@id='dropdownMenu']`).first();
  // These will be used after opening the campaign actions menu
     this.viewReportOption = page.locator("a[data-actiontype='view']:visible").first();
     this.detailsOption =page.getByText('Details', { exact: true }).first(); 
     this.tableHeaders = [
      page.getByText('Action', { exact: true }),
      page.getByText('Campaign', { exact: true }),
      page.getByText('Status', { exact: true }),
      page.getByText('Launch Date', { exact: true }),
      page.getByText('Closed Date', { exact: true }),
      page.getByText('Progress', { exact: true }),
    ];

    // Flexible header locator for BDD/table validation
    this.headerLocator = page.locator('div[role="columnheader"], th, td');

    //view report page elements
    this.verifyAuditHeading =page.getByRole('heading', { name: 'Campaign Report Data' });
    this.backButton = page.locator("//input[@value='Back']");
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.campaignRepot=page.getByText('Campaign Report', { exact: true });
    this.chartElement=page.locator('.chartjs-render-monitor');

    this.effectReportLink=page.getByRole('link', { name: 'Campaign Effectiveness Report' });
    this.effectApplication=page.getByText('Application:');
    this.effecStartDate=page.getByText('Campaign Start Date:', { exact: true });
    this.effecEndDate=page.getByText('Campaign End Date:', { exact: true });

    //Details options

    this.detailsHeading=page.getByRole('heading', { name: 'Campaign Info' });
    this.modalCloseButton=page.getByText('×');
    this.nameField=page.getByText('Name:', { exact: true });
    this.statusField=page.getByText('Status:', { exact: true });

  }

  async verifyTableHeaders(expectedHeaders) {
    let headerCells = await this.headerLocator.allTextContents();
    if (!headerCells.length) {
      const firstRow = this.page.locator('div[role="row"]').first();
      headerCells = await firstRow.locator('div,span').allTextContents();
    }
    headerCells = headerCells.map(h => h.trim()).filter(Boolean);
    for (const expected of expectedHeaders) {
      if (!headerCells.some(h => h.toLowerCase() === expected.toLowerCase())) {
        throw new Error(`Expected table header '${expected}' not found.`);
      }
    }
  }


  async leftnav() {
    await this.navigationLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
    for (const header of this.tableHeaders) {
      await expect(header).toBeVisible();
    }
  }

  async selectStatus(option) {
    await this.statusDropdown.selectOption(option);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500); // Allow UI to update
  }

  async selectActiveArchived(option) {
    await this.activeArchivedDropdown.selectOption(option);
    await this.page.waitForLoadState('networkidle');
  }

  async searchCampaign(name) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(name);
    await this.page.waitForLoadState('networkidle');
  }

  async openFirstCampaignActions() {
    await this.firstGearBox.click();
    
  }

  async clickViewReport() {
   const viewReportListItem =this.page.getByText('View Report', { exact: true }).first(); 
   await viewReportListItem.click();
   await this.page.waitForLoadState('networkidle');
  }
   
  async verivyAuditReportPage() {
    await expect(this.verifyAuditHeading).toBeVisible();
  }

  async verifyReportPageElements() {
    await expect(this.backButton).toBeVisible();
    await expect(this.exportButton).toBeVisible();
    await expect(this.campaignRepot).toBeVisible();
    await expect(this.chartElement).toBeVisible();
  } 

  async verifyEffectivenessReportPageElements() {
    await this.effectReportLink.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.effectApplication).toBeVisible();
    await expect(this.effecStartDate).toBeVisible();
    await expect(this.effecEndDate).toBeVisible();
  }
  async clickBack() {
    await this.backButton.click();
    await this.page.waitForLoadState('networkidle');
  } 


  async clickDetails() {
    await this.detailsOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDetailsPageElements() {
    await expect(this.detailsHeading).toBeVisible();
    await expect(this.modalCloseButton).toBeVisible();
    await expect(this.nameField).toBeVisible();
    await expect(this.statusField).toBeVisible();
  }

  async closeDetailsModal() {
    await this.modalCloseButton.click();
    await this.page.waitForLoadState('networkidle');
  } 
}

export { CampaignReportsPage };