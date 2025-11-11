const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const Logger = require('../../utils/logger');
const env = require('../../utils/env'); //  import env

test.describe.skip('Sanity - Login', () => {
  test.skip('login with valid credentials', async ({ page }) => {
    Logger.info('Test started: login with valid credentials');

    const loginPage = new LoginPage(page);
    Logger.info('Navigating to login page');
    await loginPage.goto();

    Logger.info('Performing login action');
    await loginPage.login();

    Logger.info('Verifying welcome heading is visible');

    await loginPage.verifyWelcome();

    Logger.success('Login test passed: welcome heading visible');
  });
});
