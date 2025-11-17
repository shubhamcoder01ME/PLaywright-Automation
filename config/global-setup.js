import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from 'fs';
import path from 'path';
import env from '../utils/env.js'; // env file
import LoginPage from '../pages/LoginPage.js'; // corrected import path
import { invokeBrowser } from '../utils/browser.js'; // browser utility

export default async function globalSetup() {
  const storagePath = path.join(__dirname, '..', 'storageState.json');

  // Delete old storage state if it exists
  if (fs.existsSync(storagePath)) {
    fs.unlinkSync(storagePath);
    console.log('Old storageState.json removed.');
  }

  // Launch browser using invokeBrowser (respects .env BROWSER + HEAD)
  const browser = await invokeBrowser({
    headless: false,
    args: ['--start-maximized']
  });

  if (!browser) {
    throw new Error('Failed to launch browser');
  }

  // Create a persistent context and page
  const context = await browser.newContext({
    viewport: null,
    screen: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  console.log('Navigating to:', env.BASE_URL);  
  await loginPage.goto();
  await loginPage.login(); // uses env.USERNAME & env.PASSWORD

  // Save new storage state
  await context.storageState({ path: storagePath });
  console.log('Global setup complete, new session saved to storageState.json.');

  await browser.close();
}
