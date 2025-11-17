import { test, expect, chromium } from '@playwright/test';
import { EmailTemplatePage } from '../../pages/Adminconsole/EmailTemplatePage.js';
import { MessageTemplatePage } from '../../pages/Adminconsole/MessageTemplatePage.js';

test.describe('Email Templates UI Flow', () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.afterAll(async () => {
    await browser.close();
  });

test('validate Email Templates UI ', async () => {
  const emailTemplatePage = new EmailTemplatePage(page);

  // Navigate and verify heading
  await emailTemplatePage.navigateToEmailTemplates();
  await emailTemplatePage.verifyHeading();

  // Select all status options one by one
  await emailTemplatePage.selectAllStatusOptionsOneByOne();

  // Verify table headers
  const headers = ['Actions', 'Email Template Name', 'Email Template Type', 'Description', 'Default'];
  for (const header of headers) {
    await expect(page.getByRole('columnheader', { name: header })).toBeVisible();
  }

  // Verify column search
  await emailTemplatePage.verifyColumnSearchSupport();

  // Click Add button and verify Create Email Template UI
  await emailTemplatePage.clickAddButton();
  await emailTemplatePage.verifyCreateEmailTemplatePageUI();

  // Click Back and verify navigation
  await emailTemplatePage.backButton.click();
  await expect(emailTemplatePage.heading).toContainText('Email Templates');

  const messageTemplatePage = new MessageTemplatePage(page);
  await messageTemplatePage.navigateToEmailTemplates();
  await messageTemplatePage.verifyHeading();

  // Verify table headers
  const column = ['Actions', 'Message Template Name', 'Message Template Type', 'Description'];
  for (const header of column) {
    await expect(page.getByRole('columnheader', { name: header })).toBeVisible();
  }
  // Verify column search
  await messageTemplatePage.verifyColumnSearchSupport();

});
});
