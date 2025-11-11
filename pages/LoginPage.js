const { expect } = require('@playwright/test');
const env = require('../utils/env');

class LoginPage {
  constructor(page) {
    this.page = page;
    // More reliable selectors with multiple options
    this.email = page.getByRole('textbox', { name: /email/i }).or(page.getByPlaceholder(/email/i));
    this.password = page.getByRole('textbox', { name: /password/i }).or(page.getByPlaceholder(/password/i));
    this.loginButton = page.getByRole('button', { name: /login/i }).or(page.getByText(/login/i));
  }
async goto() {
    console.log('Navigating to:', env.BASE_URL);
    await this.page.goto(env.BASE_URL, { timeout: 60000, waitUntil: 'networkidle' });
}

  async login(username = "shubham.kumar@securends.com", password = env.PASSWORD) {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyWelcome() {
    const username = env.USERNAME.split('@')[0];
    const welcomeHeading = this.page.getByRole('heading', { name: `Welcome, ${username}` });
    return welcomeHeading;
  }
}

module.exports = LoginPage;
