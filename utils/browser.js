import { chromium, firefox, webkit } from '@playwright/test';

async function invokeBrowser(options = {}) {
    const browserType = process.env.BROWSER || 'chromium';
    const headless = process.env.HEAD?.toLowerCase() === 'true';

    const launchOptions = {
        headless,
        args: [...(options.args || []), '--disable-blink-features=AutomationControlled'],
        ...options
    };

    switch (browserType.toLowerCase()) {
        case 'firefox':
            return firefox.launch(launchOptions);
        case 'webkit':
            return webkit.launch(launchOptions);
        case 'chromium':
        default:
            return chromium.launch(launchOptions);
    }
}

export { invokeBrowser };