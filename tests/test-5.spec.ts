import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qa30.securends.com/campaignTemplates');
  await page.getByRole('row', { name: 'BSAzureERISG24101' }).locator('#dropdownMenu').click();
  await expect(page.getByRole('row', { name: 'BSAzureERISG24101' }).locator('#dropdownMenu')).toBeVisible();
  await page.getByRole('row', { name: 'BSAzureERISG24101' }).locator('#dropdownMenu').click();
  await page.getByText('Update').nth(2).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('row', { name: 'BSAzureERISG24101' }).locator('#dropdownMenu').click();
  await page.getByText('Details').first().click();
  await page.getByRole('button', { name: 'Close Modal' }).click();
});